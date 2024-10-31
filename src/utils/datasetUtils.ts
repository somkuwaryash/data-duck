// src/utils/datasetUtils.ts

import { useState, useEffect } from 'react';
import { getDatasets, getDatasetById as getDatasetByIdStorage, getDatasetContent as getDatasetContentStorage } from './dataStorage';

export interface Dataset {
  id: string;
  name: string;
  description: string;
  filename: string;
  uploadDate: string;
}

export const useDatasets = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  useEffect(() => {
    const fetchDatasets = async () => {
      const fetchedDatasets = await getDatasets();
      const mappedDatasets = fetchedDatasets.map(dataset => ({
        id: dataset.id,
        name: dataset.originalName,
        description: `Uploaded on ${new Date(dataset.uploadDate).toLocaleDateString()}`,
        filename: dataset.filename,
        uploadDate: dataset.uploadDate,
      }));
      setDatasets(mappedDatasets);
    };

    fetchDatasets();
  }, []);

  return datasets;
};

export const getDatasetById = async (id: string): Promise<Dataset | undefined> => {
  const dataset = await getDatasetByIdStorage(id);
  if (dataset) {
    return {
      id: dataset.id,
      name: dataset.originalName,
      description: `Uploaded on ${new Date(dataset.uploadDate).toLocaleDateString()}`,
      filename: dataset.filename,
      uploadDate: dataset.uploadDate,
    };
  }
  return undefined;
};

export const getDatasetContent = async (filename: string): Promise<ArrayBuffer> => {
  return getDatasetContentStorage(filename);
};

// Note: This function might not be necessary anymore since we're not using file system paths
// You might want to remove it or replace it with a function that returns a URL for the dataset if needed
export const getDatasetPath = (filename: string): string => {
  return filename; // or implement a way to get a URL for the dataset if needed
};