import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDasboardAdminCount } from "../api/dashboard";

export const useDashboardAdminCount = () => {
  return useQuery({
    queryKey: ["dashboard-admin-count"],
    queryFn: fetchDasboardAdminCount,
  });
};
