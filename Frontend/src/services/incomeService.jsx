import api from "./Api";

// create new Income
export const CreateIncome = async (data) =>
  await api.post("/v2/financial/addincome", data);

// get all Income
export const GetIncomes = async () => await api.get("/v2/financial/viewincome");

// get single Income by id
export const GetIncome = async (id) =>
  await api.get(`/v2/financial/income/${id}`);

// delete Income by id
export const DeleteIncome = async (id) =>
  await api.delete(`/v2/financial/income/${id}`);

//update Income by id
export const UpdateIncome = async (id, data) =>
  await api.patch(`/v2/financial/income/${id}`, data);

// get event for spacific user
export const GetEventsForUser = async () =>
  await api.get("/v2/financial/getuserandIncome");

// event payment by id
export const paymemtEvent = async (id, data) =>
  await api.put(`/v2/financial/income/${id}/resident/payment`, data);
