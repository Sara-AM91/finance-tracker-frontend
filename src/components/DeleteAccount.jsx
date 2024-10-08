import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeactivateModal from "./DeactivateModal";

const DeleteAccount = ({ user, setUser }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const deactivateAccount = async () => {
    setLoading(true);
    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      setError("No token found, user is not authenticated");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://finance-tracker-api-eunu.onrender.com/user/profile/deactivate",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUser(null); // Log out user
      navigate("/signup"); // Redirect to sign-up page
    } catch (error) {
      setError("Error deactivating account");
      console.error("Error deactivating account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-[90%] max-w-[600px] rounded-3xl shadow-lg p-5 my-10">
      <h2 className="text-xl text-white">Deactivate Account</h2>
      <p className="text-left text-sm mb-4 text-gray-400">
        Here you can delete your existing account. Keep in mind, that it’s a
        permanent removal and can’t be retrieved.
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="bg-gradient-to-r from-orange-500 to-rose-600 text-white py-2 px-4 rounded-lg text-base float-start"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {loading ? "Processing..." : "Delete"}
      </button>
      {open && (
        <DeactivateModal
          deactivateAccount={deactivateAccount}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default DeleteAccount;
