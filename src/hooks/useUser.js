import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useUser = () => {
  const { token, user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setUser(result);
      } catch (error) {
        setError(error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, setUser]);

  return { user, loading, error };
};
export default useUser;
