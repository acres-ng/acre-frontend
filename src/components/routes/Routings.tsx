import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../modules/auth/login/Login";
import Signup from "../modules/auth/signup/Signup";
import Otp from "../modules/auth/otp/Otp";
import VerificationSuccess from "../modules/auth/success/VerificationSuccess";
import RegisterFarm from "../modules/farm/RegisterFarm";

import Dashboard from "../modules/dashboard/Dashboard";
import Layout from "../layout/Layout";

import Livestock from "../modules/livestock/All-Livestock/livestockDashboard";
import Add from "../modules/livestock/All-Livestock/addLivestockForm";
import Feeding from "../modules/livestock/Feeding/Feeding";
import Health from "../modules/livestock/Health/Health";
import Housing from "../modules/livestock/Housing/HousingList";
import Layyout from "@/components/layout/sidebar/layyout";
import InventoryList from "../modules/livestock/Feeding/InventoryList";
import Rations from "../modules/livestock/Feeding/Rations";
import RecipeBuilder from "../modules/livestock/Feeding/RecipeBuilder";
import Edit from "../modules/livestock/All-Livestock/editLivestockForm";

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
