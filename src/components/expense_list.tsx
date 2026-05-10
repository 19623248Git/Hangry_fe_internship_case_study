import type { Expense } from "../data/types/expense";
import ExpenseListItem from "./expense_list_item";

interface expensesListProp {
        expensesList: Expense[];
}

export default function ExpenseList({ expensesList }: expensesListProp){
        
        return(
                <div className="w-full max-w-3xl mx-auto">
                        {expensesList.map((singleExpense, index) => (
                                <ExpenseListItem key={index} expense={singleExpense} />
                        ))}
                </div>
        )
}