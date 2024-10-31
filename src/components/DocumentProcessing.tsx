import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { DocumentStorage } from '../utils/DocumentStorage';
import { EmbeddingGenerator } from '../utils/EmbeddingGenerator';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  hasEmbedding: boolean;
}

interface DocumentProcessingProps {
  documents: Document[];
  onProcessingComplete: () => void;
}

const DocumentProcessing: React.FC<DocumentProcessingProps> = ({ documents, onProcessingComplete }) => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      setIsModelLoading(true);
      try {
        await EmbeddingGenerator.initialize();
      } catch (error) {
        console.error('Error loading embedding model:', error);
        toast({
          title: "Model Loading Error",
          description: "Failed to load the embedding model. Please refresh the page and try again.",
          variant: "destructive",
        });
      } finally {
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    setSelectedDocuments(documents.filter(doc => !doc.hasEmbedding).map(doc => doc.id));
  }, [documents]);

  const handleDocumentSelection = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const handleProcessDocuments = async () => {
    setProcessingStatus('processing');
    setProcessingProgress(0);

    try {
      for (let i = 0; i < selectedDocuments.length; i++) {
        const docId = selectedDocuments[i];
        const doc = await DocumentStorage.getDocument(parseInt(docId));
        
        if (doc && !doc.embedding) {
          await DocumentStorage.updateDocumentEmbedding(parseInt(docId), doc.content);
        }

        setProcessingProgress(((i + 1) / selectedDocuments.length) * 100);
      }

      setProcessingStatus('complete');
      onProcessingComplete();

      toast({
        title: "Processing Complete",
        description: `${selectedDocuments.length} document(s) have been processed successfully.`,
        variant: "default",
      });
    } catch (error) {
      console.error('Processing failed:', error);
      setProcessingStatus('idle');
      
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Documents</CardTitle>
      </CardHeader>
      <CardContent>
      {isModelLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>Loading embedding model...</p>
          </div>
        ) : (
          <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Select documents to process:</h3>
            <ul className="space-y-2">
              {documents.map(doc => (
                <li key={doc.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={doc.id}
                    checked={selectedDocuments.includes(doc.id)}
                    onCheckedChange={() => handleDocumentSelection(doc.id)}
                    disabled={doc.hasEmbedding}
                  />
                  <label htmlFor={doc.id} className="text-sm">
                    {doc.name} ({(doc.size / 1024).toFixed(2)} KB)
                    {doc.hasEmbedding && <span className="ml-2 text-green-500">(Embedded)</span>}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <Button 
            onClick={handleProcessDocuments} 
            disabled={processingStatus === 'processing' || selectedDocuments.length === 0}
          >
            Process Selected Documents
          </Button>

          {processingStatus === 'processing' && (
            <div className="mt-4">
              <Progress value={processingProgress} className="w-full" />
              <p className="text-sm text-gray-500 mt-2">Processing... {processingProgress.toFixed(0)}%</p>
            </div>
          )}

          {processingStatus === 'complete' && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
              Processing complete! Documents are ready for RAG.
            </div>
          )}
        </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentProcessing;