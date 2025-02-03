import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  uploadBulk,
  uploadSingle,
  fetchBulk,
  updateBulkStatus,
  updateStudentStatus,
  fetchBulkUser,
} from "../api/submission";

export const useUploadBulk = (setFormData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return uploadBulk(data);
    },

    onSuccess: () => {
      setFormData({
        school_id: "",
        course: "",
        excelFile: null,
      });

      queryClient.invalidateQueries({ queryKey: ["bulk-user"] });
    },
  });
};

export const useUploadSingle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return uploadSingle(data);
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["bulk-user"] });
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

export const useFetchBulkPerUser = () => {
  return useQuery({ queryKey: ["bulk-user"], queryFn: fetchBulkUser });
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
