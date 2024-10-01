import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./components/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import IncomesPage from "./pages/IncomesPage";
import AccountPage from "./pages/AccountPage";
import { TransactionProvider } from "./contexts/TransactionContext";
import { AlertProvider } from "./contexts/AlertContext";

const App = () => {
  return (
    <BrowserRouter>
      <AlertProvider>
        <TransactionProvider>
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
              <Route path="/account" element={<AccountPage />} />
            </Route>

            {/* Optional: handle unknown routes by redirecting */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </TransactionProvider>
      </AlertProvider>
    </BrowserRouter>
  );
};

export default App;
