// src/components/ChatInterface.tsx

import React, { useCallback } from 'react';
import { saveAs } from 'file-saver';
import { AIResponse } from '@/utils/aiUtils';
import { useChatState } from '@/hooks/useChatState';
import { useChat } from '@/contexts/ChatContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { ChatInput } from './chat/ChatInput';
import { MessageList } from './chat/MessageList';
import { ChatHeader } from './chat/ChatHeader';
import { useToast } from '@/hooks/use-toast';
import { DisplayMessage } from '@/types/chat';

interface ChatInterfaceProps {
  onQuerySubmit: (query: string, aiResponse: AIResponse, executionResult: string) => Promise<void>;
  dataFrameInfo: string;
  onNewChat: () => void;
}

const ChatInterfaceContent: React.FC<ChatInterfaceProps> = ({ onQuerySubmit, onNewChat }) => {
  const {
    messages,
    isRAGMode,
    updateRAGMode,
    clearChat
  } = useChat();
  const { toast } = useToast();
  const { isLoading, handleQuerySubmit } = useChatState(onQuerySubmit);

  const handleExport = useCallback((message: DisplayMessage) => {
    if (message.plot) {
      const blob = new Blob([atob(message.plot)], { type: 'image/png' });
      saveAs(blob, 'generated_plot.png');
      toast({
        title: "Export Successful",
        description: "The plot has been exported as an image.",
      });
    }
  }, [toast]);

  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "The code has been copied to your clipboard.",
    });
  }, [toast]);

  const handleNewChat = useCallback(() => {
    clearChat();
    onNewChat();
  }, [clearChat, onNewChat]);

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg border border-gray-800">
      <ChatHeader
        isRAGMode={isRAGMode}
        onRAGModeChange={updateRAGMode}
        onNewChat={handleNewChat}
        disabled={isLoading}
      />
      
      <div className="flex-1 flex flex-col min-h-0">
        <MessageList
          messages={messages}
          onExport={handleExport}
          onCopyCode={handleCopyCode}
        />
        
        <ChatInput
          isLoading={isLoading}
          onSubmit={handleQuerySubmit}
          placeholder={isRAGMode ? "Ask about your documents..." : "Ask about your data..."}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

const ChatInterface: React.FC<ChatInterfaceProps> = (props) => {
  return (
    <ChatProvider dataFrameInfo={props.dataFrameInfo}>
      <ChatInterfaceContent {...props} />
    </ChatProvider>
  );
};

export default ChatInterface;