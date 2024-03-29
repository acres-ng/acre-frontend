import { Button } from "../../common/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/ui/dialog";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/common/ui/card";
import { BellRing } from "lucide-react";
import { cn } from "@/helpers/utils";
import { useNavigate } from "react-router-dom";
import {
  getAnimals,
  getFarmLivestock,
  getLivestockHousing,
} from "@/services/livestockService";
import { useCallback, useEffect, useState } from "react";
import { AcreLoader } from "../../common/ui/acreLoader";
import LivestockDataTable from "./LivestockDataTable";
import { getAnimalLocal } from "@/services/localCacheService";
import { Select } from "antd";
import { NoFilterResultsCard, NoResourcesCard } from "../../common/inactiveComponentStates";

const { Option } = Select;

const LivestockDashboard = () => {
  const navigate = useNavigate();

  const [livestock, setLivestockData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [animalTypes, setAnimalTypes] = useState([]);
  const [housing, setHousing] = useState([]);
  const [filterValue, setFilterValue] = useState({
    animal: "",
    housing: "",
    management: "",
    search: "",
  });
  const [filterApplied, setFilterApplied] = useState(false);
  const handleRationCreated = async () => {
    try {
      const updatedData = await getFarmLivestock();
      setLivestockData(updatedData);
      setLoading(false);
    } catch (error) {
      console.error("Error updating livestock data:", error);
    }
  };

  useEffect(() => {
    getAnimals(undefined, "maturity,breeds").then(() => {
      const animals = (getAnimalLocal()?.animals || []).map((animal: any) => {
        return {
          label: animal?.name,
          value: animal?.id,
        };
      });
      setAnimalTypes(animals);
    });
    getLivestockHousing().then((data) => {
      const housings = (data || []).map((housing: any) => {
        return {
          label: housing?.name,
          value: housing?.id,
        };
      });
      setHousing(housings);
    });
  }, []);

  useEffect(() => {
    const query = [];
    if (filterValue.housing) {
      query.push(`housingId=${filterValue.housing}`);
    }
    if (filterValue.animal) {
      query.push(`animalType=${filterValue.animal}`);
    }
    if (filterValue.management) {
      query.push(`managementType=${filterValue.management}`);
    }
    if (filterValue.search) {
      query.push(`search=${filterValue.search}`);
    }

    const queryString = query.join("&");

    getFarmLivestock(undefined, queryString).then((res) => {
      setLivestockData(res);
      setLoading(false);
    });
  }, [filterValue]);

  const handlefilterSelect = (name: string, value: any) => {
    setFilterValue({
      ...filterValue,
      [name]: value,
    });
    setFilterApplied(true);
  };

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

  interface IProp {
    onRationCreated: () => Promise<void>;
  }

  const LivestockTable = () => {
    return (
      <div className="w-full">
        <LivestockDataTable
          handleRationCreated={handleRationCreated}
          data={livestock}
        />
      </div>
    );
  };

  const EmptyState = () => {
    return (
      <NoResourcesCard
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/bd51dbfefabec61626aceec83bcbea198f0cbbf004dcb1e0ff1c5ed65f6f2d2c?"
        imageAlt="No resources to show image"
        infoText="You don’t have any livestock in your farm yet. Click on the button below to start adding livestock to your farm"
        actionButton={<AddLivestockDialog />}
      />
    );
  };

  const NoResultsState = () => {
    return (
      <NoFilterResultsCard
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/bd51dbfefabec61626aceec83bcbea198f0cbbf004dcb1e0ff1c5ed65f6f2d2c?"
        imageAlt="No resources to show image"
        infoText=" We did not find any livestock that matches your search criteria."
      />
    );
  };

  const handleReset = () => {
    setFilterValue({
      animal: "",
      housing: "",
      management: "",
      search: "",
    });
    const searchField = document.getElementById("search") as HTMLInputElement;
    searchField.value = "";
    setFilterApplied(false);
  };

  return (
    <div className="bg-white flex flex-col pt-6 pb-12 px-8 max-md:px-5">
      {isLoading ? <AcreLoader /> : null}

      <div className="justify-between self-stretch flex w-full gap-5 items-center max-md:max-w-full max-md:flex-wrap">
        <div className="text-black text-2xl font-semibold">Livestock</div>
        <AddLivestockDialog />
      </div>

      <div className="justify-between items-center flex w-full gap-5 mt-6 max-md:max-w-full max-md:flex-wrap">
        <div className="w-full md:w-72 p-2 flex gap-3 items-center border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            id="search"
            type="text"
            placeholder="Search..."
            className="w-full border-none outline-none"
            onChange={(e) => {
              if (e.target.value.trim()) {
                handlefilterSelect("search", e.target.value);
              }
            }}
          />
        </div>

        <div className="justify-between sm:ml-8 max-md:w-full items-stretch flex gap-5   max-md:max-w-full max-md:flex-wrap">
          {(filterValue.animal ||
            filterValue.housing ||
            filterValue.management ||
            filterValue.search) && (
            <div className="flex items-end">
              <span
                className="mb-0 text-red-500 hover:underline"
                onClick={handleReset}
              >
                Clear filters
              </span>
            </div>
          )}
          <Select
            className="w-full sm:w-[10.5rem] flex px-4 py-4 rounded-xl border-2 border-solid"
            onChange={(e) => handlefilterSelect("housing", e)}
            value={filterValue.housing}
          >
            <Option value="">Housing - All</Option>
            {housing.map((item: any, index) => (
              <Option key={index} value={item?.value}>
                {item?.label}
              </Option>
            ))}
          </Select>
          <Select
            className="items-stretch w-full sm:w-[10.5rem] flex gap-2.5 px-4 py-4 rounded-xl border-2 border-solid"
            onChange={(e) => handlefilterSelect("animal", e)}
            value={filterValue.animal}
          >
            <Option value="">Animal Type - All</Option>
            {animalTypes.map((item: any, index) => (
              <Option key={index} value={item?.value}>
                {item?.label}
              </Option>
            ))}
          </Select>
          <Select
            className="items-stretch w-full sm:w-[10.5rem]  flex gap-2.5 px-4 py-3.5 rounded-xl border-2 border-solid"
            onChange={(e) => handlefilterSelect("management", e)}
            value={filterValue.management}
          >
            <Option value="">Management Type - ALL</Option>
            <Option value="single">Single</Option>
            <Option value="flock">Flock</Option>
          </Select>
        </div>
      </div>
      {livestock[0] ? (
        <LivestockTable />
      ) : filterApplied ? (
        <NoResultsState />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default LivestockDashboard;
