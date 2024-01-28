<h1> Document Viewer </h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/9c6f6484-7c7f-406a-ae2b-9be0550bfeee/deploy-status)](https://app.netlify.com/sites/document-viewer-adarsh/deploys)

Welcome to the Document Viewer project! This web application allows users to view and interact with documents online. You can find the live demo [here](https://document-viewer-adarsh.netlify.app/).

# Features

### 1. Navigate to Any Page
Easily navigate through multi-page documents. Whether your document has 5 pages or more, you can jump to any specific page with ease.

### 2. Rotate
Rotate your document by 90 degrees, either clockwise or anticlockwise, to suit your preferred orientation.

### 3. Zoom In/Out
Adjust the zoom level to get a closer or wider view of your document. Zoom in for detailed inspection or zoom out for a broader overview.

### 4. Print
Utilize the browser's printing option to create a hard copy of the document. Customize print settings as needed for optimal results.

### 5. Download
Download the document with a personalized filename. When clicking on the download button, you'll be prompted to enter the desired name, ensuring the downloaded file reflects your chosen identifier.

### 6. Text Search
Efficiently search for specific keywords within the document. The text search feature makes it easy to locate and navigate to relevant content.

### 7. Upload Local Files
Users can seamlessly upload documents from their local directory. This feature enables you to view and interact with your own files directly within the Document Viewer.

### 8. Drag and Drop
Easily upload documents by dragging and dropping them onto the application. This intuitive feature enhances the user experience by providing a simple and convenient way to add files.


# Live Demo
Check out the live demo of the Document Viewer at https://document-viewer-adarsh.netlify.app/.


# Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
  ```bash
   git clone https://github.com/adarshsahu2803/doc-viewer.git
```

2. Navigate to the project directory:
  ```bash
   cd doc-viewer
```

3. Start the React App:
  ```bash
   npm run dev
```


# Components

## 🔍 Button

Customized button for uniformity in the code base


## Props

### children (ReactNode, required)
Responsible for displaying any thing inside the Button Tag

#### onClick (Callback, optional)
Icon to be displayed next to the current selected breadcrumb item.
Example: "icon-park:right"


##### Props example:

bash
<Button onClick={...}> Select </Button>



## 📌 DragAndDrop
Customized Component for Drag and Drop input.


## Props

### onDrop (Callback)
When user drops a file.

### onChange (Callback,)
Called when user select a file

- More events can be created for future development.

## 📌 PDFRendered
Responsible for displaying/rendering the PDF


