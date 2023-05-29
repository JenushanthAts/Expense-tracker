export interface IExpense {
  _id?: string;
  type?: string;
  description?: string;
  amount?: number;
  date?: string;
}
export interface IExpenseLists {
  loading: boolean;
  expenses: IExpense[];
  error: boolean;
}
export interface IMonthlyExpenses {
  remaining: number;
  totalExpenses: number;
  monthlyBudget: number;
}

export enum ModalEnum {
  view,
  add,
  edit,
  delete,
  setBudget,
  default,
}
