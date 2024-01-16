import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Otp from "../otp/Otp";
import VerificationSuccess from "../success/VerificationSuccess";
import RegisterFarm from "../farm/RegisterFarm";

import Dashboard from "../dashboard/Dashboard";
import Layout from "../../layout/Layout";

import Livestock from "../livestock/Livestock";
import Add from "../livestock/Add";
import Feeding from "../livestock/Feeding";
import Health from "../livestock/Health";
import Housing from "../livestock/Housing";
import Layyout from "@/layout/sidebar/layyout";

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
            <Layout>
              <Livestock />
            </Layout>
          }
        />
        <Route
          path="add"
          element={
            <Layout>
              <Add />
            </Layout>
          }
        />
        <Route
          path="feed"
          element={
            <Layout>
              <Feeding />
            </Layout>
          }
        />
         <Route
          path="health"
          element={
            <Layout>
              <Health />
            </Layout>
          }
        />
        <Route
          path="house"
          element={
            <Layout>
              <Housing />
            </Layout>
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
