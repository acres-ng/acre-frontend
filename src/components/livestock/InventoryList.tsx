import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Input as Rizzput } from "rizzui";
import {
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InventoryTable from "./InventoryTable";
import { getFarmFeed } from "@/services/livestockService";
import HttpService from "@/services/HttpService";
import { API_URL } from "@/config";
import { getActiveFarm } from "@/services/farmService";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormData {
  name: string;
  unit_weight: number;
  weight_measuring_unit: string;
  ingredients: any;
  unit_Price: number;
}

const feedSchema = z.object({
  name: z.string(),
  unit_weight: z.number(),
  weight_measuring_unit: z.string(),
  ingredients: z.any(),
  unit_Price: z.number(),
});

const InventoryList = () => {
  const [quantityState, setQuantityState] = useState(0);
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const feedForm = useForm<FormData>({
    resolver: zodResolver(feedSchema),
    defaultValues: {
      name: "",
      unit_weight: 0,
      weight_measuring_unit: "kg",
      ingredients: "",
      unit_Price: 0,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof feedSchema>> = async (data) => {
    try {
      const userActiveFarmId = getActiveFarm().id;
      const response = await HttpService.post(
        `${API_URL}farms/${userActiveFarmId}/feeds`,
        data,
        HttpService.getDefaultOptions()
      );

     
      if (response.data) {
        toast.success("Feed added successfully!");
      } else {
        toast.error("Failed to add feed. Please try again.");
      }

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
      throw error;
    }
  };

  useEffect(() => {
    getFarmFeed().then((res) => {
      setFeedData(res);
      setLoading(false);
    });
  }, []);

  const AddInventoryFeedDialog = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"default"} className="top-5 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Feed
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Feed</DialogTitle>
          </DialogHeader>
          <Form {...feedForm}>
            <form onSubmit={feedForm.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Feed Name or ID</Label>
                  <Input
                    id="name"
                    placeholder="eg Ultima DIY"
                    {...feedForm.register("name")}
                  />
                  {feedForm.formState.errors.name && (
                    <span>{feedForm.formState.errors.name.message}</span>
                  )}
                </div>
                <div className="flex space-x-4 pt-2">
                  <span className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="unitWeight">Unit Weight</Label>
                    <InputGroup>
                      <Input
                        placeholder="Enter weight"
                        className="text-center"
                        id="unitWeight"
                        type="number"
                        {...feedForm.register("unit_weight", {
                          setValueAs: (value: string) => parseInt(value) || 0, // Parse value to integer or default to 0
                        })}
                      />
                      {feedForm.formState.errors.unit_weight && (
                        <span>
                          {feedForm.formState.errors.unit_weight.message}
                        </span>
                      )}
                      <InputRightElement width={"4rem"}>
                        <Select>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kg</SelectItem>
                            <SelectItem value="g">Gm</SelectItem>
                          </SelectContent>
                        </Select>
                      </InputRightElement>
                    </InputGroup>
                  </span>
                  <span className="flex flex-col space-y-1.5 w-full">
                    <Rizzput
                      label="Quantity to Stock"
                      type="number"
                      min={0}
                      step={1}
                      value={quantityState}
                      onChange={(e) => {
                        // feedForm.setValue("unit_Price", Number(e.target.value));
                        setQuantityState(Number(e.target.value));
                      }}
                      suffix={
                        <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                          <button
                            type="button"
                            className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                            onClick={() => {
                              // feedForm.setValue("unit_Price", feedForm.getValues().unit_Price - 1);
                              setQuantityState((prevState) => prevState + 1);
                            }}
                          >
                            <ChevronUpIcon className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                            onClick={() => {
                              // feedForm.setValue("unit_Price", feedForm.getValues().unit_Price - 1);
                              setQuantityState((prevState) => prevState - 1);
                            }}
                          >
                            <ChevronDownIcon className="h-3 w-3" />
                          </button>
                        </div>
                      }
                    />
                  </span>
                </div>
                <div className="flex flex-col space-y-1.5 pt-2">
                  <Label htmlFor="unitPrice">Current price per Unit</Label>
                  <InputGroup>
                    <Input
                      placeholder="Enter price"
                      className="text-center"
                      id="unitPrice"
                      type="number"
                      {...feedForm.register("unit_Price", {
                        setValueAs: (value: string) => parseInt(value) || 0,
                      })}
                    />
                    {feedForm.formState.errors.unit_Price && (
                      <span>
                        {feedForm.formState.errors.unit_Price.message}
                      </span>
                    )}
                    <InputLeftElement width={"8rem"}>
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NGN">NGN</SelectItem>
                          <SelectItem value="Gram">Gram</SelectItem>
                        </SelectContent>
                      </Select>
                    </InputLeftElement>
                  </InputGroup>
                </div>
              </div>
              <CardFooter className="flex justify-between">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button
                  type="submit"
                  disabled={feedForm.formState.isSubmitting}
                >
                  Save Feed
                </Button>
              </CardFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };

  const TableInventory = () => {
    return (
      <div className="w-full">
        <InventoryTable data={feedData} />
      </div>
    );
  };

  const EmptyState = () => {
    return (
      <div className="items-stretch bg-white flex flex-col pt-6 pb-12 px-8 max-md:px-5 m-5">
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
          {/* <div className="text-white text-sm font-semibold self-center grow whitespace-nowrap my-auto">
            {<AddLivestockDialog />}
          </div> */}
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="justify-between self-stretch flex w-full gap-5 items-center max-md:max-w-full max-md:flex-wrap">
        <div className="text-black text-2xl font-semibold pt-4">
          Feed Inventory List
        </div>
        {feedData[0] ? <AddInventoryFeedDialog /> : null}
      </div>

      <div className="justify-between items-stretch flex w-full gap-5 mt-6 max-md:max-w-full max-md:flex-wrap pr-4">
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

      <TableInventory />
      {/* {feedData[0] ? <TableInventory /> : <EmptyState />} */}
    </>
  );
};

export default InventoryList;
