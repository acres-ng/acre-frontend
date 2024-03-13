//  import Header from './header';
import Header from "@/components/modules/dashboard/header";
import Sidebar from "./sidebar";

import React from "react";
import RightBar from "../righBar";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <main className="flex flex-row w-full gap-6">
      <Sidebar className="top-0 sticky hidden dark:bg-gray-50 xl:block 2xl:w-[25rem]" />
      {/* <div className="flex w-full flex-row flex-grow xl:ms-[230px]  2xl:ms-[480px]"> */}
      <div className="flex w-full flex-row gap-4 2xl:gap-8 max-w-full overflow-x-hidden">
        <div className={`w-full max-w-full overflow-x-hidden sticky overflow-y-scroll no_scrollbar ${pathname === "/" && "lg:w-[70%]"}`}>
          <Header />
          {children}
        </div>
        {pathname === "/" && (
          <div className="hidden lg:flex w-[25%] fixed right-0 overflow-y-scroll no_scrollbar">
            <RightBar />
          </div>
        )}
      </div>
    </main>
  );
};

export default Layout;
