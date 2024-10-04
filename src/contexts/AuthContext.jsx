import { createContext, useState, useEffect } from "react";
import { useJwt } from "react-jwt";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Initialize token with the stored value
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || null);

  const { decodedToken, isExpired } = useJwt(token);
  console.log("Decoded Token:", decodedToken);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const getUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/${decodedToken._id}`);
      const data = await res.json();
      console.log("User Data:", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("PLZ RUN :(");
    if (decodedToken) {
      getUser();
    }
  }, [decodedToken]);

  return (
    <AuthContext.Provider value={{ token, login, logout, user: decodedToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
