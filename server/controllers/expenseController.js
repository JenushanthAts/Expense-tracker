import mongoose from "mongoose";
import Expense from "../models/expense.js";
import ExpenseLimit from "../models/expenseLimit.js";
//add expense
export const addExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    return res.status(201).json({
      success: true,
      payload: {
        ...expense._doc,
        alert: req.alert ?? null,
        totalExpenses: req.totalExpense,
        remainingAmount: req.remainingAmount,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
//delete expense
export const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const isExistingExpense = await Expense.findById(expenseId);
    if (!isExistingExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    const expense = await Expense.findByIdAndRemove(expenseId);
    return res.status(200).json({
      success: true,
      message: "The expense successfully removed",
      payload: expense,
    });
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid expense ID" });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
};
//fetch single expense by id
export const fetchSingleExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const isExistingExpense = await Expense.findById(expenseId);
    if (!isExistingExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    const singleExpense = await Expense.findById(expenseId);
    return res.status(200).json({ success: true, payload: singleExpense });
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid expense ID" });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
};
//fetch all expenses
export const fetchAllExpenses = async (req, res) => {
  try {
    const type = req.query.type || "";
    const query = {};
    if (type !== "") {
      query.type = type;
    }
    const allExpenses = await Expense.find(query);
    return res.status(200).json({ success: true, payload: allExpenses });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
//update an expense by id
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = req.body;
    const expense = await Expense.findByIdAndUpdate(id, updatedExpense, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      payload: {
        ...expense._doc,
        alert: req.alert ?? null,
        totalExpenses: req.totalExpense,
        remainingAmount: req.remainingAmount,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
//get total expenses and remaining amount for current month
export const totalExpensesAndRemaining = async (req, res) => {
  try {
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

    const expenses = Expense.aggregate([
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

    const expenseLimit = ExpenseLimit.findOne();
    const [res1, res2] = await Promise.all([expenses, expenseLimit]);
    const totalExpense = res1.length ? res1[0].totalAmount : 0;
    const monthlyBudget = res2?.maxAmount ? res2.maxAmount : 0;
    const remainingAmount = monthlyBudget - totalExpense;

    return res.status(200).json({
      succes: true,
      remainingAmount: remainingAmount,
      totalExpenses: totalExpense,
      monthlyBudget: monthlyBudget,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ succes: false, error: "Internal server error" });
  }
};
//get monthly expenses statistics view
export const statistics = async (req, res) => {
  try {
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

    const expenses = Expense.aggregate([
      {
        $match: {
          date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
        },
      },
      {
        $group: {
          _id: {
            type: "$type",
          },
          amount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id.type",
          amount: 1,
        },
      },
    ]);

    const expenseLimit = ExpenseLimit.findOne();
    const [res1, res2] = await Promise.all([expenses, expenseLimit]);
    const monthlyBudget = res2?.maxAmount ? res2.maxAmount : 0;

    return res.status(200).json({
      success: true,
      expenses: res1,
      monthlyBudget: monthlyBudget,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
