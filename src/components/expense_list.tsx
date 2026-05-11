import type { Expense } from "../data/types/expense";
import ExpenseListItem from "./expense_list_item";
import { useState } from "react";

interface expensesListProp {
        expensesList: Expense[];
}

const CAT_FILTERS = [
        'Date',
        'Category',
        'Account'
]

type catfilterType = typeof CAT_FILTERS[number];

export default function ExpenseList({ expensesList }: expensesListProp){
        
        const [catfilter, setCatfilter] = useState<catfilterType>('Date');
        const [searchQuery, setSearchQuery] = useState<string>('');

        // Helper function to figure out date category 
        // Today, Yesterday, or Older
        const getDateLabel = (expenseDate: Date) => {
                const today = new Date();
                const target = new Date(expenseDate);
                
                today.setHours(0, 0, 0, 0);
                target.setHours(0, 0, 0, 0);

                const diffTime = today.getTime() - target.getTime();
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 0) return "TODAY";
                if (diffDays === 1) return "YESTERDAY";
                return "FEW DAYS AGO"; 
        };

        // to return a filtered list from the search bar
        const filteredExpenses = expensesList.filter((expense) => {
                const searchLower = searchQuery.toLowerCase();
                return (
                        expense.Note.toLowerCase().includes(searchLower) ||
                        expense.Category.toLowerCase().includes(searchLower) ||
                        expense.Account.toLowerCase().includes(searchLower)
                );
        });

        // group by catfilter
        const groupedExpenses = filteredExpenses.reduce((groups, expense) => {
                let groupKey = '';

                if (catfilter === 'Date') {
                        groupKey = getDateLabel(expense.Date);
                } 
                else if (catfilter === 'Category') {
                        groupKey = expense.Category.toUpperCase();
                } 
                else if (catfilter === 'Account') {
                        groupKey = expense.Account.toUpperCase();
                }

                // If group doesn't exist yet, create empty array
                if (!groups[groupKey]) {
                        groups[groupKey] = [];
                }
                
                groups[groupKey].push(expense);
                return groups;

        }, {} as Record<string, Expense[]>);

        return(
                <div className="w-full max-w-3xl mx-auto">

                        {/* filterbar or smth idk */}
                        <div className="flex items-center justify-between bg-gray-50/80 p-3 border border-gray-100 mb-6">
        
                                <div className="flex space-x-1">
                                {CAT_FILTERS.map((filter) => (
                                        <button
                                                key={filter}
                                                onClick={() => setCatfilter(filter as any)}
                                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                                                        catfilter === filter 
                                                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                                                        : 'text-gray-500 hover:bg-gray-200/50'
                                                }`}
                                        >
                                        By {filter}
                                        </button>
                                ))}
                                </div>
                                <div className="relative">
                                <svg 
                                        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input 
                                        type="text" 
                                        placeholder="Search transaction" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 pr-4 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 w-64 bg-white"
                                />
                                </div>
                        </div>

                        {/* The actual list */}
                        <div className="w-full max-w-3xl mx-auto">
                                {Object.entries(groupedExpenses).map(([groupName, expensesInGroup]) => (
                                        <div key={groupName} className="mb-6">
                                                <div className="mb-3 px-2">
                                                        <h3 className="text-xs font-bold text-gray-400 tracking-wider">
                                                                {groupName}
                                                        </h3>
                                                </div>

                                                <div className="flex flex-col gap-3">
                                                        {expensesInGroup.map((expense, index) => (
                                                                <ExpenseListItem key={index} expense={expense} />
                                                        ))}
                                                </div>
                                        </div>
                                ))}
                                
                                {/* No list found UI */}
                                {Object.keys(groupedExpenses).length === 0 && (
                                        <div className="text-center py-12 text-gray-400 text-sm font-medium">
                                        No transactions match your search.
                                        </div>
                                )}
                        </div>
                        
                </div>
        )
}