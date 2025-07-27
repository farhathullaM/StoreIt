import { useFileActions } from "@/hooks/useFileActions";
import { CircleX, FileUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SingleImageUpload = () => {
  const { upload, uploaded, uploading } = useFileActions();
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

  const onUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error("No file selected");
      return;
    }

    upload(file);
  };

  useEffect(() => {
    if (uploaded) {
      removeImage();
    }
  }, [uploaded]);

  return (
    <form
      onSubmit={onUpload}
      className="flex items-center justify-center gap-4 flex-col"
    >
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

      <input
        type="submit"
        disabled={uploading}
        value={uploading ? "Uploading..." : "Upload"}
        className="text-white w-40 text-center my-5 max-sm:my-2 bg-[#507ad5] py-2 px-6 rounded-md text-sm cursor-pointer select-none"
      />
    </form>
  );
};

export default SingleImageUpload;
