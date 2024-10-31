import React, { useState, useCallback } from 'react';
import DocumentUpload from '@/components/DocumentUpload';
import DocumentProcessing from '@/components/DocumentProcessing';
import DocumentList from '@/components/DocumentList';
import ChatInterface from '@/components/ChatInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIResponse } from '@/utils/aiUtils';

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  hasEmbedding: boolean;
}

export default function DocumentManagementPage() {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [dataFrameInfo] = useState<string>('');

  const handleUploadSuccess = (documents: Omit<UploadedDocument, 'hasEmbedding'>[]) => {
    const docsWithEmbeddingStatus = documents.map(doc => ({
      ...doc,
      hasEmbedding: false
    }));
    setUploadedDocuments(prevDocs => [...prevDocs, ...docsWithEmbeddingStatus]);
  };

  const handleProcessingComplete = () => {
    setUploadedDocuments(prevDocs => 
      prevDocs.map(doc => ({ ...doc, hasEmbedding: true }))
    );
  };

  const handleNewChat = useCallback(() => {
    console.log('Starting a new chat');
  }, []);

  const handleQuerySubmit = useCallback(async (query: string, aiResponse: AIResponse, executionResult: string) => {
    console.log('Query submitted:', query);
    console.log('AI Response:', aiResponse);
    console.log('Execution Result:', executionResult);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Document Management</h1>
      
      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList className="mb-2">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="list">Document List</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <div className="bg-gray-900 rounded-lg border border-gray-800">
          <TabsContent value="upload" className="p-4 m-0">
            <DocumentUpload onUploadSuccess={handleUploadSuccess} />
          </TabsContent>

          <TabsContent value="process" className="p-4 m-0">
            <DocumentProcessing 
              documents={uploadedDocuments}
              onProcessingComplete={handleProcessingComplete}
            />
          </TabsContent>

          <TabsContent value="list" className="p-4 m-0">
            <DocumentList documents={uploadedDocuments} />
          </TabsContent>

          <TabsContent value="chat" className="p-4 m-0">
            <ChatInterface 
              onNewChat={handleNewChat}
              onQuerySubmit={handleQuerySubmit}
              dataFrameInfo={dataFrameInfo}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}