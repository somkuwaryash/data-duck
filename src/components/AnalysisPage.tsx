'use client';

import React, { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import ChatInterface from "./ChatInterface";
import DataPreview from "./DataPreview";
import CodeAndConsole from "./CodeAndConsole";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dataset, getDatasetById } from "@/utils/datasetUtils";
import { AIResponse } from "@/utils/aiUtils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoadingScreen from "./LoadingScreen";

const PyodideProvider = dynamic(() => import("@/components/PyodideProvider"), {
  ssr: false,
});

interface AnalysisResult {
  text: string;
  visualization?: {
    type: "line" | "bar" | "pie";
    data: Array<{ [key: string]: string | number }>;
    xKey: string;
    yKey: string;
    title: string;
  };
}

const AnalysisPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [dataFrameInfo, setDataFrameInfo] = useState<string>('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNewChat = useCallback(() => {
    setAnalysisResults(null);
    console.log(analysisResults);
  }, []);

  const handlePyodideReady = useCallback(() => {
    setIsPyodideReady(true);
  }, []);

  useEffect(() => {
    const fetchDataset = async () => {
      const datasetId = searchParams.get("dataset");
      if (datasetId) {
        const dataset = await getDatasetById(datasetId);
        if (dataset) {
          setSelectedDataset(dataset);
        } else {
          setError("Dataset not found");
        }
      }
    };
  
    fetchDataset();
  }, [searchParams]);

  const handleDatasetSelect = useCallback(
    (dataset: Dataset, dataFrame: string) => {
      setSelectedDataset(dataset);
      setDataFrameInfo(dataFrame);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("dataset", dataset.id);
      router.push(`/analyze?${newSearchParams.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleQuerySubmit = useCallback(async (query: string, aiResponse: AIResponse, executionResult: string): Promise<void> => {
    setError(null);
    try {
      const simulatedResponse: AnalysisResult = {
        text: `Analysis results for query: "${query}"\n\nAI Response: ${aiResponse.text}\n\nExecution Result: ${executionResult}`,
        visualization: {
          type: "bar",
          data: [
            { name: "Category A", value: Math.random() * 100 },
            { name: "Category B", value: Math.random() * 100 },
            { name: "Category C", value: Math.random() * 100 },
          ],
          xKey: "name",
          yKey: "value",
          title: "Sample Visualization",
        },
      };
      setAnalysisResults(simulatedResponse);
    } catch (err) {
      setError("Failed to process query. Please try again.");
      console.error('Error:', err);
    } finally {
    }
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <PyodideProvider onReady={handlePyodideReady}>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden bg-gray-50 dark:bg-gray-900">
        {isPyodideReady ? (
          <div className="flex w-full gap-4 p-2">
            <div className="w-1/4 min-w-[250px]">
            <Card className="h-full overflow-hidden">
  <DataPreview
    onDatasetSelect={handleDatasetSelect}
    selectedDatasetId={selectedDataset?.id || null}
  />
</Card>
            </div>
            
            <div className="flex-1">
              <Card className="h-full">
                <CardContent className="p-2 h-full">
                  <Tabs defaultValue="chat" className="h-full flex flex-col">
                    <TabsList className="h-8">
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                      <TabsTrigger value="code">Code</TabsTrigger>
                    </TabsList>
                    <div className="flex-1 mt-2 min-h-0">
                      <TabsContent value="chat" className="h-full m-0">
                        <ChatInterface 
                          onQuerySubmit={handleQuerySubmit} 
                          dataFrameInfo={dataFrameInfo}
                          onNewChat={handleNewChat}
                        />
                      </TabsContent>
                      <TabsContent value="code" className="h-full m-0">
                        <CodeAndConsole 
                          isPyodideReady={isPyodideReady} 
                          selectedDataset={selectedDataset}
                        />
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <LoadingScreen />
        )}
      </div>
    </PyodideProvider>
  );
};

export default AnalysisPage;