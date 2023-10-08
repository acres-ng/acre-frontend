import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./lib/ProtectedRoutes";
import Otp from "./components/otp/Otp";

Login;
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path={`/`}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
