import { makeRequest } from "../axios";

export const uploadBulk = async (data) => {
  const { response } = await makeRequest.post("/upload-bulk", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
    },
  });

  return response;
};

export const fetchBulk = async () => {
  const { data } = await makeRequest.get("/get-submissions", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
    },
  });
  return data;
};

export const fetchBulkUser = async () => {
  const { data } = await makeRequest.get("/get-submission-school", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
    },
  });
  return data;
};

export const updateBulkStatus = async (data) => {
  const { data: response } = await makeRequest.put(
    "/update-bulk-status",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
      },
    }
  );

  return response;
};

export const updateStudentStatus = async (data) => {
  const { data: response } = await makeRequest.put(
    "/update-student-status",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
      },
    }
  );
  return response;
};
