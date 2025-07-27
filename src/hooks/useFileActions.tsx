import { deleteFile, uploadFile } from "@/services/file_api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useFileActions = () => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      toast.success("File Uploaded");
    },
    onError: () => {
      toast.error("Failed to Upload file");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      toast.success("File Deleted");
    },
    onError: () => {
      toast.error("Failed to delete file");
    },
  });

  return {
    upload: uploadMutation.mutate,
    uploading: uploadMutation.isPending,
    uploaded: uploadMutation.isSuccess,

    trash: deleteMutation.mutate,
    trashing: deleteMutation.isPending,
    trashed: deleteMutation.isSuccess,
  };
};
