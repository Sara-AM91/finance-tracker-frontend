import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./components/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import IncomesPage from "./pages/IncomesPage";
import TransactionsListPage from "./pages/TransactionsListPage";
import AccountPage from "./pages/AccountPage";
import { TransactionProvider } from "./contexts/TransactionContext";
import { AlertProvider } from "./contexts/AlertContext";
import ScrollToTop from "./utils/ScrollToTop";
import AuthProvider from "./contexts/AuthContext";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TransactionProvider>
          <AlertProvider>
            <ScrollToTop /> {/* Add ScrollToTop here */}
            <Routes>
              {/* Redirect root path to login page */}
              <Route path="/" element={<Navigate to="/login" />} />

              {/* Login and Signup routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Wrap Dashboard and Expenses with MainLayout */}
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/incomes" element={<IncomesPage />} />
                <Route
                  path="/transactions-list"
                  element={<TransactionsListPage />}
                />
                <Route path="/account" element={<AccountPage />} />
              </Route>

              {/* Optional: handle unknown routes by redirecting */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </AlertProvider>
        </TransactionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
