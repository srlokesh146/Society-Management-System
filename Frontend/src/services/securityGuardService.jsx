import api from "./Api";

// create new SecurityGuard
export const CreateSecurityGuard = async (data) => {
  const response = await api.post("/v2/security/addsecurity", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// get all SecurityGuard
export const GetSecurityGuards = async () =>
  await api.get("/v2/security/viewguard");

// get single SecurityGuard by id
export const GetSecurityGuard = async (id) =>
  await api.get(`/v2/security/guard/${id}`);

// delete SecurityGuard by id
export const DeleteSecurityGuard = async (id) =>
  await api.delete(`/v2/security/guard/${id}`);

//update SecurityGuard by id
export const UpdateSecurityGuard = async (id, data) => {
  const response = await api.patch(`/v2/security/guard/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};