
// import { Link } from "react-router-dom";
// import RingBellSolidIcon from './icons/ring-bell-solid';
// import NotificationDropdown from '@/layouts/notification-dropdown';
// import { ActionIcon } from 'rizzui';
// import ProfileMenu from '@/layouts/profile-menu';
// import { Badge } from 'rizzui';
// import SearchWidget from '@/components/search/search';
// import React, { useState } from 'react';

// import {useDrawer} from './use-drawer';

// import { HiMenu, HiX } from 'react-icons/hi';

// import { useIsMounted } from './use-is-mounted';
// import HamburgerButton from './hamburger-button';
// import Sidebar from './Sidebar';
// import { cn } from "@/lib/utils";
// import logo from "../../../assets/logo.png";
// import   useWindowScroll   from 'react-use/lib/useWindowScroll';


// function HeaderMenuRight() {

  
  
//   return (
//     <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
//      <RingBellSolidIcon className="h-[18px] w-auto" />
//       {/* <NotificationDropdown>
//         <ActionIcon
//           aria-label="Notification"
//           variant="text"
//           className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
//         >
          
//           <Badge
//             renderAsDot
//             color="warning"
//             enableOutlineRing
//             className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
//           />
//         </ActionIcon>
//       </NotificationDropdown> 
//       */}
//       {/* <ProfileMenu /> */}
      
//     </div>
//   );
// }

// export default function Header() {

//   const [showSidebar, setShowSidebar] = useState(false);

//   const handleHamburgerClick = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const handleCancelClick = () => {
//     setShowSidebar(false);
//   };
//   const handleOverlayClick = () => {
//     setShowSidebar(false);
//   };


//   const isMounted = useIsMounted();
//   const windowScroll = useWindowScroll();
//   return (
//     <header
//       className={cn(
//         'sticky top-0 z-50 flex items-center  px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10',
//         ((isMounted && windowScroll.y) as number) > 2 ? 'card-shadow' : ''
//       )}
//     >
//       <div className="flex w-full max-w-2xl items-center">
      
//         <HamburgerButton
//           view={<Sidebar className="static w-full 2xl:w-full" />}
//         />
//       {!showSidebar ? (
//           <HiMenu
//             className="cursor-pointer me-4 w-9 shrink-0 lg:me-5 xl:hidden"
//             onClick={handleHamburgerClick}
//           />
//         ) : (
//           <HiX
//             className="cursor-pointer me-4 w-9 shrink-0 lg:me-5 xl:hidden"
//             onClick={handleCancelClick}
//           />
//         )}
//         <Link
//           to={'*'}
//           aria-label="Site Logo"
//           className="me-4 w-9 shrink-0 lg:me-5 xl:hidden"
//         >
//           <img src={logo} alt="acre logo" className="h-10 w-auto" />
//         </Link>
//          {/* <SearchWidget /> */}
        
//       </div>
//       {showSidebar && (
//         <>
//           <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={handleOverlayClick}></div>
//           <Sidebar className="static w-full 2xl:w-full" />
//         </>
//       )}
//       <HeaderMenuRight />
//     </header>
//   );
// }
