import { makeRequest } from "../axios";

export const fetchDasboardAdminCount = async () => {
  const { data } = await makeRequest.get("/get-dashboard-admin-count", {
    headers: { Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}` },
  });

  return data;
};

export const fetchDasboardSchoolCount = async () => {
  const { data } = await makeRequest.get("/get-dashboard-school-count", {
    headers: { Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}` },
  });

  return data;
};
