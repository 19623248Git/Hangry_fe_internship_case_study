export const EXPENSE_CATEGORIES = [
        "Food & Beverage",
        "Transportation",
        "Utilities",
        "Groceries",
        "Entertainment",
        "Confidential"
]

export const BANK_ACCOUNTS = [
        "BCA",
        "Bank Mandiri",
        "Bank Jago",
        "BNI",
        "BRI",
        "CIMB",
        "OCBC"
]

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
export type BankAccount = typeof BANK_ACCOUNTS[number];

export interface Expense {
        Date: Date;
        Account: BankAccount;
        Category: ExpenseCategory;
        Note: string;
        Amount: number;
}