import React, { useState } from 'react';
import Chart from './Chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, Trash2 } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';

SyntaxHighlighter.registerLanguage('python', python);

interface ConsoleProps {
  output: string;
  visualization?: {
    type: 'line' | 'bar' | 'pie';
    data: Array<{ [key: string]: string | number }>;
    xKey: string;
    yKey: string;
    title: string;
  };
  title: string;
  isLoading: boolean;
  onClear: () => void;
}

const Console: React.FC<ConsoleProps> = ({ output, visualization, title, isLoading, onClear }) => {
  const [isCopied, setIsCopied] = useState(false);

  let parsedOutput;
  let base64Plot;

  try {
    parsedOutput = JSON.parse(output);
    base64Plot = parsedOutput.plot;
    visualization = parsedOutput.visualization;
  } catch (e) {
    console.error("Failed to parse output:", e);
    // If parsing fails, it means the output is not JSON, so we use it as is
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <Card className="h-[500px] flex flex-col bg-gray-900 text-gray-100 border-gray-700">
      <CardHeader className="pb-2 flex flex-row items-center justify-between border-b border-gray-700">
        <CardTitle>{title}</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="bg-gray-800 text-gray-100 hover:bg-gray-700">
            {isCopied ? 'Copied!' : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={onClear} className="bg-gray-800 text-gray-100 hover:bg-gray-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-[calc(100%-2rem)] px-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
            {/* {parsedOutput} */}
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{ background: 'transparent' }}
                className="font-mono text-sm mb-4"
              >
                {parsedOutput ? parsedOutput : output || 'No output yet. Execute some code to see the results.'}
              </SyntaxHighlighter>
              {base64Plot && (
                <div className="mb-4">
                  <img src={`data:image/png;base64,${base64Plot}`} alt="Matplotlib plot" className="max-w-full" />
                </div>
              )}
              {visualization && (
                <div className="h-64 md:h-96 mt-4">
                  <Chart
                    type={visualization.type}
                    data={visualization.data}
                    xKey={visualization.xKey}
                    yKey={visualization.yKey}
                    title={visualization.title}
                  />
                </div>
              )}
            </>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Console;