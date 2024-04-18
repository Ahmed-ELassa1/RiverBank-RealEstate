import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userID, setID] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
      if (token) {
        const decoded = jwtDecode(token);
        setUsername(decoded?.userName);
        setEmail(decoded?.email);
        setID(decoded?._id);
        setRole(decoded?.role);
      }
    } catch (error) {
      console.error("Failed to decode token or token is invalid", error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ username, email, role, userID }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the useUser hook for easy access to the context
export const useUser = () => useContext(UserContext);
