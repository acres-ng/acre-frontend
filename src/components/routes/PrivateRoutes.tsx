// PrivateRoutes.js
import ProtectedRoute from "@/lib/ProtectedRoutes";
import React, { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "../common/Layout";
import Dashboard from "../dashboard/Dashboard";
import RegisterFarm from "../farm/RegisterFarm";
import AuthContext from "../context/authContext";

const PrivateRoutes = () => {
  const user = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
