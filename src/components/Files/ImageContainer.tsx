import { Trash, X } from "lucide-react";
import React, { useState } from "react";
import Confirmation from "../ui/Confirmation";
import { useFileActions } from "@/hooks/useFileActions";

interface ImageContainerProps {
  url: string;
  name: string;
  id: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ url, name, id }) => {
  const { trash } = useFileActions();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <div
        key={id}
        className="w-40 h-40 overflow-hidden bg-white rounded-xl flex flex-col items-center relative justify-between group p-1"
      >
        <img
          src={url}
          alt={name}
          onClick={() => setIsPreviewOpen(true)}
          className="w-full h-32 object-cover rounded-md cursor-pointer"
        />

        <Confirmation
          title="Delete"
          trigger={
            <Trash className="cursor-pointer absolute top-2 right-2 rounded-full p-2 w-9 h-9 transform transition-all delay-75 duration-100 ease-in-out bg-white hidden group-hover:block" />
          }
          description="Are you sure you want to delete this file?"
          btnText="Delete"
          onClick={() => trash(id)}
        />
        <span className="text-sm w-full truncate text-center">{name}</span>
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative bg-white p-2 rounded-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
          >
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={url}
              alt={name}
              className="max-h-[80vh] w-full object-contain rounded-md"
            />
            <div className="text-center mt-2 text-sm text-gray-700">{name}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageContainer;
