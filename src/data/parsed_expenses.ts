import type { Expense, BankAccount, ExpenseCategory } from "./types/expense";
import expensesList from './expense.json';

export const parsedExpensesList: Expense[] = expensesList.map((item) => ({
        ...item,
        Account: item.Account as BankAccount,
        Category: item.Category as ExpenseCategory,
        Date: new Date(item.Date),
        Amount: item.Amount
}));