// src/components/chat/ChatInput.tsx
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiSend, FiLoader } from 'react-icons/fi';
import { ChatInputProps } from '@/types/chat';

export const ChatInput: React.FC<ChatInputProps> = ({ isLoading, onSubmit, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 bg-gray-900/50 backdrop-blur-sm rounded-b-lg border-t border-gray-800">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
        placeholder={placeholder || "Ask a question..."}
        disabled={isLoading}
        ref={inputRef}
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-primary-500 hover:bg-primary-600 text-white"
      >
        {isLoading ? <FiLoader className="animate-spin h-5 w-5" /> : <FiSend className="h-5 w-5" />}
      </Button>
    </form>
  );
};

