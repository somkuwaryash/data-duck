// src/components/DatasetList.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { getDatasets, deleteDataset, getDatasetContent, DatasetMetadata } from '@/utils/dataStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Download } from 'lucide-react';

const DatasetList: React.FC = () => {
  const [datasets, setDatasets] = useState<DatasetMetadata[]>([]);

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    const allDatasets = await getDatasets();
    setDatasets(allDatasets);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDataset(id);
      await loadDatasets(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete dataset:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleDownload = async (filename: string, originalName: string) => {
    try {
      const content = await getDatasetContent(filename);
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = originalName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download dataset:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Datasets</CardTitle>
      </CardHeader>
      <CardContent>
        {datasets.length === 0 ? (
          <p>No datasets available. Upload a dataset to get started.</p>
        ) : (
          <ul className="space-y-4">
            {datasets.map((dataset) => (
              <li key={dataset.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div>
                  <h3 className="font-semibold">{dataset.originalName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Uploaded on {new Date(dataset.uploadDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Size: {(dataset.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(dataset.filename, dataset.originalName)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(dataset.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default DatasetList;