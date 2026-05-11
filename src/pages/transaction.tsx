import { useState } from "react";
import { parsedExpensesList } from "../data/parsed_expenses";
import type { Expense } from "../data/types/expense";

import ExpenseList from '../components/expense_list';
import BannerSummary from "../components/banner_summary";
import InputExpense from '../components/input_expense';

export default function TransactionPage() {
        const [expenses, setExpenses] = useState<Expense[]>(parsedExpensesList);

        const handleAddNewExpense = (newExp: Expense) => {
                setExpenses([newExp, ...expenses]);
        };

        return (
                <div className="flex-1 flex flex-col">
                        <InputExpense onAddExpense={handleAddNewExpense} />
                        <BannerSummary expensesList={expenses} />
                        <ExpenseList expensesList={expenses} />
                </div>
        );
}