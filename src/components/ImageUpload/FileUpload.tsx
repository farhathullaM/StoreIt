import { useFileActions } from "@/hooks/useFileActions";
import { CircleX, FileUp, FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FileUpload = () => {
  const { upload, uploaded, uploading } = useFileActions();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setFile(selectedFile);
    setFileType(selectedFile.type);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setFileType(null);
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
      removeFile();
    }
  }, [uploaded]);

  return (
    <form
      onSubmit={onUpload}
      className="flex items-center justify-center gap-4 flex-col"
    >
      <input
        type="file"
        id="fileupload"
        hidden
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        onChange={handleUpload}
      />

      {file ? (
        <div className="relative w-40 h-40 flex items-center justify-center border rounded-lg bg-gray-100">
          {fileType?.startsWith("image/") && preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <FileText className="w-10 h-10 text-[#637cd0]" />
              <p className="text-sm mt-2 text-gray-700 line-clamp-2 px-1">
                {file.name}
              </p>
            </div>
          )}

          <CircleX
            onClick={removeFile}
            className="cursor-pointer absolute -top-1 -right-1 text-[#df3b3b]"
            fill="#fff"
          />
        </div>
      ) : (
        <label
          htmlFor="fileupload"
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

export default FileUpload;
