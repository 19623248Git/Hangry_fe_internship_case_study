import type { SubmitEvent, KeyboardEvent } from "react";
import { 
        BANK_ACCOUNTS, 
        EXPENSE_CATEGORIES, 
        type Expense, 
        type BankAccount, 
        type ExpenseCategory 
} from '../data/types/expense';
import ShortcutKey from "./shortcut_key_guide";
import { useState } from "react";

interface InputExpenseProps {
        onAddExpense: (newExpense: Expense) => void;
}

export default function InputExpense({ onAddExpense }: InputExpenseProps) {
        
        const [date, setDate] = useState<string>('');
        const [account, setAccount] = useState<BankAccount>(BANK_ACCOUNTS[0]);
        const [category, setCategory] = useState<ExpenseCategory>(EXPENSE_CATEGORIES[0]);
        const [note, setNote] = useState<string>('');
        const [amount, setAmount] = useState<string>('');
        
        // logic for the black outline at the bottom
        const [activeField, setActiveField] = useState<string>('date');

        // Helper func for date, returns YYYY-MM-DD
        const getFormattedDate = (dateObj: Date) => {
                const offset = dateObj.getTimezoneOffset();
                const localDate = new Date(dateObj.getTime() - (offset * 60 * 1000));
                return localDate.toISOString().split('T')[0];
        };

        const fieldOrder = ['date', 'account', 'category', 'note', 'amount'];
        
        const handleFormKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
                if ((e.metaKey || e.ctrlKey) && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                        e.preventDefault();

                        const currentIndex = fieldOrder.indexOf(activeField);
                        let nextIndex = currentIndex;

                        if (e.key === 'ArrowLeft') {
                                nextIndex = currentIndex > 0 ? currentIndex - 1 : fieldOrder.length - 1;
                        } else if (e.key === 'ArrowRight') {
                                nextIndex = currentIndex < fieldOrder.length - 1 ? currentIndex + 1 : 0;
                        }

                        const nextField = fieldOrder[nextIndex];
                        
                        document.getElementById(`input-${nextField}`)?.focus();
                }
        };

        // Handle keyboard interaction for date
        const handleDateKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
                const key = e.key.toLowerCase();
                if (key === 't') {
                        e.preventDefault();
                        setDate(getFormattedDate(new Date()));
                } 
                else if (key === 'y') {
                        e.preventDefault();
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        setDate(getFormattedDate(yesterday));
                }
        };
        
        const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
                e.preventDefault();
                if (!date || !amount) return;

                const newExpense: Expense = {
                        Date: new Date(date),
                        Account: account,
                        Category: category,
                        Note: note,
                        Amount: Number(amount)
                };

                onAddExpense(newExpense);

                setDate('');
                setNote('');
                setAmount('');
                setActiveField('date');
                
                document.getElementById('date-input')?.focus();
        };

        return (
                <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200">
                
                        {/* shortcut display */}
                        <div className="flex items-center px-4 py-2 bg-gray-50/50 border-b border-gray-200 text-xs text-gray-400 font-medium overflow-x-auto whitespace-nowrap">
                                <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-full mr-3">
                                        Expense
                                </span>
                                <span className="border-r border-gray-300 pr-3 mr-3">
                                        <ShortcutKey>Tab</ShortcutKey> Next
                                        <ShortcutKey>Enter</ShortcutKey> Submit
                                </span>
                                <span className="border-r border-gray-300 pr-3 mr-3">
                                        <ShortcutKey>ctrl ←</ShortcutKey> Back
                                        <ShortcutKey>ctrl →</ShortcutKey> Fwd
                                </span>
                                <span>
                                        <ShortcutKey>T</ShortcutKey> Today
                                        <ShortcutKey>Y</ShortcutKey> Yesterday
                                </span>
                        </div>
                        
                        {/* the actual form */}
                        <form 
                                onSubmit={handleSubmit} 
                                onKeyDown={handleFormKeyDown} 
                                className="flex flex-col md:flex-row text-sm w-full"
                        >
                                
                                <label className={`p-3 border-r border-gray-200 transition-colors ${activeField === 'date' ? 'border-b-2 border-b-black' : 'border-b-2 border-b-transparent'}`}>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                Date
                                        </span>
                                        <input 
                                                id="input-date"
                                                type="date" 
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                onFocus={() => setActiveField('date')}
                                                onKeyDown={handleDateKeyDown}
                                                required
                                                className="w-full outline-none bg-transparent text-gray-800 font-medium placeholder-gray-300"
                                        />
                                </label>

                                <label className={`p-3 border-r border-gray-200 transition-colors ${activeField === 'account' ? 'border-b-2 border-b-black' : 'border-b-2 border-b-transparent'}`}>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                Account
                                        </span>
                                        <select
                                                id="input-account"
                                                value={account}
                                                onChange={(e) => setAccount(e.target.value as BankAccount)}
                                                onFocus={() => setActiveField('account')}
                                                className="w-full outline-none bg-transparent text-gray-800 font-medium cursor-pointer"
                                        >
                                                {BANK_ACCOUNTS.map(acc => (
                                                        <option key={acc} value={acc}>{acc}</option>
                                                ))}
                                        </select>
                                </label>

                                <label className={`p-3 border-r border-gray-200 transition-colors ${activeField === 'category' ? 'border-b-2 border-b-black' : 'border-b-2 border-b-transparent'}`}>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                Category
                                        </span>
                                        <select 
                                                id="input-category"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                                                onFocus={() => setActiveField('category')}
                                                className="w-full outline-none bg-transparent text-gray-800 font-medium cursor-pointer"
                                        >
                                                {EXPENSE_CATEGORIES.map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                        </select>
                                </label>

                                <label className={`p-3 border-r border-gray-200 transition-colors ${activeField === 'note' ? 'border-b-2 border-b-black' : 'border-b-2 border-b-transparent'}`}>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                Note
                                        </span>
                                        <input 
                                                id="input-note"
                                                type="text" 
                                                placeholder="-" 
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                onFocus={() => setActiveField('note')}
                                                className="w-full outline-none bg-transparent text-gray-800 font-medium placeholder-gray-400"
                                        />
                                </label>

                                <label className={`flex-1 p-3 transition-colors border-b-2 ${activeField === 'amount' ? 'border-b-black' : 'border-b-transparent'}`}>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                Amount
                                        </span>
                                        <input 
                                                id="input-amount"
                                                type="number" 
                                                placeholder="-" 
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                onFocus={() => setActiveField('amount')}
                                                required
                                                min="0"
                                                className="w-full outline-none bg-transparent text-gray-800 font-medium placeholder-gray-400"
                                        />
                                </label>

                                {/* hidden submit button to press enter for submit */}
                                <button type="submit" className="hidden">Submit</button>

                        </form>
                </div>
        );
}