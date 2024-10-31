// src/utils/aiUtils.ts

import OpenAI from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const api = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export interface AIResponse {
  text: string;
  code?: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface BusinessScenario {
  name: string;
  description: string;
  examples: ChatMessage[];
}

const businessScenarios: BusinessScenario[] = [
  {
    name: 'Sales Analysis',
    description: 'Analyze sales data to identify trends and opportunities.',
    examples: [
      { role: 'user', content: 'What were our top-selling products last quarter?' },
      { role: 'assistant', content: "To find the top-selling products from last quarter, we'll need to analyze the sales data. Here's a Python code snippet to do that:\n\n```python\nimport pandas as pd\n\n# Assuming 'df' is our sales DataFrame\n# Filter for last quarter\nlast_quarter = df[df['date'].dt.quarter == df['date'].dt.quarter.max()]\n\n# Group by product and sum the sales\ntop_products = last_quarter.groupby('product')['sales'].sum().sort_values(descending=True)\n\n# Display top 5 products\nprint(top_products.head())\n```" },
      { role: 'user', content: 'Can you show me the monthly sales trend for the past year?' },
      { role: 'assistant', content: "Here's how we can visualize the monthly sales trend:\n\n```python\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\n# Group by month and sum sales\nmonthly_sales = df.groupby(df['date'].dt.to_period('M'))['sales'].sum()\n\n# Create the plot\nplt.figure(figsize=(12, 6))\nplt.plot(monthly_sales.index.astype(str), monthly_sales.values, marker='o')\nplt.title('Monthly Sales Trend')\nplt.xticks(rotation=45)\nplt.grid(True)\nplt.show()\n```" },
    ],
  },
];

export async function queryAI(messages: ChatMessage[], scenario?: string): Promise<AIResponse> {
  try {
    let contextMessages: ChatMessage[] = [];

    if (scenario) {
      const selectedScenario = businessScenarios.find(s => s.name === scenario);
      if (selectedScenario) {
        contextMessages = [
          { role: 'system', content: `You are an AI assistant specializing in ${selectedScenario.name}. ${selectedScenario.description} Always provide Python code examples when appropriate.` },
          ...selectedScenario.examples
        ];
      }
    }

    const completion = await api.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [...contextMessages, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error("No response from AI");
    }

    // Parse response to separate code from text
    const parts = response.split('```');
    let text = '';
    let code = '';

    parts.forEach((part, index) => {
      if (index % 2 === 0) {
        text += part.trim() + ' ';
      } else if (part.startsWith('python')) {
        code += part.replace('python', '').trim() + '\n';
      }
    });

    return { text: text.trim(), code: code.trim() };
  } catch (error) {
    console.error("Error querying AI:", error);
    throw error;
  }
}

export function getBusinessScenarios(): BusinessScenario[] {
  return businessScenarios;
}