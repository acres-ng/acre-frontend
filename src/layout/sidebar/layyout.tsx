//  import Header from './header';
import Header from "@/components/dashboard/Header";
import Sidebar from "./Sidebar";

import React from "react";
import RightBar from "../RighBar";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log("Pathname>>", pathname)
  return (
    <main className="flex flex-row w-full gap-6">
      <Sidebar className="hidden dark:bg-gray-50 xl:block 2xl:w-[25rem]" />
      {/* <div className="flex w-full flex-row flex-grow xl:ms-[230px]  2xl:ms-[480px]"> */}
      <div className="flex w-full flex-row gap-4 2xl:gap-8">
        <div className="w-full">
          <Header />
          {children}
        </div>
        {pathname === "/" && (
          <div className="hidden lg:flex w-[35%]">
            <RightBar />
          </div>
        )}
      </div>
    </main>
  );
};

export default layout;
