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

// get all Maintenance
export const GetPendingMaintenances = async () =>
  await api.get("/v2/financial/getuserandMaintance");

// Update Maintenance status by id
export const UpdateMaintenanceStatus = async (id, data) =>
  await api.put(`/v2/financial/maintenance/${id}/resident/payment`, data);
