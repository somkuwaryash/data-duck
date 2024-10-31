// src/types/chat.ts

import { ChatMessage } from "@/utils/aiUtils";

export interface DisplayMessage {
  id: string;
  text: string;
  isUser: boolean;
  code?: string;
  executionResult?: string;
  plot?: string;
}

export interface ChatContextType {
  messages: DisplayMessage[];
  chatHistory: ChatMessage[];
  isRAGMode: boolean;
  selectedScenario: string;
  addMessage: (message: Omit<DisplayMessage, "id">) => void;
  setChatHistory: (history: ChatMessage[]) => void;
  clearChat: () => void;
  updateRAGMode: (enabled: boolean) => void;
  updateScenario: (scenario: string) => void;
}

export interface ExampleMessage extends ChatMessage {
  title?: string;
}

export interface BusinessScenarioWithExamples {
  name: string;
  description: string;
  examples: ExampleMessage[];
}

export interface ChatInputProps {
  isLoading: boolean;
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface MessageListProps {
  messages: DisplayMessage[];
  onExport: (message: DisplayMessage) => void;
  onCopyCode: (code: string) => void;
}

export interface ChatHeaderProps {
  isRAGMode: boolean;
  onRAGModeChange: (enabled: boolean) => void;
  selectedScenario: string;
  onScenarioChange: (scenario: string) => void;
  businessScenarios: BusinessScenarioWithExamples[];
  onNewChat: () => void;
  disabled?: boolean;
}

export interface ExamplesPanelProps {
  selectedScenario: string;
  businessScenarios: BusinessScenarioWithExamples[];
  onExampleSelect: (example: ChatMessage) => void;
  onAddExample: (query: string, response: string) => void;
  disabled?: boolean;
}