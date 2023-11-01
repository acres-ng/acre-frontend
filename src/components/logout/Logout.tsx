import authService from "@/services/authService";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    authService.logout();
    navigate("/", { replace: true });
  }, []);

  return null;
};

export default Logout;
