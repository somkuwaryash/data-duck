import { FiUpload, FiSearch, FiPieChart } from 'react-icons/fi';

export const features = [
  {
    title: "Upload",
    description: "Drag and drop your CSV, Excel, or JSON files to get started.",
    icon: FiUpload,
    link: "/upload"
  },
  {
    title: "Analyze",
    description: "Ask questions about your data in plain English and get AI-powered insights.",
    icon: FiSearch,
    link: "/analyze"
  },
  {
    title: "Visualize",
    description: "Generate beautiful charts and graphs to better understand your data.",
    icon: FiPieChart,
    link: "/visualize"
  }
];