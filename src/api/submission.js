import { makeRequest } from "../axios";

export const uploadBulk = async (data) => {
  const { response } = await makeRequest.post("/upload-bulk", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response;
};

export const fetchBulk = async () => {
  const { data } = await makeRequest.get("/get-submissions");
  return data;
};

export const updateBulkStatus = async (data) => {
  const { data: response } = await makeRequest.put("/update-bulk-status", data);

  return response;
};

export const updateStudentStatus = async (data) => {
  const { data: response } = await makeRequest.put(
    "/update-student-status",
    data
  );
  return response;
};
