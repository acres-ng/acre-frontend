import React from "react";
import UsersTable from "./UsersTable";
import { usersData } from "./users-data";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Input as Rizzput } from "rizzui";
import { InputGroup, InputRightElement, InputLeftElement} from "@chakra-ui/react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing } from "lucide-react";
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

const InventoryList = () => {
  const [state, setState] = useState(0);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"default"} className="top-5">
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
            {/* <PlusIcon className="h-5 w-5 mr-2" /> */}
            Add Feed
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Feed</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Feed Name or ID</Label>
                <Input id="name" placeholder="eg Ultima DIY" />
              </div>

              <div className="flex space-x-4 pt-2">
                {/* Livestock Type */}
                <span className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="livestock-type">Unit Weight</Label>
                  <Select
                    defaultValue="kg"
                    // onValueChange={(value) => {
                    //   livestockForm.setValue(
                    //     "measuring_unit",
                    //     value
                    //   );
                    // }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">0</SelectItem>
                      <SelectItem value="g">Gram</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <Select>
                    <SelectTrigger id="livestock-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select> */}
                </span>

                {/* Livestock Maturity */}
                <span className="flex flex-col space-y-1.5 w-full">
                  <Rizzput
                    label="Quantity to Stock"
                    type="number"
                    min={0}
                    step={1}
                    value={state}
                    onChange={(e) => setState(Number(e.target.value))}
                    suffix={
                      <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                        <button
                          type="button"
                          className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                          onClick={() => setState((prevState) => prevState + 1)}
                        >
                          <ChevronUpIcon className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                          onClick={() => setState((prevState) => prevState - 1)}
                        >
                          <ChevronDownIcon className="h-3 w-3" />
                        </button>
                      </div>
                    }
                  />
                  {/* <Select>
          <SelectTrigger id="livestock-maturity">
            <SelectValue placeholder="Select maturity" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="sveltekit">SvelteKit</SelectItem>
            <SelectItem value="astro">Astro</SelectItem>
            <SelectItem value="nuxt">Nuxt.js</SelectItem>
          </SelectContent>
        </Select> */}
                </span>
              </div>

              <div className="flex flex-col space-y-1.5 pt-2">
                <InputGroup>
                  <Input placeholder="Enter weight"  className="text-center"/>
                  <InputLeftElement width={"8rem"}>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram</SelectItem>
                        <SelectItem value="g">Gram</SelectItem>
                      </SelectContent>
                    </Select>
                  </InputLeftElement>
                </InputGroup>

                {/* <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Enter Quantity" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </div>
          </form>
          <CardFooter className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel   </Button>
            </DialogClose> 
            <Button>Save Feed</Button>
          </CardFooter>
        </DialogContent>
      </Dialog>


      <InventoryTable data={usersData} />
    </div>
  );
};

export default InventoryList;
