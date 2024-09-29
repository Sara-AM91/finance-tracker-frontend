import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./components/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import AccountPage from "./pages/AccountPage";
import { TransactionProvider } from "./contexts/TransactionContext";

const App = () => {
  return (
    <BrowserRouter>
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
            <Route path="/account" element={<AccountPage />} />
          </Route>

          {/* Optional: handle unknown routes by redirecting */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </TransactionProvider>
    </BrowserRouter>
  );
};

export default App;
