'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { saveUploadedFile, DatasetMetadata } from '@/utils/dataStorage';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';


interface FileUploadProps {
  onUploadSuccess?: (metadata: DatasetMetadata) => void;
}



const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    handleFileUpload(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/json': ['.json'],
    },
    multiple: false,
  });

  const handleFileUpload = async (file: File) => {
    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      // Simulating upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const metadata = await saveUploadedFile(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus('success');
      
      if (onUploadSuccess) {
        onUploadSuccess(metadata);
      }

      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded successfully.`,
        variant: "default",
      });
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
            : 'border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500'
        }`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-4xl mb-4 text-primary-500" />
        <p className="text-lg mb-2">Drag & drop your file here, or click to select</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Supported formats: CSV, Excel, JSON</p>
      </div>

      {uploadedFile && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="font-semibold">{uploadedFile.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
          {uploadStatus === 'uploading' && (
            <Progress value={uploadProgress} className="mt-2" />
          )}
        </div>
      )}

      {uploadStatus === 'uploading' && (
        <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg flex items-center">
          <FiUploadCloud className="animate-bounce mr-2" />
          Uploading... {uploadProgress.toFixed(0)}%
        </div>
      )}

      {uploadStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg flex items-center">
          <FiCheckCircle className="mr-2" />
          File uploaded successfully!
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg flex items-center">
          <FiAlertCircle className="mr-2" />
          Upload failed. Please try again.
        </div>
      )}

      <Button
        onClick={() => {
          setUploadedFile(null);
          setUploadStatus('idle');
          setUploadProgress(0);
        }}
        className="mt-4"
        variant="outline"
      >
        Clear
      </Button>
    </div>
  );
};

export default FileUpload;