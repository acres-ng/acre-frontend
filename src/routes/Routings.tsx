import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/modules/auth/login";
import Signup from "../components/modules/auth/signup";
import Otp from "../components/modules/auth/otp";
import VerificationSuccess from "../components/modules/auth/otpVerificationSuccess";
import RegisterFarm from "../components/modules/farm/registerFarm";

import Dashboard from "../components/modules/dashboard/dashboard";

import Livestock from "../components/modules/livestock/livestockDashboard";
import Add from "../components/modules/livestock/livestockAddForm";
import Feeding from "../components/modules/livestock/feeding/feeding";
import Health from "../components/modules/livestock/health/health";
import Housing from "../components/modules/livestock/housing/housingList";
import Layout from "@/components/layout/sidebar/layyout";
import InventoryList from "../components/modules/livestock/feeding/inventoryList";
import Rations from "../components/modules/livestock/feeding/rations/rations";
import RecipeBuilder from "../components/modules/livestock/feeding/recipeBuilder/recipeBuilder";
import Edit from "../components/modules/livestock/livestockEditForm";

const PublicRoutes = () => {
  return (
    <Routes>
      {/* <---- Protected Routes ---> */}
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
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
          path="edit/:id"
          element={
            <Layout>
              <Edit />
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

        <Route
          path="house"
          element={
            <Layout>
              <InventoryList />
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
