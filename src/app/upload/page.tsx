// src/app/upload/page.tsx

import React from 'react';
import FileUpload from '@/components/FileUpload';

const UploadPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Data</h1>
      <FileUpload />
    </div>
  );
};

export default UploadPage;