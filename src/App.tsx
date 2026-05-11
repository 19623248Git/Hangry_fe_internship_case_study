// React Component Import
import Navbar from './components/navbar';

// React Pages Import
import TransactionPage from "./pages/transaction";
import MockAccounts from "./pages/mock_accounts";
import MockSettings from "./pages/mock_settings";

// React Library Import
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {

        return (
                <>
                        <Router>
                                <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                                        <Navbar />
                                        <Routes>
                                                <Route path="/transactions" element={<TransactionPage />} />
                                                <Route path="/accounts" element={<MockAccounts />} />
                                                <Route path="/settings" element={<MockSettings />} />
                                                <Route path="*" element={<Navigate to="/transactions" replace />} />
                                        </Routes>
                                        
                                </div>
                        </Router>
                </>
        )
}

export default App
