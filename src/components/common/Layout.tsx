import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/lib/ProtectedRoutes";
import Dashboard from "../dashboard/Dashboard";
import RegisterFarm from "../farm/RegisterFarm";
import Livestock from "../livestock/Livestock";
import Add from "../livestock/Add";

type Props = {
  children: React.ReactNode;
};
const Layout = () => {
  return (
    <div className="hidden md:block">
      <div className="bg-white">
        <div className="grid lg:grid-cols-5">
          <Sidebar />
          <main className="col-span-3 lg:col-span-4 lg:border-l pt-5 bg-green-50 h-full">
            <Routes>
              <Route path="/">
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="/livestock">
                <Route path="list" element={<Livestock />} />
                <Route path="add" element={<Add />} />
              </Route>

              {/* Other routes can be defined here */}
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
