import { useState, type DragEvent, type ChangeEvent } from "react";
import { CircleX, FileUp } from "lucide-react";
import { toast } from "react-toastify";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILES = 5;

const MultiImageUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;

    const newFiles: File[] = [];

    Array.from(incomingFiles).forEach((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB size limit`);
        return;
      }

      newFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setFiles((prev) => [...prev, ...newFiles].slice(0, MAX_FILES));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const onUpload = () => {
    if (!files.length) return toast.error("No files selected");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // Send to backend here (axios or fetch)
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <input
        type="file"
        id="multi-image-upload"
        hidden
        multiple
        accept="image/*"
        onChange={onInputChange}
      />

      <label
        htmlFor="multi-image-upload"
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="flex flex-col items-center justify-center w-60 h-32 border-2 border-dashed border-[#637cd0] rounded-md cursor-pointer bg-[#f0f4ff] hover:bg-[#e4ebff] transition"
      >
        <FileUp className="text-[#637cd0]" />
        <p className="text-sm text-[#637cd0] mt-2">
          Drag & Drop or Click to Upload
        </p>
      </label>

      <div className="flex flex-wrap gap-3">
        {previews.map((src, i) => (
          <div key={i} className="relative w-24 h-24">
            <img
              src={src}
              alt={`preview-${i}`}
              className="w-full h-full object-cover rounded"
            />
            <CircleX
              onClick={() => removeImage(i)}
              className="absolute -top-1 -right-1 text-red-500 cursor-pointer"
              fill="#fff"
            />
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <button
          className="bg-[#507ad5] text-white py-2 px-6 rounded-md text-sm mt-4"
          onClick={onUpload}
        >
          Upload {files.length} File{files.length > 1 ? "s" : ""}
        </button>
      )}
    </div>
  );
};

export default MultiImageUpload;
