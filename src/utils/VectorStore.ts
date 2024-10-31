export interface VectorDocument {
    id: string;
    content: string;
    embedding: number[];
  }
  
  export class VectorStore {
    private documents: VectorDocument[] = [];
  
    addDocument(document: VectorDocument): void {
      this.documents.push(document);
    }
  
    addDocuments(documents: VectorDocument[]): void {
      this.documents.push(...documents);
    }
  
    private cosineSimilarity(a: number[], b: number[]): number {
      const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
      const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
      const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
      return dotProduct / (magnitudeA * magnitudeB);
    }
  
    search(queryEmbedding: number[], topK: number = 5): VectorDocument[] {
      const similarities = this.documents.map(doc => ({
        ...doc,
        similarity: this.cosineSimilarity(queryEmbedding, doc.embedding)
      }));
  
      return similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK);
    }
  }
  
  export const vectorStore = new VectorStore();