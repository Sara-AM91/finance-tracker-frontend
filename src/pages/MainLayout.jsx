import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import { useTransactionContext } from "../contexts/TransactionContext";
import GlobalAlert from "../components/GlobalAlert "; // Import GlobalAlert

const MainLayout = () => {
  const { user: userData, loading: userLoading, error: userError } = useUser();
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
    addTransaction, // Directly access addTransaction from context
  } = useTransactionContext();

  const [user, setUser] = useState({});

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  if (userLoading || transactionsLoading) {
    return <p>Loading...</p>;
  }

  if (userError || transactionsError) {
    return <p>Error: {userError || transactionsError}</p>;
  }

  return (
    <div className="relative flex flex-col bg-gradient-to-b from-[#121428] to-[#000036] h-full">
      {/* First Background Curve */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#121428] to-[#000036] z-0">
        {/* Upper Curve */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#121428] to-[#000036]"
          style={{ clipPath: "ellipse(80% 50% at 50% 0%)" }}
        ></div>
      </div>

      {/* Second Background Curve */}
      <div
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-l from-[#121428] to-[#000036] z-0"
        style={{ clipPath: "ellipse(80% 60% at 50% 100%)" }}
      ></div>
      {/* Include Global Alert at top level */}
      <GlobalAlert />
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col flex-grow overflow-hidden p-4">
        <Header />
        <div className="flex flex-grow gap-6 h-full">
          <Sidebar user={user} />
          <Outlet context={{ user, setUser, transactions, addTransaction }} />
          {/* Dashboard content */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
