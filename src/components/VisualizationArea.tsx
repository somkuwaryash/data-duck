'use client';

import React from 'react';
import Chart from './Chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from "lucide-react";

interface VisualizationAreaProps {
  results: {
    text: string;
    visualization?: {
      type: 'line' | 'bar' | 'pie';
      data: Array<{ [key: string]: string | number }>;
      xKey: string;
      yKey: string;
      title: string;
    };
  } | null;
  isLoading: boolean;
}

const VisualizationArea: React.FC<VisualizationAreaProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Analyzing data...</span>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="h-full flex items-center justify-center text-center text-gray-500">
        No analysis results to display yet. Start a conversation to see visualizations here.
      </div>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <p className="mb-4 text-gray-700 dark:text-gray-300">{results.text}</p>
        {results.visualization && (
          <div className="h-64 md:h-96 mt-4">
            <Chart
              type={results.visualization.type}
              data={results.visualization.data}
              xKey={results.visualization.xKey}
              yKey={results.visualization.yKey}
              title={results.visualization.title}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualizationArea;