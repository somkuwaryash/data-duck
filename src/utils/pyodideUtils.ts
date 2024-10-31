declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
    pyodide: PyodideInterface;
  }
}

interface PyodideInterface {
  loadPackage: (packages: string[]) => Promise<void>;
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  FS: {
    writeFile: (path: string, data: Uint8Array, options?: { encoding?: string }) => void;
    readFile: (path: string, options?: { encoding?: string }) => string | Uint8Array;
  };
}

interface ExecutionResult {
  output: string;
  executionResult: string;
  base64Fig: string;
}

let pyodide: PyodideInterface | null = null;

export const initializePyodide = async (): Promise<void> => {
  if (typeof window !== "undefined" && !window.pyodide) {
    // Load Pyodide script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
    document.head.appendChild(script);

    await new Promise<void>((resolve) => {
      script.onload = () => resolve();
    });

    // Initialize Pyodide
    pyodide = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
    });

    await pyodide.loadPackage(["numpy", "pandas", "matplotlib", "scipy"]);
    window.pyodide = pyodide;
  } else if (typeof window !== "undefined") {
    pyodide = window.pyodide;
  }
};

// src/utils/pyodideUtils.ts

export const executePythonCode = async (code: string): Promise<ExecutionResult> => {
  if (!pyodide) {
    throw new Error('Pyodide is not initialized');
  }

  try {
    console.log('Executing Python code:', code);

    // Import sys and set up stdout capture
    pyodide.runPython(`
      import sys
      import io
      sys.stdout = io.StringIO()
    `);

    // Set up matplotlib for non-interactive backend
    pyodide.runPython(`
      import matplotlib
      matplotlib.use('Agg')
      import matplotlib.pyplot as plt
      import base64
      from io import BytesIO

      def fig_to_base64(fig):
          buf = BytesIO()
          fig.savefig(buf, format='png')
          buf.seek(0)
          return base64.b64encode(buf.getvalue()).decode('utf-8')
    `);

    // Run the user's code
    const result = await pyodide.runPythonAsync(code);
    console.log('Python execution result:', result);

    // Get the captured output and convert it to a string
    const output = pyodide.runPython('sys.stdout.getvalue()') as string;

    // Reset stdout
    pyodide.runPython('sys.stdout = sys.__stdout__');

    // Check if there's a matplotlib figure and convert it to base64
    const hasFigure = pyodide.runPython('plt.get_fignums()') as number[];
    let base64Fig = '';
    if (hasFigure.length > 0) {
      base64Fig = pyodide.runPython('fig_to_base64(plt.gcf())') as string;
      pyodide.runPython('plt.close()');
    }

    // Convert the result to a string if it's not already
    const executionResult = typeof result === 'string' ? result : JSON.stringify(result);

    return { 
      output, 
      executionResult,
      base64Fig
    };
  } catch (error) {
    console.error('Error in Python execution:', error);
    if (error instanceof Error) {
      return { output: `Error: ${error.message}`, executionResult: '', base64Fig: '' };
    }
    return { output: 'An unknown error occurred', executionResult: '', base64Fig: '' };
  }
};


export const writeFileToPyodideFS = (path: string, content: string): void => {
  if (!pyodide) {
    throw new Error('Pyodide is not initialized');
  }

  const uint8Array = new TextEncoder().encode(content);
  pyodide.FS.writeFile(path, uint8Array);
};

export const readFileFromPyodideFS = (path: string): string => {
  if (!pyodide) {
    throw new Error('Pyodide is not initialized');
  }

  const content = pyodide.FS.readFile(path, { encoding: 'utf8' });
  return typeof content === 'string' ? content : new TextDecoder().decode(content);
};