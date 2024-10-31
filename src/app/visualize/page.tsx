'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Chart from '@/components/Chart';

const VisualizePage: React.FC = () => {
  // Sample data for demonstration
  const sampleData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Visualization</h1>
      <Card>
        <CardHeader>
          <CardTitle>Sample Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-96">
            <Chart
              type="line"
              data={sampleData}
              xKey="name"
              yKey="value"
              title="Sample Monthly Data"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualizePage;