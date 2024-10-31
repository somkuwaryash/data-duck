import { LucideIcon } from 'lucide-react';


// Base interface for feature cards
export interface Feature {
    title: string;
    description: string;
    icon: LucideIcon;
    link: string;
    gradient?: string;
  }
  
  // Stats displayed on the dashboard
  export interface Stat {
    label: string;
    value: string;
    icon: LucideIcon;
    trend?: {
      value: number;
      isPositive: boolean;
    };
  }
  
  // Dataset related types
  export interface Dataset {
    id: string;
    name: string;
    description: string;
    size: number;
    format: 'csv' | 'json' | 'excel';
    uploadDate: string;
    lastModified: string;
    columns?: DatasetColumn[];
    rowCount?: number;
  }
  
  export interface DatasetColumn {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'date' | 'unknown';
    stats?: {
      nullCount?: number;
      uniqueCount?: number;
      min?: number | string;
      max?: number | string;
      mean?: number;
      median?: number;
    };
  }
  
  // Analysis related types
  export interface AnalysisResult {
    id: string;
    type: 'summary' | 'correlation' | 'trend' | 'anomaly';
    title: string;
    description: string;
    timestamp: string;
    visualization?: Visualization;
    insights: string[];
  }
  
  export interface Visualization {
    type: 'line' | 'bar' | 'scatter' | 'pie' | 'heatmap';
    data: unknown[];
    config: {
      xAxis?: string;
      yAxis?: string;
      title?: string;
      colorScale?: string[];
      aggregation?: 'sum' | 'average' | 'count';
    };
  }
  
  // User preferences and settings
  export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    visualizationDefaults: {
      colorScheme: string[];
      fontFamily: string;
      showLegend: boolean;
      showGrid: boolean;
    };
    analysisSettings: {
      significanceLevel: number;
      outlierThreshold: number;
      defaultTimeFormat: string;
    };
  }
  
  // Document types for RAG functionality
  export interface Document {
    id: string;
    title: string;
    content: string;
    metadata: {
      author?: string;
      createdAt: string;
      lastModified: string;
      tags: string[];
      source?: string;
    };
    embedding?: number[];
    summary?: string;
  }
  
  // Chat and messaging types
  export interface Message {
    id: string;
    content: string;
    type: 'text' | 'code' | 'visualization' | 'error';
    timestamp: string;
    sender: 'user' | 'assistant';
    metadata?: {
      codeLanguage?: string;
      executionTime?: number;
      visualizationType?: string;
    };
    references?: {
      documentId: string;
      relevanceScore: number;
    }[];
  }
  
  // Error handling types
  export interface AppError {
    code: string;
    message: string;
    severity: 'info' | 'warning' | 'error' | 'critical';
    timestamp: string;
    context?: Record<string, unknown>;
    stackTrace?: string;
  }