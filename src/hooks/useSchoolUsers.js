import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSchoolList,
  addSchoolUser,
  fetchSchoolUsers,
} from "../api/schoolUsers";

export const useSchoolList = () => {
  return useQuery({ queryKey: ["schoolList"], queryFn: fetchSchoolList });
};

export const useAddUser = (setFormData) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return addSchoolUser(data);
    },
    onSuccess: () => {
      const queryKeys = [["schoolList"], ["schoolUser"]];

      queryKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      setFormData({
        username: "",
        password: "",
        email: "",
        lastname: "",
        firstname: "",
        middlename: "",
        extension: "",
        school_UID: "",
        access: true,
      });
    },
  });
};

export const useSchoolUser = () => {
  return useQuery({ queryKey: ["schoolUser"], queryFn: fetchSchoolUsers });
};
