import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Otp from "../otp/Otp";
import VerificationSuccess from "../success/VerificationSuccess";
import RegisterFarm from "../farm/RegisterFarm";

import Dashboard from "../dashboard/Dashboard";

import Livestock from "../modules/livestock/LivestockDashboard";
import Add from "../modules/livestock/LivestockAddForm";
import Feeding from "../modules/feeding/Feeding";
import Health from "../modules/health/Health";
import Housing from "../modules/housing/HousingList";
import Layyout from "@/layout/sidebar/layyout";
import Edit from "../modules/livestock/LivestockEditForm";

const PublicRoutes = () => {
  return (
    <Routes>
      {/* <---- Protected Routes ---> */}
      <Route
        path="/"
        element={
          <Layyout>
            <Dashboard />
          </Layyout>
        }
      />
      {/* <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      /> */}

      <Route path="/livestock">
        <Route
          path="list"
          element={
            <Layyout>
              <Livestock />
            </Layyout>
          }
        />
        <Route
          path="add"
          element={
            <Layyout>
              <Add />
            </Layyout>
          }
        />
        <Route
          path="edit/:id"
          element={
            <Layyout>
              <Edit />
            </Layyout>
          }
        />
        <Route
          path="feed"
          element={
            <Layyout>
              <Feeding />
            </Layyout>
          }
        />
        <Route
          path="health"
          element={
            <Layyout>
              <Health />
            </Layyout>
          }
        />
        <Route
          path="house"
          element={
            <Layyout>
              <Housing />
            </Layyout>
          }
        />

    
      </Route>

      {/* <---- End of Protected Routes ---> */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/success" element={<VerificationSuccess />} />
      <Route path="/add-farm" element={<RegisterFarm />} />
      <Route path="*" element={<></>} />
    </Routes>
  );
};

export default PublicRoutes;
