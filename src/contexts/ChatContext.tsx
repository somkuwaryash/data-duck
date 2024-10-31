// src/contexts/ChatContext.tsx

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ChatContextType, DisplayMessage } from '@/types/chat';
import { ChatMessage } from '@/utils/aiUtils';

const initialChatHistory: ChatMessage[] = [{
  role: 'system',
  content: 'You are a data analysis assistant. Interpret the user\'s query, generate Python code for analysis, and provide explanations.'
}];

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ 
  children: React.ReactNode;
  dataFrameInfo: string;
}> = ({ children, dataFrameInfo }) => {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialChatHistory);
  const [isRAGMode, setIsRAGMode] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('general');

  const updateSystemMessage = useCallback((isRAG: boolean, scenario: string) => {
    const systemMessage = isRAG
      ? 'You are an assistant that answers questions based on the provided documents.'
      : scenario !== 'general'
        ? `You are a data analysis assistant specializing in ${scenario}. Interpret the user's query, generate Python code for analysis, and provide explanations. Here's the current dataset information:\n\n${dataFrameInfo}\n\nUse the 'df' DataFrame for your analysis.`
        : `You are a data analysis assistant. Interpret the user's query, generate Python code for analysis, and provide explanations. Here's the current dataset information:\n\n${dataFrameInfo}\n\nUse the 'df' DataFrame for your analysis.`;

    setChatHistory(prev => [{
      role: 'system',
      content: systemMessage
    }, ...prev.slice(1)]);
  }, [dataFrameInfo]);

  const addMessage = useCallback((message: Omit<DisplayMessage, "id">) => {
    setMessages(prev => [...prev, { ...message, id: Date.now().toString() }]);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setChatHistory(initialChatHistory);
    updateSystemMessage(isRAGMode, selectedScenario);
  }, [isRAGMode, selectedScenario, updateSystemMessage]);

  const updateRAGMode = useCallback((enabled: boolean) => {
    setIsRAGMode(enabled);
    updateSystemMessage(enabled, selectedScenario);
  }, [selectedScenario, updateSystemMessage]);

  const updateScenario = useCallback((scenario: string) => {
    setSelectedScenario(scenario);
    updateSystemMessage(isRAGMode, scenario);
  }, [isRAGMode, updateSystemMessage]);

  return (
    <ChatContext.Provider value={{
      messages,
      chatHistory,
      isRAGMode,
      selectedScenario,
      addMessage,
      setChatHistory,
      clearChat,
      updateRAGMode,
      updateScenario
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};