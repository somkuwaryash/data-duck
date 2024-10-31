// src/components/chat/ChatHeader.tsx
import { Button } from '@/components/ui/button';
import { FiRefreshCcw } from 'react-icons/fi';

interface ChatHeaderProps {
  isRAGMode: boolean;
  onRAGModeChange: (enabled: boolean) => void;
  onNewChat: () => void;
  disabled?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    isRAGMode,
    onRAGModeChange,
    onNewChat,
    disabled
  }) => {
    return (
      <div className="flex justify-between items-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-t-lg border-b border-gray-800">
        <h2 className="text-xl font-semibold text-gray-100">Chat Interface</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800/50 p-2 rounded-md">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isRAGMode}
                onChange={(e) => onRAGModeChange(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-700 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">RAG Mode</span>
            </label>
          </div>
          <Button 
            onClick={onNewChat} 
            variant="outline" 
            size="sm" 
            disabled={disabled}
            className="border-gray-700 text-gray-300 hover:text-gray-100 hover:bg-gray-800"
          >
            <FiRefreshCcw className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>
      </div>
    );
  };
  