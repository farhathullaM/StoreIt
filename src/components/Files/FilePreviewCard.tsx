import { Trash, X, Eye } from "lucide-react";
import React, { useState } from "react";
import Confirmation from "../ui/Confirmation";
import { useFileActions } from "@/hooks/useFileActions";

interface FilePreviewCardProps {
  url: string;
  name: string;
  id: string;
}

const FilePreviewCard: React.FC<FilePreviewCardProps> = ({ url, name, id }) => {
  const { trash } = useFileActions();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const getFileType = (name: string) => {
    const extension = name.split(".").pop()?.toLowerCase();
    if (!extension) return "other";

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension))
      return "image";
    if (["mp4", "webm", "ogg"].includes(extension)) return "video";
    if (
      [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "zip",
        "rar",
        "txt",
      ].includes(extension)
    )
      return "document";

    return "other";
  };

  const fileType = getFileType(name);

  const renderPreview = () => {
    if (fileType === "image") {
      return (
        <img
          src={url}
          alt={name}
          onClick={() => setIsPreviewOpen(true)}
          className="w-full h-32 object-cover rounded-md cursor-pointer"
        />
      );
    }
    if (fileType === "video") {
      return (
        <video
          src={url}
          controls
          onClick={() => setIsPreviewOpen(true)}
          className="w-full h-32 object-cover rounded-md cursor-pointer"
        />
      );
    }
    return (
      <div
        onClick={() => window.open(url, "_blank")}
        className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-md cursor-pointer text-sm text-gray-600 text-center px-2"
      >
        {name}
      </div>
    );
  };

  return (
    <>
      <div
        key={id}
        className="w-40 h-44 overflow-hidden bg-white rounded-xl flex flex-col items-center relative justify-between group p-1 border shadow-sm group"
      >
        {renderPreview()}

        <div className="absolute top-2 right-2 hidden group-hover:flex  gap-1">
          <a
            href={url}
            download={name}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full p-1 flex items-center justify-center hover:bg-gray-100"
          >
            <Eye className="w-5 h-5  text-gray-700" />
          </a>
          <Confirmation
            title="Delete"
            trigger={
              <Trash className="cursor-pointer rounded-full p-2 w-8 h-8 bg-white hover:bg-gray-100" />
            }
            description="Are you sure you want to delete this file?"
            btnText="Delete"
            onClick={() => trash(id)}
          />
        </div>

        <span className="text-xs w-full truncate text-center mt-1">{name}</span>
      </div>

      {isPreviewOpen && (fileType === "image" || fileType === "video") && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative bg-white p-2 rounded-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {fileType === "image" ? (
              <img
                src={url}
                alt={name}
                className="max-h-[80vh] w-full object-contain rounded-md"
              />
            ) : (
              <video
                src={url}
                controls
                className="max-h-[80vh] w-full object-contain rounded-md"
              />
            )}
            <div className="text-center mt-2 text-sm text-gray-700">{name}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilePreviewCard;
