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
import InventoryList from "../livestock/InventoryList";
import Rations from "../livestock/Rations";
import RecipeBuilder from "../livestock/RecipeBuilder";

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

        <Route
          path="house"
          element={
            <Layyout>
              <InventoryList />
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
