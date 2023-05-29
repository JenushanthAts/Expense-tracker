import { model, Schema } from "mongoose";

const expenseLimitSchema = new Schema({
  maxAmount: {
    type: Number,
    required: true,
  },
});

export default model("ExpenseLimit", expenseLimitSchema);
