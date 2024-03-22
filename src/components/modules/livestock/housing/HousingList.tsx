import React, { useEffect, useState } from "react";
import HousingCard from "./HousingCard";
import { getLivestockHousing } from "@/services/livestockService";
import { AcreLoader } from "@/components/common/ui/acreLoader";
import { NoResourcesCard } from "../../../common/inactiveComponentStates";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Select } from "antd";
import {Button} from "rizzui";

const { Option } = Select;
const Housing = () => {
  const [housingData, setHousingData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getLivestockHousing().then((data) => {
      setHousingData(data);
      setLoading(false);
    });
  }, []);

  const EmptyState = () => {
    return (
      <NoResourcesCard
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/bd51dbfefabec61626aceec83bcbea198f0cbbf004dcb1e0ff1c5ed65f6f2d2c?"
        imageAlt="No housing image"
        infoText="You have not created have any housing for your  yet. Click on the button below to get started"
      />
    );
  };

  const housingList = () => {
    return (
      <div className="p-6">

        
          <div className="flex justify-between items-center w-full max-md:max-w-full max-md:flex-wrap ">
            <h1 className="text-2xl font-bold pl-4 text-gray-800">Housing</h1>
            <Button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500">
              <PlusIcon className="h-5 w-5" />
              Add Housing
            </Button>
          </div>
        


        <div className="justify-between items-center flex w-full gap-5  max-md:max-w-full max-md:flex-wrap p-4">
          <div className="w-full md:w-72 p-2 flex gap-3 items-center border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            <input
              id="search"
              type="text"
              placeholder="Search..."
              className="w-full border-none outline-none"
            />
          </div>

          <div className="justify-between sm:ml-8 max-md:w-full items-stretch flex gap-5   max-md:max-w-full max-md:flex-wrap">
            <Select className="w-full sm:w-[10.5rem] flex px-4 py-4 rounded-xl border-2 border-solid">
              <Option value="">Livestock - All</Option>
            </Select>
            <Select className="items-stretch w-full sm:w-[10.5rem] flex gap-2.5 px-4 py-4 rounded-xl border-2 border-solid">
              <Option value="">Housing Type - All</Option>
            </Select>
            <Select className="items-stretch w-full sm:w-[10.5rem]  flex gap-2.5 px-4 py-3.5 rounded-xl border-2 border-solid">
              <Option value="">Quantity - ALL</Option>
             
            </Select>
          </div>
        </div>
        {housingData.map((housing: any) => (
          <HousingCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/1e66db5dd048e84db4e051b5b791d95d19c683293a9e470e0540c531fd532f00?apiKey=33b7de9dd450419096342a2b77215ab6&"
            imageAlt={housing.name + " image"}
            info={{
              name: housing.name,
              totalCount: housing.total_livestock_count,
              housingType: "Shed",
              description: housing.description,
              icons: [
                {
                  src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4435fc71ddacf14e31ee808d2555371456a52593ec599d8939b2c6bc02661a95?apiKey=33b7de9dd450419096342a2b77215ab6&",
                  alt: "icon",
                },
                {
                  src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5f31f01df7e07e14f4f54fa72e5ade6e0be84d0459f28c68c22a5d0f0ce955c8?apiKey=33b7de9dd450419096342a2b77215ab6&",
                  alt: "icon",
                },
              ],
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <AcreLoader text="Loading your livestock housing..." />
      ) : housingData[0] ? (
        housingList()
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Housing;
