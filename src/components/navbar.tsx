import { NavLink } from 'react-router-dom';

export default function Navbar() {
        
        // helper func to style selected tab
        const navLinkStyle = ({ isActive }: { isActive: boolean }) => 
        `px-4 py-1.5 rounded-lg text-sm transition-all ${
        isActive 
                ? 'bg-white text-gray-900 font-bold shadow-sm border border-gray-100' 
                : 'text-gray-500 font-semibold hover:bg-gray-200/50'
        }`;

        return (
                <header className="flex items-center justify-between px-6 py-3 bg-[#f8f9fa] border-b border-gray-200 w-full">
                
                <div className="flex items-center w-48">
                        <h1 className="text-lg font-mono font-bold text-gray-900 tracking-tight">
                                Expense Tracker
                        </h1>
                </div>

                <nav className="flex space-x-2">
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

                <div className="flex items-center justify-end w-48 gap-3">
                        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                        <span className="text-sm font-bold text-gray-800">
                                My Name
                        </span>
                </div>

                </header>
        );
}