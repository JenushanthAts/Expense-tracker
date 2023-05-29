import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/default-route";
import { ExpenseProvider } from "./hooks/useExpense";
import "./App.css";
function App() {
  return (
    <div>
      <ExpenseProvider>
        <RouterProvider router={router} />
      </ExpenseProvider>
    </div>
  );
}

export default App;
