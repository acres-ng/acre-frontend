


import Side from "./sidebar/layyout";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/services/authService";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
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
        <div className="grid grid-cols-12 h-full">
          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <Side />
            {/* children={children} */}
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-10 col-span-12 w-full pt-5 bg-green-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;



