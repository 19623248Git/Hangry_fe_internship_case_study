import type { Expense } from "../data/types/expense";
import IncomeModal from "./income_modal";
import { useState } from "react";

interface BannerSummaryProps {
        expensesList: Expense[];
}

export default function BannerSummary({ expensesList }: BannerSummaryProps){

        const [income, setIncome] = useState<number>(500000);
        const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);

        // calculate the total expense from expenseslist
        const totalExpense = expensesList.reduce((sum, e) => {
                return sum + e.Amount; 
        }, 0)

        const total = income - totalExpense;

        // helper func to format to IDR
        const formatIDR = (amount: number) => {
                return new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                }).format(amount);
        };

        return (
                <>
                        <div className="w-full max-w-3xl mx-auto flex items-center bg-gray-50 border-y border-gray-200">
                                
                                <div className="flex-1 p-4 border-r border-gray-200 flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                                                Expense ↗
                                        </span>
                                        <span className="text-sm font-bold text-red-500">
                                                {formatIDR(totalExpense)}
                                        </span>
                                </div>

                                <div 
                                        onClick={() => setIsInputModalOpen(true)}
                                        className="flex-1 p-4 border-r border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                        <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                                                Income ↘
                                        </span>
                                        <span className="text-sm font-bold text-green-500">
                                                {formatIDR(income)}
                                        </span>
                                </div>

                                <div className="flex-1 p-4 flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                                                Total
                                        </span>
                                        <span className={`text-sm font-bold ${total >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {formatIDR(total)}
                                        </span>
                                </div>
                        </div>

                        <IncomeModal 
                                isOpen={isInputModalOpen}
                                currentIncome={income}
                                onClose={() => setIsInputModalOpen(false)}
                                onSave={(newIncome) => setIncome(newIncome)}
                        />
                </>
        )

}