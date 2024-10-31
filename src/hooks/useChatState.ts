// src/hooks/useChatState.ts

import { useState, useCallback } from 'react';
import { AIResponse, ChatMessage } from '@/utils/aiUtils';
import { queryAI } from '@/utils/aiUtils';
import { executePythonCode } from '@/utils/pyodideUtils';
import { RAG } from '@/utils/RAG';
import { useChat } from '@/contexts/ChatContext';
import { toast } from '@/hooks/use-toast';

export const useChatState = (
  onQuerySubmit: (query: string, aiResponse: AIResponse, executionResult: string) => Promise<void>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    chatHistory,
    setChatHistory,
    isRAGMode,
    selectedScenario,
    addMessage
  } = useChat();

  const handleQuerySubmit = useCallback(async (query: string) => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: ChatMessage = {
      role: 'user' as const,
      content: query
    };
    const updatedChatHistory: ChatMessage[] = [...chatHistory, userMessage];
    setChatHistory(updatedChatHistory);
    addMessage({ text: query, isUser: true });

    try {
      let aiResponse: AIResponse;
      let executionResult = '';
      let plot = '';

      if (isRAGMode) {
        const ragResponse = await RAG.process(query);
        aiResponse = { text: ragResponse };
      } else {
        aiResponse = await queryAI(updatedChatHistory, selectedScenario);

        if (aiResponse.code) {
          const { output, executionResult: execResult, base64Fig } = await executePythonCode(aiResponse.code);
          executionResult = output;
          console.log(execResult);
          plot = base64Fig;
        }
      }

      addMessage({
        text: aiResponse.text,
        isUser: false,
        code: aiResponse.code,
        executionResult,
        plot
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant' as const,
        content: aiResponse.text
      };
      setChatHistory([...updatedChatHistory, assistantMessage]);

      if (!isRAGMode) {
        await onQuerySubmit(query, aiResponse, executionResult);
      }
    } catch (error) {
      console.error('Error processing query:', error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chatHistory, isRAGMode, selectedScenario, addMessage, setChatHistory, onQuerySubmit]);

  return {
    isLoading,
    handleQuerySubmit
  };
};