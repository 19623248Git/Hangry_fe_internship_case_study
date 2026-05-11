// Data Import
import { parsedExpensesList } from "./data/parsed_expenses"

// Type Import
import type { Expense } from "./data/types/expense";

// React Component Import
import ExpenseList from './components/expense_list';
import BannerSummary from "./components/banner_summary";

// React Library Import
import { useState } from "react";


function App() {

        const [expenses, setExpenses] = useState<Expense[]>(parsedExpensesList);

        // Add a handler that updates the state when called
        const handleAddNewExpense = (newExp: Expense) => {
                setExpenses([newExp,...expenses])
        };

        return (
                <>
                        <BannerSummary expensesList={expenses}/>
                        <ExpenseList expensesList={expenses}/>
                </>
        )
}

export default App
