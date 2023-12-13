import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import LeftLayout from "./LeftLayout";
import Side from "./sidebar/layyout";
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
    <div className=" md:block">
      <div className="bg-white">
        <div className="grid lg:grid-cols-5">
          <Side />

          {/* <Sidebar/> */}
          <main className="col-span-3 lg:border-l pt-5 bg-green-50 h-full">
            {children}
          </main>
          <div className="">
            <LeftLayout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
