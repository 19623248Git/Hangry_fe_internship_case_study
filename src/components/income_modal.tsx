// components/IncomeModal.tsx
import { useState } from 'react';
import type { SubmitEvent } from 'react';

interface IncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newIncome: number) => void;
  currentIncome: number;
}

export default function IncomeModal({ isOpen, onClose, onSave, currentIncome }: IncomeModalProps) {
        
        const [inputValue, setInputValue] = useState(currentIncome.toString());

        if (!isOpen) return null;

        const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
                e.preventDefault();
                onSave(Number(inputValue));
                onClose();
        };

        return (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                                <h2 className="text-lg font-bold mb-4">
                                        Set Monthly Income
                                </h2>
                                
                                <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Amount (IDR)
                                                </label>
                                                <input 
                                                        type="number" 
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                />
                                        </div>

                                        <div className="flex justify-end gap-2">
                                                <button 
                                                        type="button" 
                                                        onClick={onClose}
                                                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                                                >
                                                        Cancel
                                                </button>
                                                <button 
                                                        type="submit"
                                                        className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md"
                                                >
                                                        Save
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
        );
}