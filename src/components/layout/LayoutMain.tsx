import Side from "./sidebar/Layout";
import React, { useEffect } from "react";
// import Sidebar from "./Sidebar";
import Sidebar from "./sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/services/authService";
import Header from "@/components/modules/dashboard/Header";
import LayoutHeader from "./LayoutHeader";

type Props = {
  children: React.ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div className="md:block h-screen">
      <div className="bg-white h-full">
        <LayoutHeader />
        <div className="grid grid-cols-12 h-full">
          {/* Sidebar */}
          <aside className="lg:col-span-2">
            {/* <Side /> */}
            <Sidebar className="fixed hidden dark:bg-gray-50 xl:block 2xl:w-[25rem]" />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-10 col-span-12 w-full pt-8 bg-green-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutMain;
