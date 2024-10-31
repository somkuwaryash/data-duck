// src/utils/DocumentStorage.ts

import Dexie from 'dexie';
import { EmbeddingGenerator } from './EmbeddingGenerator';
import { vectorStore } from './VectorStore';

interface Document {
  id?: number;
  name: string;
  content: string;
  type: string;
  size: number;
  uploadDate: Date;
  embedding?: number[];
}

class DocumentDatabase extends Dexie {
  documents: Dexie.Table<Document, number>;

  constructor() {
    super('DocumentDatabase');
    this.version(1).stores({
      documents: '++id, name, type, uploadDate',
    });
    this.documents = this.table('documents');
  }
}

const db = new DocumentDatabase();

export class DocumentStorage {
  static async addDocument(document: Omit<Document, 'embedding'>): Promise<{ id: string; filename: string }> {
    const id = await db.documents.add(document);
    return {
      id: id.toString(),
      filename: document.name,
    };
  }

  static async getDocument(id: number): Promise<Document | undefined> {
    return await db.documents.get(id);
  }

  static async getAllDocuments(): Promise<Document[]> {
    return await db.documents.toArray();
  }

  static async updateDocumentEmbedding(id: number, content: string): Promise<void> {
    try {
      const embedding = await EmbeddingGenerator.generateEmbedding(content);
      const document = await this.getDocument(id);
      if (document) {
        await db.documents.update(id, { embedding });
        vectorStore.addDocument({
          id: id.toString(),
          content: document.content,
          embedding,
        });
      }
    } catch (error) {
      console.error('Error updating document embedding:', error);
      throw error;
    }
  }

  static async deleteDocument(id: number): Promise<void> {
    await db.documents.delete(id);
    // Note: We should also remove the document from the vector store,
    // but the current implementation doesn't support deletion.
  }

  static async searchSimilarDocuments(query: string, topK: number = 5): Promise<Document[]> {
    const queryEmbedding = await EmbeddingGenerator.generateEmbedding(query);
    const similarDocs = vectorStore.search(queryEmbedding, topK);
    
    const documentIds = similarDocs.map(doc => parseInt(doc.id));
    return await db.documents.where('id').anyOf(documentIds).toArray();
  }
}