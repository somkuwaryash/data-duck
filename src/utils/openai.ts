// src/utils/openai.ts

import OpenAI from 'openai';

// Helper to get API key with proper error handling
const getApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    // In development, provide a more detailed error message
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'OpenAI API key is missing. Please ensure you have set NEXT_PUBLIC_OPENAI_API_KEY in your environment variables.',
        '\n',
        'In development: Add it to your .env.local file',
        '\n',
        'In production: Configure it in your deployment platform (e.g., Vercel)'
      );
    }
    throw new Error('OpenAI API key not configured');
  }
  
  return apiKey;
};

// Create a singleton instance of the OpenAI client
let openaiClient: OpenAI | null = null;

export const getOpenAIClient = (): OpenAI => {
  if (!openaiClient) {
    try {
      openaiClient = new OpenAI({
        apiKey: getApiKey(),
        dangerouslyAllowBrowser: true
      });
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      throw error;
    }
  }
  return openaiClient;
};

// Utility function to check if OpenAI is properly configured
export const checkOpenAIConfig = async (): Promise<boolean> => {
  try {
    const client = getOpenAIClient();
    // Make a minimal API call to verify configuration
    await client.chat.completions.create({
      model: "gpt-4",  // Using standard GPT-4 model
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1
    });
    return true;
  } catch (error) {
    console.error('OpenAI configuration check failed:', error);
    return false;
  }
};

// Export default model to use throughout the application
export const DEFAULT_MODEL = "gpt-4o-mini";