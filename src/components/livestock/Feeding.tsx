import React from 'react'
import UsersTable from './UsersTable'
import { usersData } from './users-data'

const Feeding = () => {
  return (
    <div> <UsersTable data={usersData} /></div>
  )
}

export default Feeding


// import React from 'react'
// import {
//     MagnifyingGlassIcon,
//     ChevronUpDownIcon,
//   } from "@heroicons/react/24/outline";
//   import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
//   import { BsThreeDotsVertical } from "react-icons/bs";
//   import { CiSquareMinus } from "react-icons/ci";
//   import { CiSquarePlus } from "react-icons/ci";
//   import { GiChicken } from "react-icons/gi";
//   import {
//     Card,
//     CardHeader,
//     Input,
//     Typography,
//     Button,
//     CardBody,
//     Chip,
//     CardFooter,
//     Tabs,
//     TabsHeader,
//     Tab,
//     Avatar,
//     IconButton,
//     Tooltip,
//   } from "@material-tailwind/react";


// import InventoryList from './InventoryList';
// import RecipeBuilder from './RecipeBuilder';
// import Rations from './Rations';
// import { Link } from 'react-router-dom';



   
// const TABS = [
//     {
//       label: "Inventory List",
//       value: "/inventory",
//     },
//     {
//       label: "Recipe Builder",
//       value: "/recipe-builder",
//     },
//     {
//       label: "Rations",
//       value: "/rations",
//     },
//   ];
   
//   const TABLE_HEAD = ["Feed Name/ID", "Livestock Type", "Unit Weight", "Price per Unit", "Feed Stock", "Total Weight", "Total Price", " "];
   
//   const TABLE_ROWS = [
//     {
//       img: "<GiChicken />",
//       name: "Chicken",
//       email: "john@creative-tim.com",
//       job: "Top Feed Proline",
//       org: "Organization",
//       online: true,
//       date: "23/04/18",
//     },
//     {
//       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
//       name: "Alexa Liras",
//       email: "alexa@creative-tim.com",
//       job: "Top Feed Proline",
//       org: "Developer",
//       online: false,
//       date: "23/04/18",
//     },
//     {
//       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
//       name: "Laurent Perrier",
//       email: "laurent@creative-tim.com",
//       job: "Top Feed Proline",
//       org: "Projects",
//       online: false,
//       date: "19/09/17",
//     },
//     {
//       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
//       name: "Michael Levi",
//       email: "michael@creative-tim.com",
//       job: "Top Feed Proline",
//       org: "Developer",
//       online: true,
//       date: "24/12/08",
//     },
//     {
//       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
//       name: "Richard Gran",
//       email: "richard@creative-tim.com",
//       job: "Top Feed Proline",
//       org: "Executive",
//       online: false,
//       date: "04/10/21",
//     },
//   ];
   
//   const Feeding = () => {
//     return (
//       <Card className="h-full w-full mt-12 z-20" placeholder="Some placeholder text">
//         <CardHeader placeholder="Some placeholder text" floated={false} shadow={false} className="rounded-none">
//           <div className="mb-8 flex items-center justify-between gap-8">

    
//   <Tabs value="all" className="w-full md:w-max">
//     <TabsHeader placeholder="Some placeholder text">
//       {TABS.map(({ label, value }) => (
//         <Link to={`/${value}`} key={value}>
//           <Tab value={value} placeholder="" className="w-auto">
//             &nbsp;&nbsp;{label}&nbsp;&nbsp;
//           </Tab>
//         </Link>
//       ))}
//     </TabsHeader>
//   </Tabs>

 






      
//             <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
//             <Button className="flex items-center bg-green-600 gap-3" size="sm" placeholder="Some placeholder text">
//              <CiSquarePlus className="h-4 w-4"  /> Add Feed
//               </Button>
//             </div>
//           </div>
//           <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          
//           <div>
//               <Typography placeholder="Some placeholder text" variant="h5" color="blue-gray">
//               Feed Inventory List
//               </Typography>
//             </div>


