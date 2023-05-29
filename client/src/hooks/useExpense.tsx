import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IExpense,
  IExpenseLists,
  IMonthlyExpenses,
  ModalEnum,
} from "../models/Expsenses";
import { expenseService } from "../services/expenseService";

interface ExpenseContextValue {
  expense: IExpense;
  expenseLists: IExpenseLists;
  setExpense: Dispatch<SetStateAction<IExpense>>;
  setExpenseLists: Dispatch<SetStateAction<IExpenseLists>>;
  fetchExpenses: () => Promise<void>;
  calculateMonthlySummary: () => Promise<void>;
  shownPage: ModalEnum;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  setShownPage: Dispatch<SetStateAction<ModalEnum>>;
  handleClose: () => void;
  calculateMaxExpenseThreshold: () => number;
  monthlySummary: IMonthlyExpenses;
}

const ExpenseContext = createContext<ExpenseContextValue>(
  {} as ExpenseContextValue
);
interface ExpenseProviderProps {
  children: ReactNode;
}

const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [type, setType] = useState("");
  const [expense, setExpense] = useState<IExpense>({} as IExpense);
  const [monthlySummary, setMonthlySummary] = useState<IMonthlyExpenses>({
    remaining: 0,
    totalExpenses: 0,
    monthlyBudget: 0,
  });
  const [expenseLists, setExpenseLists] = useState<IExpenseLists>({
    loading: false,
    error: false,
    expenses: [] as IExpense[],
  });
  const [shownPage, setShownPage] = useState<ModalEnum>(ModalEnum.default);
  const handleClose = () => {
    setShownPage(ModalEnum.default);
    setExpense({});
  };
  const fetchExpenses = async () => {
    setExpenseLists({ ...expenseLists, loading: true });
    try {
      const response = await expenseService.fetchAllExpenses(type);
      setExpenseLists({
        ...expenseLists,
        loading: false,
        expenses: response.data.payload,
      });
    } catch (error) {
      setExpenseLists({ ...expenseLists, loading: false, error: true });
      console.error("Error fetching expenses:", error);
    }
  };
  const calculateMonthlySummary = async () => {
    try {
      const response = await expenseService.getMonthlyExpenseInfo();
      if (response.status === 200) {
        setMonthlySummary({
          remaining: response.data.remainingAmount,
          totalExpenses: response.data.totalExpenses,
          monthlyBudget: response.data.monthlyBudget,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const calculateMaxExpenseThreshold = (): number => {
    let threshold = 0;

    if (monthlySummary.totalExpenses >= monthlySummary.monthlyBudget * 0.9) {
      threshold = monthlySummary.totalExpenses + monthlySummary.remaining;
    }

    return threshold;
  };
  useEffect(() => {
    calculateMonthlySummary();
    calculateMaxExpenseThreshold();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  return (
    <ExpenseContext.Provider
      value={{
        expense,
        setExpense,
        fetchExpenses,
        expenseLists,
        setExpenseLists,
        shownPage,
        setShownPage,
        handleClose,
        monthlySummary,
        calculateMonthlySummary,
        calculateMaxExpenseThreshold,
        type,
        setType,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
const useExpense = (): ExpenseContextValue => {
  return useContext(ExpenseContext);
};

export { useExpense, ExpenseProvider };
