import { Button } from "../ui/button";
// import { Input } from "@/components/ui/input";
import { Input } from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { getFarmLivestock } from "@/services/livestockService";
import { useEffect, useState } from "react";
import { AcreLoader } from "../ui/acreLoader";
import { LivestockType } from "@/lib/types";
import UsersTable from "./UsersTable";
// import { PlusIcon } from '@heroicons/react/solid'


const Livestock = () => {
  const navigate = useNavigate();
  const [livestock, setLivestockData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getFarmLivestock().then((res) => {
      setLivestockData(res);
      setLoading(false);
    });
  }, []);

  const AddLivestockDialog = () => {
    const handleSingleEntryClick = () => {
      navigate("/livestock/add", { state: { entryType: "single" } });
    };

    const handleFlockEntryClick = () => {
      navigate("/livestock/add", { state: { entryType: "flock" } });
    };
    return (
      <Dialog>
        <DialogTrigger asChild>
        <Button variant={"default"} className="top-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
  {/* <PlusIcon className="h-5 w-5 mr-2" /> */}
  Add livestock
</Button>


        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Livestock</DialogTitle>
            <DialogDescription>
              What is the quantity type of your livestock?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Card className={cn("w-[380px] border-0")}>
              <CardContent className="grid gap-4">
                <div
                  className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer"
                  onClick={handleSingleEntryClick}
                >
                  <BellRing />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Single Entry
                    </p>
                    <p className="text-sm text-muted-foreground">
                      I want to add a single animal
                    </p>
                  </div>
                </div>

                <div className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer">
                  <BellRing />
                  <div
                    className="flex-1 space-y-1"
                    onClick={handleFlockEntryClick}
                  >
                    <p className="text-sm font-medium leading-none">
                      Flock Entry
                    </p>
                    <p className="text-sm text-muted-foreground">
                      I want to add a flock of animals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter className="flex w-full justify-between">
            <Button variant={"outline"}>Cancel</Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const LivestockTable = () => {
    return (
      <div> <UsersTable data={livestock} /></div>
    );
  };
  // const LivestockTable = () => {
  //   return (
  //     <div className="items-stretch bg-white flex flex-col pt-6 pb-12 rounded-2xl ">
  //       <table className="border-spacing-0 min-w-full border-collapse">
  //         <thead className="bg-stone-50">
  //           <tr className="">
  //             <th className="text-left p-4 border-b-2 border-b-zinc-300 border-solid">
  //               Name
  //             </th>
  //             <th className="text-left p-4 border-b-2 border-b-zinc-300 border-solid">
  //               Animal type
  //             </th>
  //             <th className="text-left p-4 border-b-2 border-b-zinc-300 border-solid">
  //               Count
  //             </th>
  //             <th className="text-left p-4 border-b-2 border-b-zinc-300 border-solid">
  //               Breed
  //             </th>
  //             <th className="text-left p-4 border-b-2 border-b-zinc-300 border-solid">
  //               Maturity
  //             </th>
  //             <th className="text-left p-4 border-b-2 border-b-zinc-300 border-solid">
  //               Status
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {livestock.map((livestock: LivestockType) => (
  //             <tr>
  //               <td className="p-4 border-b-zinc-300 border-b border-solid">
  //                 {livestock.name}
  //               </td>
  //               <td className="p-4 border-b-zinc-300 border-b border-solid">
  //                 {livestock.animal_type}
  //               </td>
  //               <td className="p-4 border-b-zinc-300 border-b border-solid">
  //                 {livestock.quantity}
  //               </td>
  //               <td className="p-4 border-b-zinc-300 border-b border-solid">
  //                 {livestock.breed}
  //               </td>
  //               <td className="p-4 border-b-zinc-300 border-b border-solid">
  //                 {livestock.maturity_public_name}
  //               </td>
  //               <td className="p-4 border-b-zinc-300 border-b border-solid">
  //                 <select className="w-full">
  //                   <option>okay</option>
  //                   <option>sick</option>
  //                 </select>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

  const EmptyState = () => {
    return (
      <div className="items-stretch bg-white flex flex-col pt-6 pb-12 px-8 rounded-2xl max-md:px-5 m-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd51dbfefabec61626aceec83bcbea198f0cbbf004dcb1e0ff1c5ed65f6f2d2c?"
          className="aspect-[1.54] object-contain object-center w-[500px] overflow-hidden self-center max-w-full mt-40 max-md:mt-10"
        />
        <div className="text-zinc-500 text-center text-sm leading-5 self-center max-w-[466px] mt-8 max-md:max-w-full">
          You don’t have any livestock in your farm yet. Click on the button
          below to start adding livestock to your farm
        </div>
        <span className="justify-end items-stretch bg-green-600 self-center flex gap-2 mt-8 mb-24 px-4 py-3.5 rounded-xl max-md:mb-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccdb2f2b68080580aa7837cf3c49aed36dc1fa5986139cce42f014f5d8151f02?"
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-white text-sm font-semibold self-center grow whitespace-nowrap my-auto">
            {<AddLivestockDialog />}
          </div>
        </span>
      </div>
    );
  };

  // return (
  //   <>
  //     <div className="h-full px-4 py-6 lg:px-8">
  //       <div className="h-full space-y-6">
  //         <div className="flex justify-between flex-row items-center">
  //           <p className="text-2xl font-semibold leading-none tracking-tight">
  //             Livestock
  //           </p>

  //           <Dialog>
  //             <DialogTrigger asChild>
  //               <Button variant={"default"}>+ Add livestock</Button>
  //             </DialogTrigger>
  //             <DialogContent className="sm:max-w-[425px]">
  //               <DialogHeader>
  //                 <DialogTitle>Add Livestock</DialogTitle>
  //                 <DialogDescription>
  //                   What is the quantity type of your livestock?
  //                 </DialogDescription>
  //               </DialogHeader>
  //               <div className="grid gap-4 py-4">
  //                 <Card className={cn("w-[380px] border-0")}>
  //                   <CardContent className="grid gap-4">
  //                     <div
  //                       className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer"
  //                       onClick={() => navigate("/livestock/add")}
  //                     >
  //                       <BellRing />
  //                       <div className="flex-1 space-y-1">
  //                         <p className="text-sm font-medium leading-none">
  //                           Single Entry
  //                         </p>
  //                         <p className="text-sm text-muted-foreground">
  //                           I want to add a single animal
  //                         </p>
  //                       </div>
  //                     </div>
  //
  //                     <div className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer">
  //                       <BellRing />
  //                       <div className="flex-1 space-y-1">
  //                         <p className="text-sm font-medium leading-none">
  //                           Flock Entry
  //                         </p>
  //                         <p className="text-sm text-muted-foreground">
  //                           I want to add a flock of animals
  //                         </p>
  //                       </div>
  //                     </div>
  //                   </CardContent>
  //                 </Card>
  //               </div>
  //               <DialogFooter className="flex w-full justify-between">
  //                 <Button variant={"outline"}>Cancel</Button>
  //                 <Button type="submit">Continue</Button>
  //               </DialogFooter>
  //             </DialogContent>
  //           </Dialog>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <span className="items-stretch bg-white flex flex-col pt-6 pb-12 px-8 rounded-2xl max-md:px-5 m-5">
      {isLoading ? <AcreLoader /> : null}

      {/* <div className="text-black text-2xl font-semibold max-md:max-w-full">
        Livestock
      </div> */}

      {/*  */}
      <span className="justify-between self-stretch flex w-full gap-5 items-start max-md:max-w-full max-md:flex-wrap">
        <div className="text-black text-2xl font-semibold">Livestock</div>
        {livestock[0] ? <AddLivestockDialog /> : null}
      </span>

      {/*  */}

      <div className="justify-between items-stretch flex w-full gap-5 mt-6 max-md:max-w-full max-md:flex-wrap">
    
   <div className="relative w-full  md:w-72 pt-2">
      <div className="flex items-center  space-x-2 absolute inset-y-0 left-0 pl-3 pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="rounded-xl w-full py-2 pl-10 pr-3 border border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </div>
        <div className="justify-between sm:ml-8 max-md:w-full items-stretch flex gap-5   max-md:max-w-full max-md:flex-wrap">
        <select
            className="items-stretch w-full sm:w-[10.5rem]  border-[color:var(--Grey-Grey-3,#E4E5E6)] flex gap-2.5 px-4 py-3 rounded-xl border-2 border-solid"
            onChange={() => {}}
          >
            <option value="">Housing</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        <select
            className="items-stretch w-full sm:w-[10.5rem] border-[color:var(--Grey-Grey-3,#E4E5E6)] flex gap-2.5 px-4 py-3.5 rounded-xl border-2 border-solid"
            onChange={() => {}}
          >
            <option value="">Animal type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
          {/* <select
            className="items-stretch w-[10.5rem] border-[color:var(--Grey-Grey-3,#E4E5E6)] flex gap-2.5 px-4 py-3.5 rounded-xl border-2 border-solid"
            onChange={() => {}}
          >
            <option value="">Joined</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select> */}
          <select
            className="items-stretch w-full sm:w-[10.5rem] border-[color:var(--Grey-Grey-3,#E4E5E6)] flex gap-2.5 px-4 py-3.5 rounded-xl border-2 border-solid"
            onChange={() => {}}
          >
            <option value="">Status</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        </div>
      </div>
      {livestock[0] ? <LivestockTable /> : <EmptyState />}
    </span>
  );
};

export default Livestock;
