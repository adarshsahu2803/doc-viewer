import { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import { fileReader } from "../utils";
import { fileTypes } from "../utils/constants";
import PDFRenderer from "./PDFRenderer";

const PDFViewer = () => {
  
  const [viewPdf, setViewPdf] = useState(null);

  const handleChange = async (e) => {
    e.preventDefault();
    let selectedFile;
    if(e.dataTransfer) selectedFile = e.dataTransfer.files[0]
    else selectedFile = e.target?.files[0]
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        const pdf = await fileReader(selectedFile);
        setViewPdf(pdf)
      } else {
        setViewPdf(null);
      }
    } else {
      alert("please select a file");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {viewPdf === null && <div>
        <DragAndDrop onDrop={handleChange} onChange={handleChange}/>
      </div>}
      <PDFRenderer fileUrl = {viewPdf} />
    </div>
  );
};

export default PDFViewer;
