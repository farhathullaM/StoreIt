import { fetchFiles } from "@/services/file_api";
import { useQuery } from "@tanstack/react-query";
import ImageContainer from "./ImageContainer";

const FileList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["files"],
    queryFn: () => fetchFiles(),
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex flex-wrap gap-2">
 {data.map((file: any) => (
    <ImageContainer
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
