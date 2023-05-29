import mongoose from "mongoose";
import { isDateInCurrentMonth, isValidDate } from "../helper/helper.js";
import Expense from "../models/expense.js";
import ExpenseLimit from "../models/expenseLimit.js";

export const calculateTotalExpenses = async (req, res, next) => {
  try {
    const { description, date, type, amount, _id } = req.body;
    if (req.params.id) {
      const isExistingExpense = await Expense.findById(req.params.id);
      if (!isExistingExpense) {
        return res.status(404).json({
          success: false,
          message: "Expense not found",
        });
      }
    }
    //check whether they are empty or not
    if (!description || !date || !type || !amount)
      return res
        .status(400)
        .json({ success: false, error: "All fields are mandotory" });
    //format cheking for date and amount
    if (!Number.isInteger(amount) || !isValidDate(date.substring(0, 10)))
      return res
        .status(400)
        .json({ success: false, error: "Wrong formats provided" });
    //check whether the date is in current month
    const targetDate = new Date(date.substring(0, 10));
    const isInCurrentMonth = isDateInCurrentMonth(targetDate);
    if (!isInCurrentMonth)
      return res.status(400).json({
        success: false,
        error: "The date is not in the current month",
      });
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const expenses = await Expense.aggregate([
      {
        $match: {
          date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalExpense = expenses.length ? expenses[0].totalAmount : 0;
    const expenseLimit = await ExpenseLimit.findOne();
    const maxAmount = expenseLimit.maxAmount;
    const finalTotalExpense = _id ? totalExpense : totalExpense + amount;
    if (finalTotalExpense > maxAmount) {
      return res.status(400).json({
        success: false,
        error: "Sorry!, You can not add",
      });
    }
    if (finalTotalExpense >= maxAmount * 0.9) {
      req.alert = "Total expenses reached 90% of the maximum limit!";
    }
    req.totalExpense = totalExpense + amount;
    req.remainingAmount = maxAmount - (totalExpense + amount);
    next();
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid expense ID" });
    }
    return res
      .status(500)
      .json({ succes: false, error: "Internal server error" });
  }
};
