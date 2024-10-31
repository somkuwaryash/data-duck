import { useState, useEffect } from "react";
import { Dataset, getDatasetContent } from "@/utils/datasetUtils";

export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  output: string;
  visualization?: {
    type: "line" | "bar" | "pie";
    data: Array<{ [key: string]: string | number }>;
    xKey: string;
    yKey: string;
    title: string;
  };
}

interface ExecutionOutput {
  plot?: string;
  visualization?: CodeSnippet["visualization"];
  [key: string]: unknown;
}

const initialCodeSnippets: CodeSnippet[] = [
  {
    id: "data-loading",
    title: "Data Loading",
    code: `
import pandas as pd
import io

# Load the dataset
# This is a placeholder. The actual data will be loaded when a dataset is selected.
data = """
Sample data will appear here
"""

# Read the data into a pandas DataFrame
df = pd.read_csv(io.StringIO(data))

# Display the first few rows and basic information about the dataset
print(df.head())
print("\\nDataset Information:")
print(df.info())
    `,
    output: "",
  },
  {
    id: "data-exploration",
    title: "Data Exploration",
    code: `
# Assuming 'df' is your DataFrame

# Display basic statistics
print(df.describe())

# Check for missing values
print("\\nMissing Values:")
print(df.isnull().sum())

# Display unique values in each column
for column in df.columns:
    print(f"\\nUnique values in {column}:")
    print(df[column].value_counts())
    `,
    output: "",
  },
  {
    id: "data-cleaning",
    title: "Data Cleaning",
    code: `
# Assuming 'df' is your DataFrame

# Remove duplicates
df.drop_duplicates(inplace=True)

# Handle missing values (example: fill with mean)
df.fillna(df.mean(), inplace=True)

# Convert data types if necessary
# df['column_name'] = df['column_name'].astype('int64')

# Remove outliers (example: using Z-score)
from scipy import stats
import numpy as np
df = df[(np.abs(stats.zscore(df.select_dtypes(include=np.number))) < 3).all(axis=1)]

print("Data cleaning completed. Updated DataFrame info:")
print(df.info())
    `,
    output: "",
  },
  {
    id: "data-visualization",
    title: "Data Visualization",
    code: `
    import matplotlib.pyplot as plt
    import io
    import base64
    import numpy as np
    import json
    
    # Assuming 'df' is your DataFrame
    
    # Function to get the first numeric column
    def get_first_numeric_column(df):
        numeric_columns = df.select_dtypes(include=[np.number]).columns
        return numeric_columns[0] if len(numeric_columns) > 0 else None
    
    # Get the first numeric column
    numeric_column = get_first_numeric_column(df)
    
    if numeric_column is None:
        print("No numeric columns found in the dataset. Please ensure your dataset contains numeric data for visualization.")
    else:
        # Create a histogram
        plt.figure(figsize=(10, 6))
        plt.hist(df[numeric_column], bins=20, edgecolor='black')
        plt.title(f'Histogram of {numeric_column}')
        plt.xlabel('Value')
        plt.ylabel('Frequency')
        plt.grid(True, alpha=0.3)
    
        # Save the plot to a bytes buffer
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        plot = base64.b64encode(buffer.getvalue()).decode('utf-8')
        plt.close()
    
        # Prepare data for Plotly visualization
        plotly_data = df[numeric_column].value_counts().reset_index()
        plotly_data.columns = ['value', 'count']
        plotly_data = plotly_data.to_dict('records')
    
        visualization = {
            "type": "bar",
            "data": plotly_data,
            "xKey": "value",
            "yKey": "count",
            "title": f"Distribution of {numeric_column}"
        }
    
        print(f"Visualization created for column: {numeric_column}")
        print(json.dumps({"plot": plot, "visualization": visualization}))
    `,
    output: "",
  },
  {
    id: "misc",
    title: "Misc",
    code: `
# This section is for miscellaneous code or experiments

# Example: Create a simple function
def greet(name):
    return f"Hello, {name}!"

# Test the function
print(greet("World"))

# You can add any other code or experiments here
    `,
    output: "",
  },
];

export const useCodeSnippets = (selectedDataset: Dataset | null) => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>(() => {
    const savedSnippets = localStorage.getItem("codeSnippets");
    return savedSnippets ? JSON.parse(savedSnippets) : initialCodeSnippets;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDataset) {
      setIsLoading(true);
      setError(null);
      getDatasetContent(selectedDataset.filename) // Changed from fileName to filename
        .then((content) => {
          const dataLoadingCode = `
import pandas as pd
import io

# Dataset: ${selectedDataset.name}
# Description: ${selectedDataset.description}

# Load the dataset
data = """
${content}
"""

# Read the data into a pandas DataFrame
df = pd.read_csv(io.StringIO(data))

# Display the first few rows and basic information about the dataset
print(df.head())
print("\\nDataset Information:")
print(df.info())
          `;

          setCodeSnippets((snippets) =>
            snippets.map((snippet) =>
              snippet.id === "data-loading"
                ? { ...snippet, code: dataLoadingCode }
                : snippet
            )
          );
        })
        .catch((err) => {
          setError(`Failed to load dataset: ${err.message}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedDataset]);

  useEffect(() => {
    localStorage.setItem("codeSnippets", JSON.stringify(codeSnippets));
  }, [codeSnippets]);

  const handleCodeChange = (id: string, newCode: string) => {
    setCodeSnippets((snippets) =>
      snippets.map((snippet) =>
        snippet.id === id ? { ...snippet, code: newCode } : snippet
      )
    );
  };

  const handleExecute = (id: string, output: ExecutionOutput) => {
    setCodeSnippets((snippets) =>
      snippets.map((snippet) =>
        snippet.id === id
          ? {
              ...snippet,
              output: JSON.stringify(output),
              visualization: output.visualization,
            }
          : snippet
      )
    );
  };

  const clearOutput = (id: string) => {
    setCodeSnippets((snippets) =>
      snippets.map((snippet) =>
        snippet.id === id
          ? { ...snippet, output: "", visualization: undefined }
          : snippet
      )
    );
  };

  return {
    codeSnippets,
    isLoading,
    error,
    handleCodeChange,
    handleExecute,
    clearOutput,
  };
};
