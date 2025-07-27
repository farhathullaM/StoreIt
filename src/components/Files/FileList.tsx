import { fetchFiles } from "@/services/file_api";
import { useQuery } from "@tanstack/react-query";
import FilePreviewCard from "./FilePreviewCard";

const FileList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["files"],
    queryFn: () => fetchFiles(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex flex-wrap gap-2 items-center w-full justify-center">
      {data.map((file: any) => (
        <FilePreviewCard
          key={file._id}
          id={file._id}
          url={file.url}
          name={file.originalName}
        />
      ))}
    </div>
  );
};

export default FileList;