//             <div className="w-full md:w-72">
//             <Input crossOrigin="anonymous"
//                 label="Search"
//                 icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//               />
//             </div>
//           </div>
//         </CardHeader>
//         <CardBody className="overflow-scroll px-0" placeholder="Some placeholder text">
//           <table className="mt-4 w-full min-w-max table-auto text-left">
//             <thead>
//               <tr>
//                 {TABLE_HEAD.map((head, index) => (
//                   <th
//                     key={head}
//                     className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
//                   >
//                     <Typography
//                     placeholder="Some placeholder text"
//                       variant="small"
//                       color="blue-gray"
//                       className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
//                     >
//                       {head}{" "}
//                       {index !== TABLE_HEAD.length - 1 && (
//                         <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
//                       )}
//                     </Typography>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {TABLE_ROWS.map(
//                 ({ img, name, email, job, org, online, date }, index) => {
//                   const isLast = index === TABLE_ROWS.length - 1;
//                   const classes = isLast
//                     ? "p-4"
//                     : "p-4 border-b border-blue-gray-50";
   
//                   return (
//                     <tr key={name}>
//                       <td className={classes}>
//                         <div className="flex items-center gap-3">

//                         <div className="flex flex-col">
//                           <Typography
//                           placeholder="Some placeholder text"
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal"
//                           >
//                             {job}
//                           </Typography>
//                         </div>
                        
//                         </div>
//                       </td>
//                       <td className={classes}>
//                       <div className="flex items-center">
//   <GiChicken />
//   <div className="flex flex-col">
//     <Typography
//       placeholder="Some placeholder text"
//       variant="small"
//       color="blue-gray"
//       className="font-normal"
//     >
//       Chicken
//     </Typography>
//   </div>
// </div>
//                       </td>
//                       <td className={classes}>
//                         <div className="w-max">
//                           {/* <Chip
//                             variant="ghost"
//                             size="sm"
//                             value={online ? "online" : "offline"}
//                             color={online ? "green" : "blue-gray"}
//                           /> */}
//                           21kg
//                         </div>
//                       </td>
//                       <td className={classes}>
//                         <Typography
//                         placeholder="Some placeholder text"
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal"
//                         >
//                           N10 800
//                         </Typography>
//                       </td>
//                       <td className={classes}>
//                       <div className="w-max flex justify-center">
//   <span><CiSquareMinus /> </span>
//   <span>5</span>
//   <span><CiSquarePlus /></span>
// </div>
//                       </td>
//                       <td className={classes}>
//                         <div className="w-max">
//                           105kg
//                         </div>
//                       </td>
//                       <td className={classes}>
//                         <div className="w-max">
//                         N54 000
//                         </div>
//                       </td>
//                       <td className={classes}>
//                         <Tooltip content="Edit User">
//                           <IconButton placeholder="Some placeholder text" variant="text">
//                             <BsThreeDotsVertical className="h-4 w-4" />
//                           </IconButton>
//                         </Tooltip>
//                       </td>
//                     </tr>
//                   );
//                 },
//               )}
//             </tbody>
//           </table>
//         </CardBody>
//         <CardFooter placeholder="Some placeholder text" className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//         <Button placeholder="Some placeholder text" variant="outlined" size="sm">
//           Previous
//         </Button>
//         <div className="flex items-center gap-2">
//           <IconButton placeholder="Some placeholder text" variant="outlined" size="sm">
//             1
//           </IconButton>
//           <IconButton placeholder="Some placeholder text" variant="text" size="sm">
//             2
//           </IconButton>
//           <IconButton placeholder="Some placeholder text" variant="text" size="sm">
//             3
//           </IconButton>
//           <IconButton placeholder="Some placeholder text" variant="text" size="sm">
//             ...
//           </IconButton>
//           <IconButton placeholder="Some placeholder text" variant="text" size="sm">
//             8
//           </IconButton>
//           <IconButton placeholder="Some placeholder text" variant="text" size="sm">
//             9
//           </IconButton>
//           <IconButton placeholder="Some placeholder text" variant="text" size="sm">
//             10
//           </IconButton>
//         </div>
//         <Button placeholder="Some placeholder text" variant="outlined" size="sm">
//           Next
//         </Button>
//       </CardFooter>
//       </Card>
//     );
//   }

//   export default Feeding