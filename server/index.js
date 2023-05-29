import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig.js";
import expenseRouter from "./routes/expenseRouter.js";
import expenseLimitRouter from "./routes/expenseLimitRouter.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
connectDB();
app.use(express.json());
app.use(cors());
app.use("/api", expenseRouter);
app.use(expenseLimitRouter);
app.listen(port, () => {
  console.log(`Server is connected at ${port}`);
});
