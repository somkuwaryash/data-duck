# DataDuck 🦆

DataDuck is an AI-powered data analysis platform that combines the power of GPT-4, Python, and modern web technologies to provide an intuitive interface for data exploration and analysis. It allows users to interact with their data using natural language queries while providing powerful visualization and code generation capabilities.


## 🌟 Features

### Core Capabilities

- **Natural Language Data Analysis**: Ask questions about your data in plain English

- **AI-Powered Insights**: Leverage GPT-4 for intelligent data interpretation

- **Real-time Python Execution**: Run Python code directly in the browser using Pyodide

- **Interactive Visualizations**: Generate and customize charts and graphs

- **RAG (Retrieval-Augmented Generation)**: Enhanced context-aware responses using document embeddings

### Technical Features

- **Modern Web Stack**: Built with Next.js 13+ and TypeScript

- **AI Integration**: Seamless integration with OpenAI's GPT-4

- **In-Browser Python**: Pyodide integration for client-side Python execution

- **Responsive UI**: Built with Tailwind CSS and shadcn/ui components

- **Vector Search**: Efficient similarity search for document retrieval

- **Local Storage**: Browser-based data persistence using LocalForage

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher

- OpenAI API key

- Modern web browser (Chrome, Firefox, or Safari recommended)

- Git

### Environment Setup

1\. Clone the repository:

```bash

git clone https://github.com/somkuwaryash/data-duck.git

cd dataduck

```

2\. Install dependencies:

```bash

npm install

# or

yarn install

```

3\. Create a `.env.local` file in the root directory:

```env

NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key

```

4\. Start the development server:

```bash

npm run dev

# or

yarn dev

```

### Important Notes

- The application requires a significant amount of browser resources due to Pyodide

- Initial loading might take time as it downloads the Python environment

- Ensure you have a stable internet connection for AI features

## 🔧 Configuration

### OpenAI API

- Set up an OpenAI account and obtain an API key

- Configure the key in your environment variables

- Adjust the model settings in `src/utils/openai.ts` if needed

### Python Environment

The application uses Pyodide for running Python code in the browser. Key configurations:

- Default Python packages: numpy, pandas, matplotlib, scipy

- Custom package installation available through Pyodide

- Memory management considerations for browser-based execution

## 📚 Documentation

### Architecture

DataDuck follows a modular architecture:

- **Frontend**: Next.js with React components

- **AI Layer**: OpenAI integration and RAG implementation

- **Data Processing**: Browser-based Python execution

- **Storage**: LocalForage for persistent storage

### Key Components

- `ChatInterface`: Natural language interaction

- `CodeAndConsole`: Python code execution

- `VisualizationArea`: Data visualization

- `DocumentProcessing`: RAG document handling

### State Management

- React Context for global state

- LocalForage for persistent storage

- Custom hooks for complex state logic

📖 Usage Guide
--------------

### 1\. Data Analysis Interface

Data Preview
------------

1.  Navigate to the `/analyze` page
2.  The left panel shows your uploaded datasets
3.  Click on a dataset to:
    -   View a preview of the data
    -   See basic dataset information
    -   Load it for analysis

AI Chat Interface
-----------------

1.  With a dataset selected, use the chat interface to analyze your data
2.  Example queries:

    plaintext

    Copy

    `- "Show me the basic statistics of this dataset"
    - "Calculate the average values by category"
    - "Create a visualization of the trends"`

3.  The AI will:
    -   Generate appropriate Python code
    -   Execute the code automatically
    -   Show results and visualizations
    -   Provide explanations of the analysis

Code and Console
----------------

-   View generated Python code in the Code tab
-   See execution results in the Console
-   Copy code snippets for reuse
-   Clear outputs as needed

### 2\. Document Management (RAG)

Document Upload
---------------

1.  Go to the `/documents` page
2.  Upload supported document types:
    -   PDF files
    -   Text files (.txt)
    -   Word documents (.docx)
3.  View uploaded documents in the document list

Document Processing
-------------------

1.  Select documents for processing
2.  Wait for embedding generation
3.  Track processing status in the progress bar
4.  Processed documents are ready for RAG queries

Using RAG Mode
--------------

1.  Toggle RAG mode in the chat interface
2.  Ask questions about your documents:

    plaintext

    Copy

    `- "Summarize the key points from the documents"
    - "What do the documents say about [specific topic]?"
    - "Compare the information between documents"`

3.  The system will:
    -   Search relevant document sections
    -   Generate context-aware responses
    -   Provide source references

### 💡 Tips & Best Practices

1.  **Data Analysis**
    -   Keep datasets under 100MB for optimal performance
    -   Be specific in your questions
    -   Use clear business metrics in queries
    -   Save important results using the export function
2.  **Document Analysis**
    -   Process documents before starting RAG queries
    -   Use focused questions for better results
    -   Check document processing status before querying
    -   Clear irrelevant documents to improve performance
3.  **Troubleshooting Common Issues**

| Issue | Solution |
| --- | --- |
| Slow data loading | Reduce dataset size |
| Failed document processing | Try re-uploading the document |
| RAG mode not working | Ensure documents are processed |
| Execution errors | Check dataset format |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1\. Fork the repository

2\. Create a feature branch: `git checkout -b feature/amazing-feature`

3\. Commit your changes: `git commit -m 'Add amazing feature'`

4\. Push to the branch: `git push origin feature/amazing-feature`

5\. Open a Pull Request

## ⚠️ Known Issues & Limitations

1\. **Browser Resources**

   - Heavy memory usage due to Pyodide

   - Initial loading time can be significant

   - Limited by browser storage capacity

2\. **Python Environment**

   - Not all Python packages are available

   - Limited by Pyodide's capabilities

   - Memory constraints for large datasets

3\. **AI Integration**

   - Requires active internet connection

   - API rate limits apply

   - Cost considerations for API usage

## 🔮 Future Roadmap

- [ ] Server-side Python execution option

- [ ] Enhanced data visualization capabilities

- [ ] Multiple AI model support

- [ ] Collaborative features

- [ ] Extended file format support

- [ ] Custom Python package management

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API

- Pyodide team for browser-based Python

- shadcn/ui for component library

- Next.js team for the framework

- All contributors and supporters

## 💬 Support

For support, questions, or feedback:

- Open an issue on GitHub

- Join our Discord community

- Contact us at support@dataduck.com

---

Built with ❤️ by the DataDuck Team

[Website](https://data-duck.vercel.app/)