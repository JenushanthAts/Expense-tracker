import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import Expenses from "../view/expenses/Expense";
import Dashboard from "../view/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/expenses",
        element: <Expenses />,
      },
    ],
  },
]);
