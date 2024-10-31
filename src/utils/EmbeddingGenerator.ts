// src/utils/EmbeddingGenerator.ts

import { pipeline, FeatureExtractionPipeline } from '@xenova/transformers';

let embeddingPipeline: FeatureExtractionPipeline | null = null;

export class EmbeddingGenerator {
  static async initialize(): Promise<void> {
    if (!embeddingPipeline) {
      try {
        embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      } catch (error) {
        console.error('Error initializing embedding pipeline:', error);
        throw new Error('Failed to initialize embedding model');
      }
    }
  }

  static async generateEmbedding(text: string): Promise<number[]> {
    if (!embeddingPipeline) {
      await this.initialize();
    }

    try {
      const result = await embeddingPipeline!(text, { pooling: 'mean', normalize: true });
      return Array.from(result.data);
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  static async generateEmbeddings(texts: string[]): Promise<number[][]> {
    if (!embeddingPipeline) {
      await this.initialize();
    }

    try {
      const results = await Promise.all(
        texts.map(text => embeddingPipeline!(text, { pooling: 'mean', normalize: true }))
      );
      return results.map(result => Array.from(result.data));
    } catch (error) {
      console.error('Error generating embeddings:', error);
      throw error;
    }
  }
}