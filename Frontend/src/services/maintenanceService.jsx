import api from "./Api";

// create new Maintenance
export const ConfirmPassword = async (data) =>
  await api.post("/v2/financial/checkpassword", data);

// create new Maintenance
export const CreateMaintenance = async (data) =>
  await api.post("/v2/financial/addmaintenance", data);

// get all Maintenance
export const GetMaintenances = async () =>
  await api.get("/v2/financial/viewmaintenance");
