import React, { useState, useCallback } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDatasets, getDatasetContent, Dataset } from "@/utils/datasetUtils";
import { executePythonCode } from "@/utils/pyodideUtils";
import { Loader2, FileText } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { writeFileToPyodideFS } from '@/utils/pyodideUtils';

interface DataPreviewProps {
  onDatasetSelect: (dataset: Dataset, dataFrame: string) => void;
  selectedDatasetId: string | null;
}

const DataPreview: React.FC<DataPreviewProps> = ({
  onDatasetSelect,
  selectedDatasetId,
}) => {
  const datasets = useDatasets();
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDatasetSelect = useCallback(async (dataset: Dataset) => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await getDatasetContent(dataset.filename);
      const decoder = new TextDecoder('utf-8');
      const textContent = decoder.decode(content);
      setPreviewContent(textContent);

      writeFileToPyodideFS('/data.csv', textContent);

      const code = `
        import pandas as pd
        
        # Read the data from the file in Pyodide's filesystem
        df = pd.read_csv('/data.csv')
        print(df.head())
        print("\\nDataset Information:")
        print(df.info())
      `;
      const { output } = await executePythonCode(code);
      onDatasetSelect(dataset, output);
    } catch (error) {
      console.error('Error processing dataset:', error);
      setError('Failed to load dataset. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [onDatasetSelect]);

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg border border-gray-800">
      <CardHeader className="flex-shrink-0 border-b border-gray-800">
        <CardTitle className="text-gray-100">Available Datasets</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 min-h-0">
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 px-4 py-2">
            <div className="space-y-2">
              {datasets.map((dataset) => (
                <button
                  key={dataset.id}
                  onClick={() => handleDatasetSelect(dataset)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-all duration-200 ease-in-out",
                    "hover:bg-gray-800",
                    selectedDatasetId === dataset.id
                      ? "bg-gray-800 border border-primary-500"
                      : "bg-gray-800/50 border border-gray-700"
                  )}
                >
                  <div className="flex items-center">
                    <FileText className="mr-3 h-5 w-5 text-primary-400" />
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-gray-200">
                        {dataset.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {dataset.filename}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex-shrink-0 border-t border-gray-800 p-4">
            <h3 className="font-medium text-sm text-gray-300 mb-2">Preview:</h3>
            <ScrollArea className="h-[200px] bg-gray-800/50 rounded-lg border border-gray-700">
              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-primary-400" />
                </div>
              )}
              {error && <div className="text-red-400 p-4">{error}</div>}
              {previewContent && !isLoading && (
                <SyntaxHighlighter
                  language="json"
                  style={vscDarkPlus}
                  customStyle={{ 
                    background: "transparent", 
                    padding: "1rem",
                    margin: 0,
                    fontSize: "0.875rem"
                  }}
                >
                  {previewContent}
                </SyntaxHighlighter>
              )}
              {!previewContent && !isLoading && !error && (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  Select a dataset to preview its contents
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default DataPreview;