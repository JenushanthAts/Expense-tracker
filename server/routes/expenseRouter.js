import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  fetchAllExpenses,
  fetchSingleExpense,
  statistics,
  totalExpensesAndRemaining,
  updateExpense,
} from "../controllers/expenseController.js";
import { calculateTotalExpenses } from "../middlewares/totalExpenses.js";
const expenseRouter = Router();
expenseRouter.post("/expenses", calculateTotalExpenses, addExpense); //http://localhost:5001/api/expenses;
expenseRouter.delete("/expenses/:id", deleteExpense); //http://localhost:5001/api/expenses;
expenseRouter.get("/expenses", fetchAllExpenses);
expenseRouter.get("/expenses", fetchAllExpenses);
expenseRouter.get("/expenses/:id", fetchSingleExpense);
expenseRouter.put("/expenses/:id", calculateTotalExpenses, updateExpense);
expenseRouter.get("/expensesCalculation", totalExpensesAndRemaining);
expenseRouter.get("/statistics", statistics);

export default expenseRouter;
