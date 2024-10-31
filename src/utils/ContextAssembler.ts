// src/utils/ContextAssembler.ts

import { DocumentStorage } from './DocumentStorage';

export class ContextAssembler {
  static async assembleContext(query: string, maxTokens: number = 2000): Promise<string> {
    const similarDocuments = await DocumentStorage.searchSimilarDocuments(query);
    let context = '';
    let tokenCount = 0;

    for (const doc of similarDocuments) {
      const documentTokens = this.countTokens(doc.content);
      if (tokenCount + documentTokens <= maxTokens) {
        context += doc.content + '\n\n';
        tokenCount += documentTokens;
      } else {
        const remainingTokens = maxTokens - tokenCount;
        const truncatedContent = this.truncateText(doc.content, remainingTokens);
        context += truncatedContent;
        break;
      }
    }

    return context.trim();
  }

  private static countTokens(text: string): number {
    // This is a very rough estimation. In a production environment,
    // you'd want to use a proper tokenizer that matches the one used by your AI model.
    return text.split(/\s+/).length;
  }

  private static truncateText(text: string, maxTokens: number): string {
    const words = text.split(/\s+/);
    return words.slice(0, maxTokens).join(' ');
  }
}