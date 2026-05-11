import { NavLink } from 'react-router-dom';

export default function Navbar() {
        
        // helper func to style selected tab
        const navLinkStyle = ({ isActive }: { isActive: boolean }) => 
        `px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap ${
        isActive 
                ? 'bg-white text-gray-900 font-bold shadow-sm border border-gray-100' 
                : 'text-gray-500 font-semibold hover:bg-gray-200/50'
        }`;

        return (
                <header className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-[#f8f9fa] border-b border-gray-200 w-full">
                
                        <div className="flex items-center md:w-48 order-1">
                                <h1 className="text-base sm:text-lg font-mono font-bold text-gray-900 tracking-tight">
                                        Expense Tracker
                                </h1>
                        </div>

                        <nav className="flex space-x-1 sm:space-x-2 w-full order-3 mt-3 md:w-auto md:order-2 md:mt-0 justify-center overflow-x-auto no-scrollbar pb-1 md:pb-0">
                                <NavLink to="/transactions" className={navLinkStyle}>
                                        Transaction
                                </NavLink>
                                <NavLink to="/accounts" className={navLinkStyle}>
                                        Accounts
                                </NavLink>
                                <NavLink to="/settings" className={navLinkStyle}>
                                        Settings
                                </NavLink>
                        </nav>

                        <div className="flex items-center justify-end md:w-48 gap-2 sm:gap-3 order-2 md:order-3">
                                <div className="w-5 h-5 bg-gray-200 rounded-full shrink-0"></div>
                                <span className="text-xs sm:text-sm font-bold text-gray-800">
                                        My Name
                                </span>
                        </div>

                </header>
        );
}