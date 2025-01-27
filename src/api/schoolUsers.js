import { makeRequest } from "../axios";

export const fetchSchoolUsers = async () => {
  const { data } = await makeRequest.get("/get-school-users");
  return data;
};

export const fetchSchoolList = async () => {
  const { data } = await makeRequest.get("/get-school-lists");
  return data;
};

export const addSchoolUser = async (data) => {
  const { response } = await makeRequest.post("/create-school-user", data);
  return response;
};
