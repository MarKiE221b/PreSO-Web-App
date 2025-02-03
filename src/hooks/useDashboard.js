import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDasboardAdminCount,
  fetchDasboardSchoolCount,
} from "../api/dashboard";

export const useDashboardAdminCount = () => {
  return useQuery({
    queryKey: ["dashboard-admin-count"],
    queryFn: fetchDasboardAdminCount,
  });
};

export const useDashboardSchoolCount = () => {
  return useQuery({
    queryKey: ["dashboard-school-count"],
    queryFn: fetchDasboardSchoolCount,
  });
};
