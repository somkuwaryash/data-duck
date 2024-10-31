// src/components/PyodideProvider.tsx

import React, { useEffect, useState } from 'react';
import { initializePyodide } from '@/utils/pyodideUtils';
import LoadingScreen from './LoadingScreen';

interface PyodideProviderProps {
  children: React.ReactNode;
  onReady: () => void;
}

const PyodideProvider: React.FC<PyodideProviderProps> = ({ children, onReady }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        await initializePyodide();
        setIsLoading(false);
        onReady();
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    loadPyodide();
  }, [onReady]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="flex w-full gap-4 p-2">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error initializing Python environment: {error}</div>;
  }

  return <>{children}</>;
};

export default PyodideProvider;