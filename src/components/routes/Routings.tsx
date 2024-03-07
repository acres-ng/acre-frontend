import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Otp from "../otp/Otp";
import VerificationSuccess from "../success/VerificationSuccess";
import RegisterFarm from "../farm/RegisterFarm";

import Dashboard from "../dashboard/Dashboard";
import Layout from "../../layout/Layout";

import Livestock from "../livestock/All-Livestock/Livestock";
import Add from "../livestock/All-Livestock/Add";
import Feeding from "../livestock/Feeding/Feeding";
import Health from "../livestock/Health";
import Housing from "../livestock/Housing/HousingList";
import Layyout from "@/layout/sidebar/layyout";
import InventoryList from "../livestock/Feeding/InventoryList";
import Rations from "../livestock/Feeding/Rations";
import RecipeBuilder from "../livestock/Feeding/RecipeBuilder";
import Edit from "../livestock/All-Livestock/Edit";

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
