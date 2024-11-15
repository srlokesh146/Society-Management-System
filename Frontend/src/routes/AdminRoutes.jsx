import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { role } = useSelector((store) => store.auth.user);

  if (role !== "admin") {
    return <Navigate to="/visitortracking" />;
  }

  return <>{children}</>;
};

export default AdminRoutes;
