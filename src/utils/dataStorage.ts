import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';

export interface DatasetMetadata {
    id: string;
    filename: string;
    originalName: string;
    uploadDate: string;
    size: number;
  }

const METADATA_KEY = 'datasetMetadata';

export const saveUploadedFile = async (file: File): Promise<DatasetMetadata> => {
  const id = uuidv4();
  const filename = `${id}-${file.name}`;

  // Save file content
  await localforage.setItem(filename, await file.arrayBuffer());

  // Create metadata
  const metadata: DatasetMetadata = {
    id,
    filename,
    originalName: file.name,
    uploadDate: new Date().toISOString(),
    size: file.size,
  };

  // Update metadata
  const existingMetadata = await getDatasets();
  existingMetadata.push(metadata);
  await localforage.setItem(METADATA_KEY, existingMetadata);

  return metadata;
};

export const getDatasets = async (): Promise<DatasetMetadata[]> => {
  const metadata = await localforage.getItem<DatasetMetadata[]>(METADATA_KEY);
  return metadata || [];
};

export const getDatasetById = async (id: string): Promise<DatasetMetadata | undefined> => {
  const datasets = await getDatasets();
  return datasets.find(dataset => dataset.id === id);
};

export const getDatasetContent = async (filename: string): Promise<ArrayBuffer> => {
    console.log('Attempting to retrieve dataset:', filename);
    const content = await localforage.getItem<ArrayBuffer>(filename);
    if (!content) {
      console.error('Dataset content not found for:', filename);
      throw new Error('Dataset content not found');
    }
    console.log('Dataset content retrieved successfully');
    return content;
  };

export const deleteDataset = async (id: string): Promise<void> => {
  const datasets = await getDatasets();
  const datasetToDelete = datasets.find(dataset => dataset.id === id);

  if (datasetToDelete) {
    // Delete file content
    await localforage.removeItem(datasetToDelete.filename);

    // Update metadata
    const updatedDatasets = datasets.filter(dataset => dataset.id !== id);
    await localforage.setItem(METADATA_KEY, updatedDatasets);
  }
};