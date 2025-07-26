import React, {
  useState,
  useRef,
  type DragEvent,
  type ChangeEvent,
} from "react";

interface DragDropUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const DragDropUpload: React.FC<DragDropUploadProps> = ({ onFilesSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFilesSelected(Array.from(files));
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={openFileDialog}
      className={`border-2 border-dashed rounded-md p-10 text-center cursor-pointer transition-colors ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
      <p className="text-gray-600">Drag & drop files here or click to upload</p>
    </div>
  );
};

export default DragDropUpload;
