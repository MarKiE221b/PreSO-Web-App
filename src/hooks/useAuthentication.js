import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authLogin, authVerifyToken } from "../api/authentication";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return authLogin(data);
    },

    onSuccess: (responseData) => {
      localStorage.setItem("ACCESSTOKEN", responseData.ACCESSTOKEN);
      localStorage.setItem("ROLE", responseData.role);
    },
  });
};

export const useVerifyToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return authVerifyToken(data);
    },

    onSuccess: (responseData) => {
      localStorage.setItem("_id", responseData.payload._id);
    },
  });
};
