// src/app/datasets/page.tsx

'use client';

import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import DatasetList from '@/components/DatasetList';
import { DatasetMetadata } from '@/utils/dataStorage';

const DatasetManagementPage: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = (metadata: DatasetMetadata) => {
    console.log('File uploaded successfully:', metadata);
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Dataset Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upload New Dataset</h2>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Datasets</h2>
          <DatasetList key={refreshKey} />
        </div>
      </div>
    </div>
  );
};

export default DatasetManagementPage;