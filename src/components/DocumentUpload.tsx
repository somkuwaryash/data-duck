'use client'

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentStorage } from '../utils/DocumentStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { FiUploadCloud, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { Progress } from '@/components/ui/progress';

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface DocumentUploadProps {
  onUploadSuccess: (documents: UploadedDocument[]) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUploadSuccess }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    multiple: true,
  });

  const handleUpload = async () => {
    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      const uploadedDocs: UploadedDocument[] = [];

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const doc = await DocumentStorage.addDocument({
          name: file.name,
          content: await file.text(),
          type: file.type,
          size: file.size,
          uploadDate: new Date(),
        });

        uploadedDocs.push({
          id: doc.id,
          name: doc.filename,
          size: file.size,
          type: file.type,
        });

        setUploadProgress(((i + 1) / uploadedFiles.length) * 100);
      }

      setUploadStatus('success');
      onUploadSuccess(uploadedDocs);

      toast({
        title: "Upload Successful",
        description: `${uploadedFiles.length} document(s) have been uploaded successfully.`,
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

    setUploadedFiles([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'
          }`}
        >
          <input {...getInputProps()} />
          <FiUploadCloud className="mx-auto text-4xl mb-4 text-primary-500" />
          {isDragActive ? (
            <p>Drop the documents here ...</p>
          ) : (
            <p>Drag n drop documents here, or click to select files</p>
          )}
          <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, TXT</p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Selected Files:</h3>
            <ul className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>
            <Button onClick={handleUpload} className="mt-4">
              Upload {uploadedFiles.length} file(s)
            </Button>
          </div>
        )}

        {uploadStatus === 'uploading' && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">Uploading... {uploadProgress.toFixed(0)}%</p>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
            <FiCheck className="mr-2" />
            Documents uploaded successfully!
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
            <FiAlertCircle className="mr-2" />
            Upload failed. Please try again.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;