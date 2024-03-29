import { routes } from "./config/routes";


import { GrTransaction } from "react-icons/gr";
import { GiCow } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import {
  PiPlantLight,
 
} from "react-icons/pi";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: "Home",
  },
  {
    name: "Dashboard",
    href: "/",
    icon: <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-4 w-4"
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>,
  },
  {
    name: "Livestock",
    href: "/livestock/list",
    icon:   <GiCow />,
    dropdownItems: [
     
      {
        name: "All Livestock",
        href: routes.livestock.dashboard,
        
      },
      {
        name: "Feeding",
        href: routes.livestock.feeding,
      },
      {
        name: "Health",
        href: routes.livestock.health,
      },
      {
        name: "Housing",
        href: routes.livestock.housing,
      },
    ],
  },
  {
    name: "Crops",
    href: routes.eCommerce.dashboard,
    icon: <PiPlantLight />,
  },
  {
    name: "Transaction",
    href: routes.analytics,
    icon: <GrTransaction />
    ,
  },
  {
    name: "Personnel",
    href: routes.analytics,
    icon: <FaPeopleGroup />,
  },
  {
    name: "FInances",
    href: routes.analytics,
    icon: <RiMoneyDollarBoxLine />
    ,
  },
 

 
];
