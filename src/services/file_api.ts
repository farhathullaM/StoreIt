import apiClient from "@/lib/apiClient";

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchFiles = async () => {
  try {
    const response = await apiClient.get("/files");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteFile = async (fileId: string) => {
  try {
    const response = await apiClient.delete(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { uploadFile, fetchFiles, deleteFile };
