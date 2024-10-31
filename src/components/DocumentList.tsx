// src/components/DocumentList.tsx
'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from '@/hooks/use-toast';
import { DocumentStorage } from '@/utils/DocumentStorage';

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  hasEmbedding: boolean;
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const handleDelete = async (id: string) => {
    try {
      await DocumentStorage.deleteDocument(parseInt(id));
      toast({
        title: "Document Deleted",
        description: "The document has been successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Deletion Failed",
        description: "There was an error deleting the document. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Documents</CardTitle>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <p>No documents uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li key={doc.id} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="font-medium">{doc.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    {(doc.size / 1024).toFixed(2)} KB
                  </span>
                  {doc.hasEmbedding ? (
                    <span className="ml-2 text-green-500 text-sm">Embedded</span>
                  ) : (
                    <span className="ml-2 text-yellow-500 text-sm">Not Embedded</span>
                  )}
                </div>
                <div className="space-x-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <FiTrash2 className="h-4 w-4" />
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

export default DocumentList;