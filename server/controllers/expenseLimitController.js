import expenseLimit from "../models/expenseLimit.js";

export const setExpenseLimit = async (req, res) => {
  try {
    const { maxAmount } = req.body;
    if (!maxAmount)
      return res
        .status(400)
        .json({ success: false, error: "Value is required" });
    if (!Number.isInteger(maxAmount))
      return res.status(400).json({ success: false, error: "Wrong format" });
    const limit = await expenseLimit.findOneAndUpdate(
      {},
      { maxAmount },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, amount: limit });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
