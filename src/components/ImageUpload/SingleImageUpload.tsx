import { uploadFile } from "@/services/file_api";
import { CircleX, FileUp } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SingleImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeImage = () => {
    setFile(null);
    setImagePreview(null);
  };

  const onUpload = () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    uploadFile(file);
  };

  return (
    <div className="flex items-center justify-center gap-4 flex-col">
      <input
        type="file"
        id="imageupload"
        hidden
        accept="image/*"
        onChange={handleUpload}
      />

      {imagePreview ? (
        <div className="relative w-40 h-40 flex items-center justify-center">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-40 h-40 rounded-lg object-cover"
          />
          <CircleX
            onClick={removeImage}
            className="cursor-pointer absolute -top-1 -right-1 text-[#df3b3b]"
            fill="#fff"
          />
        </div>
      ) : (
        <label
          htmlFor="imageupload"
          className="flex items-center gap-2 bg-[#637cd0] rounded-md cursor-pointer text-white justify-center w-fit p-4"
        >
          <FileUp />
          Upload a File
        </label>
      )}

      <div
        className="text-white w-40 text-center my-5 max-sm:my-2 bg-[#507ad5] py-2 px-6 rounded-md text-sm cursor-pointer select-none"
        onClick={onUpload}
      >
        Upload
      </div>
    </div>
  );
};

export default SingleImageUpload;
