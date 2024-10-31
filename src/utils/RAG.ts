// src/utils/RAG.ts

import OpenAI from 'openai';
import { DocumentStorage } from './DocumentStorage';

const api = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export class RAG {
  static async process(query: string): Promise<string> {
    // Retrieve relevant documents
    const relevantDocs = await DocumentStorage.searchSimilarDocuments(query, 3);
    
    // Prepare context from relevant documents
    const context = relevantDocs.map(doc => doc.content).join('\n\n');

    // Generate response using GPT model
    const response = await api.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant that answers questions based on the provided context. If the answer cannot be found in the context, say so." },
        { role: "user", content: `Context: ${context}\n\nQuestion: ${query}` }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "Sorry, I couldn't generate a response.";
  }
}
