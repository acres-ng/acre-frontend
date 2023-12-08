import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Otp from "../otp/Otp";
import VerificationSuccess from "../success/VerificationSuccess";
import RegisterFarm from "../farm/RegisterFarm";
import Logout from "../logout/Logout";
import Map from '../farm/Map'
import Dashboard from "../dashboard/Dashboard";
import Layout from "../common/Layout";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/success" element={<VerificationSuccess />} />
      <Route path="/add-farm" element={<RegisterFarm />} />
      <Route path="*" element={<Login />} />
      <Route path="/map" element={<Map/>} />
      
    </Routes>
  );
};

export default PublicRoutes;
