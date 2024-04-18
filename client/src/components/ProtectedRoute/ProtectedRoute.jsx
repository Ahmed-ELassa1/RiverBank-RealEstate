import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const { role } = useUser();

  if (!token && role !== "Admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
