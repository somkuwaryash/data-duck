// src/components/chat/MessageList.tsx
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiCopy, FiDownload } from 'react-icons/fi';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MessageListProps } from '@/types/chat';

export const MessageList: React.FC<MessageListProps> = ({ messages, onExport, onCopyCode }) => {
  return (
    <ScrollArea className="flex-grow mb-4 p-4 h-[calc(100vh-18rem-120px)]">
      {messages.map((message) => (
        <Card 
          key={message.id} 
          className={`mb-4 ${
            message.isUser 
              ? 'ml-auto bg-primary-600/10 border-primary-500/20' 
              : 'mr-auto bg-secondary-600/10 border-secondary-500/20'
          } max-w-[80%] border break-words overflow-hidden`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.isUser 
                  ? 'bg-primary-500/20 text-primary-500' 
                  : 'bg-secondary-500/20 text-secondary-500'
              }`}>
                {message.isUser ? 'U' : 'AI'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-2 text-gray-100 whitespace-pre-wrap break-words">
                  {message.text}
                </div>
                {message.code && (
                  <div className="mb-2 overflow-x-auto">
                    <div className="text-sm font-semibold mb-1 flex justify-between items-center">
                      <span className="text-gray-300">Generated Code:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCopyCode(message.code!)}
                        className="text-gray-300 hover:text-gray-100"
                      >
                        <FiCopy className="h-4 w-4 mr-2" /> Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        className="rounded-md text-sm bg-gray-900/50 overflow-x-auto"
                        customStyle={{ margin: 0, padding: '1rem' }}
                      >
                        {message.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
                {message.executionResult && (
                  <div className="mb-2 overflow-x-auto">
                    <div className="text-sm font-semibold mb-1 text-gray-300">
                      Execution Result:
                    </div>
                    <pre className="bg-gray-900/50 p-2 rounded-md text-sm whitespace-pre-wrap text-gray-100 overflow-x-auto">
                      {message.executionResult}
                    </pre>
                  </div>
                )}
                {message.plot && (
                  <div className="mt-4">
                    <img
                      src={`data:image/png;base64,${message.plot}`}
                      alt="Generated Plot"
                      className="max-w-full h-auto rounded-md border border-gray-700"
                    />
                    <Button
                      onClick={() => onExport(message)}
                      variant="outline"
                      size="sm"
                      className="mt-2 border-gray-700 text-gray-300 hover:text-gray-100 hover:bg-gray-800"
                    >
                      <FiDownload className="mr-2 h-4 w-4" /> Export Plot
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
};