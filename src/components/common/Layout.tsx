import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/lib/ProtectedRoutes";
import Dashboard from "../dashboard/Dashboard";
import RegisterFarm from "../farm/RegisterFarm";

type Props = {
  children: React.ReactNode;
};
const Layout = () => {
  return (
    <div className="hidden md:block">
      <div className="bg-white">
        <div className="grid lg:grid-cols-5">
          <Sidebar />
          <main className="col-span-3 lg:col-span-4 lg:border-l pt-16 bg-green-50 h-screen">
            <Routes>
              <Route path="/">
                <Route index element={<Dashboard />} />
              </Route>
              {/* <Route path="add-farm" element={<RegisterFarm />} /> */}

              {/* Other routes can be defined here */}
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
