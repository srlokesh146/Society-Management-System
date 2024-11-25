import api from "./Api";

// Total Balance
export const TotalBalance = async () =>
  api.get("/v2/financial/total-balance-done");

// Total Income
export const TotalIncome = async () =>
  api.get("/v2/financial/income/total-done");

// Total Expense
export const TotalExpense = async () => api.get("/v2/financial/");

// Total Unit
export const TotalUnit = async () => api.get("/v2/financial/");
