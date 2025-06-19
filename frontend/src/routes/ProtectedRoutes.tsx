import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Loader from "../components/Loader";

const ProtectedRoutes = () => {
  const { token, loading } = useAuth();

  if (loading) return <Loader />;
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
