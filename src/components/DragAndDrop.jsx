import { useRef, useState } from "react";
import Button from "./Button";

// eslint-disable-next-line react/prop-types
const DragAndDrop = ({ onChange, onDrop }) => {
  const inputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      className="border border-dashed rounded-lg border-gray-700 p-10 w-[400px] h-[200px] flex items-center justify-center"
      onDragEnter={() => setIsDragging(true)}
      onDrop={onDrop}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={handleDragOver}
    >
      {!isDragging && (
        <div className="flex flex-col items-center justify-center gap-2.5">
          <h1 className="text-[20px] font-[inter] text-blue-400">
            Drag and Drop Files to Upload
          </h1>
          <h1 className="text-sm font-[inter]">Or</h1>
          <input
            type="file"
            multiple
            onChange={onChange}
            hidden
            accept=".pdf"
            ref={inputRef}
          />
          <Button
            onClick={() => inputRef.current.click()}
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white bg-blue-500 shadow-sm hover:bg-blue-900"
          >
            Select Files
          </Button>
        </div>
      )}
      {isDragging && <div> Drop Your items here </div>}
    </div>
  );
};

export default DragAndDrop;
