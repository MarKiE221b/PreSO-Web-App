import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  uploadBulk,
  fetchBulk,
  updateBulkStatus,
  updateStudentStatus,
} from "../api/submission";

export const useUploadBulk = (setFormData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return uploadBulk(data);
    },

    onSuccess: () => {
      setFormData({
        school_id: "6796e5e390762393165e4c48",
        course: "",
        excelFile: null,
      });

      queryClient.invalidateQueries({ queryKey: ["bulk"] });
    },
  });
};

export const useFetchBulk = () => {
  return useQuery({ queryKey: ["bulk"], queryFn: fetchBulk });
};

export const useUpdateBulkStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return updateBulkStatus(data);
    },

    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["bulk"] });
    },
  });
};

export const useUpdateStudentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return updateStudentStatus(data);
    },

    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["bulk"] });
    },
  });
};
