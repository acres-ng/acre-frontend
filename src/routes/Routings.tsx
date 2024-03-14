import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/modules/auth/Login";
import Signup from "../components/modules/auth/Signup";
import Otp from "../components/modules/auth/Otp";
import OtpVerificationSuccess from "../components/modules/auth/OtpVerificationSuccess";
import RegisterFarm from "../components/modules/farm/RegisterFarm";
import Dashboard from "../components/modules/dashboard/Dashboard";
import LivestockDashboard from "../components/modules/livestock/LivestockDashboard";
import LivestockAddForm from "../components/modules/livestock/LivestockAddForm";
import Feeding from "../components/modules/livestock/feeding/Feeding";
import Health from "../components/modules/livestock/health/Health";
import Housing from "../components/modules/livestock/housing/HousingList";
import Layout from "@/components/layout/sidebar/Layout";
import InventoryList from "../components/modules/livestock/feeding/InventoryList";
import Rations from "../components/modules/livestock/feeding/rations/Rations";
import RecipeBuilder from "../components/modules/livestock/feeding/recipeBuilder/RecipeBuilder";
import LivestockEditForm from "../components/modules/livestock/LivestockEditForm";

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
              <LivestockDashboard />
            </Layout>
          }
        />
        <Route
          path="add"
          element={
            <Layout>
              <LivestockAddForm />
            </Layout>
          }
        />
        <Route
          path="edit/:id"
          element={
            <Layout>
              <LivestockEditForm />
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
      <Route path="/success" element={<OtpVerificationSuccess />} />
      <Route path="/add-farm" element={<RegisterFarm />} />
      <Route path="*" element={<></>} />
    </Routes>
  );
};

export default PublicRoutes;
