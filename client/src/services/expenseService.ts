import axios from "axios";
const API = process.env.REACT_APP_URL;
const fetchAllExpenses = (type: string) => {
  return axios.get(`${API}/expenses?type=${type}`);
};
const addNewExpense = (newData: any) => {
  return axios.post(`${API}/expenses`, newData);
};
const removeExpense = (expId: string) => {
  return axios.delete(`${API}/expenses/${expId}`);
};
const updateExpense = (expId: string, newData: any) => {
  return axios.put(`${API}/expenses/${expId}`, newData);
};
const getMonthlyExpenseInfo = () => {
  return axios.get(`${API}/expensesCalculation`);
};
const setMonthlyBudget = (maxAmount: any) => {
  return axios.post(`${API}/expenseLimit`, maxAmount);
};
const getMonthlyReport = () => {
  return axios.get(`${API}/statistics`);
};
export const expenseService = {
  fetchAllExpenses,
  addNewExpense,
  updateExpense,
  removeExpense,
  getMonthlyExpenseInfo,
  setMonthlyBudget,
  getMonthlyReport,
};
