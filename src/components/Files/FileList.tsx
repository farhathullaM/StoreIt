import { fetchFiles } from "@/services/file_api";
import { useQuery } from "@tanstack/react-query";

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
        <div
          key={file._id}
          className="w-40 h-40 overflow-hidden rouned-md bg-white rounded-xl"
        >
          <img
            src={file.url}
            alt={file.originalName}
            className="w-full h-full object-cover rounded-lg "
          />
          <span className="text-sm w-32 truncate overflow-hidden self-end">
            {file.originalName}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FileList;
