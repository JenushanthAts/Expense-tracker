import { Router } from "express";
import { setExpenseLimit } from "../controllers/expenseLimitController.js";
const expenseLimitRouter = Router();

expenseLimitRouter.post("/api/expenseLimit", setExpenseLimit); //http://localhost:5001/api/expenseLimit;
export default expenseLimitRouter;
