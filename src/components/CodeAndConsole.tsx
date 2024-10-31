'use client';

import React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodePanel from "./CodePanel";
import Console from "./Console";
import { Dataset } from "@/utils/datasetUtils";
import { useCodeSnippets } from "@/hooks/useCodeSnippets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface CodeAndConsoleProps {
  isPyodideReady: boolean;
  selectedDataset: Dataset | null;
}

const CodeAndConsole: React.FC<CodeAndConsoleProps> = ({ isPyodideReady, selectedDataset }) => {
  const { codeSnippets, isLoading, error, handleCodeChange, handleExecute } = useCodeSnippets(selectedDataset);
  const [isExecuting, setIsExecuting] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Loading dataset...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const handleCodeExecution = async (id: string, output: string, executionResult: string) => {
    setIsExecuting(true);
    let parsedOutput;
    try {
      parsedOutput = JSON.parse(output);
    } catch (e) {
      console.error("Failed to parse output:", e);
      parsedOutput = output;
    }
    console.log('Execution result:', executionResult);
    await handleExecute(id, parsedOutput);
    setIsExecuting(false);
  };

  const handleClearConsole = (id: string) => {
    handleExecute(id, { output: '' });
  };

  return (
    <Tabs defaultValue={codeSnippets[0].id} className="h-full flex flex-col">
      <TabsList className="mb-2">
        {codeSnippets.map(snippet => (
          <TabsTrigger key={snippet.id} value={snippet.id}>
            {snippet.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex-grow overflow-hidden">
        {codeSnippets.map(snippet => (
          <TabsContent key={snippet.id} value={snippet.id} className="h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <CodePanel
                code={snippet.code}
                onChange={(newCode) => handleCodeChange(snippet.id, newCode)}
                onExecute={(output, executionResult) => handleCodeExecution(snippet.id, output, executionResult)}
                title={`${snippet.title} Code`}
                isPyodideReady={isPyodideReady}
                selectedDataset={selectedDataset}
              />
              <Console
                output={snippet.output}
                visualization={snippet.visualization}
                title={`${snippet.title} Console`}
                isLoading={isExecuting}
                onClear={() => handleClearConsole(snippet.id)}
              />
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default CodeAndConsole;