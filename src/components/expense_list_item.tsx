import type { Expense } from '../data/types/expense';

interface ExpenseListItemProps {
        expense: Expense
}

export default function ExpenseListItem({ expense }: ExpenseListItemProps) {
        
        // format to IDR
        const formattedAmount = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
        }).format(expense.Amount);

        return (
                <div className="flex items-center justify-between p-4 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                
                        <div className="flex items-center gap-4">
                                
                                {/* Green Arrow Icon */}
                                <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-full text-green-500 shrink-0">
                                        <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                strokeWidth={2} 
                                                stroke="currentColor" 
                                                className="w-5 h-5"
                                        >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5l-15-15m15 15V8.25m0 11.25H8.25" />
                                        </svg>
                                </div>

                                {/* Some Text Details */}
                                <div className="flex flex-col">

                                        <div className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                                                <span className="text-blue-500">{expense.Account}</span>
                                                <span>/</span>
                                                <span>{expense.Category}</span>
                                        </div>
                                        
                                        <div className="text-sm font-semibold text-gray-800">
                                                {expense.Note}
                                        </div>
                                </div>
                        </div>

                        {/* Amount */}
                        <div className="text-sm font-bold text-gray-800">
                                {formattedAmount}
                        </div>
                
                </div>
        );
}