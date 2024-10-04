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
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

const App = () => {
  const { token } = useContext(AuthContext);

  console.log("THE token", token);

  return (
    <BrowserRouter>
      <TransactionProvider>
        <AlertProvider>
          <ScrollToTop /> {/* Add ScrollToTop here */}
          <Routes>
            {/* Login and Signup routes */}
            <Route
              path="/login"
              element={!token ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!token ? <SignUpPage /> : <Navigate to="/" />}
            />
            {/* Redirect root path to login page */}
            <Route
              path="/"
              element={token ? <MainLayout /> : <Navigate to="/login" />}
            >
              <Route index element={<Dashboard />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/incomes" element={<IncomesPage />} />
              <Route
                path="/transactions-list"
                element={<TransactionsListPage />}
              />
              <Route path="/account" element={<AccountPage />} />
            </Route>

            {/* handle unknown routes by redirecting */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AlertProvider>
      </TransactionProvider>
    </BrowserRouter>
  );
};

export default App;
