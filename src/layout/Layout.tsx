// import React, { useEffect } from "react";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";
// import LeftLayout from "./RightLayout";
// import Side from "./sidebar/layyout";

// import Tasks from "./Tasks"
// import { getCurrentUser } from "@/services/authService";

// type Props = {
//   children: React.ReactNode;
// };

// const Layout = ({ children }: Props) => {
//   const user = getCurrentUser();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   });

//   return (
//     <div className="md:block ">
      
//       <div className="bg-white">
//         <div className="grid grid-cols-12 gap-2">
//           {/* Sidebar */}
//           <aside className="lg:col-span-2 ">
//           <Side />
//           </aside>
  
//           {/* Main Content */}
//           <main className="lg:col-span-7 col-span-12 pt-5 bg-green-50 w-full h-full">
//             {children}
//           </main>
  
//           {/* Right Section */}
//           {/* <div className="lg:col-span-3 col-span-12">
//             <LeftLayout />
      
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default Layout;


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
        <div className="grid grid-cols-12 gap-2 h-full">
          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <Side />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-10 col-span-12 pt-5 bg-green-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;



