import * as React from "react";
import { Button } from "@/components/ui/button";
import { RiExchangeDollarLine } from "react-icons/ri";
import { Button as Btn } from "rizzui";
import { Textarea } from "@/components/ui/textarea";
import {
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "../ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BiSolidBowlRice } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MeasuringUnitSelect } from "../FormInput/AcreSelect";

const RecordSale = () => {
  return (
    <div className=" rounded-2xl">
      <CardHeader>
        <CardTitle className="flex">
          <span className="mr-2 bg-[#CCE6DA]  border-b rounded-full p-2">
            <RiExchangeDollarLine className="text-green-500" />
          </span>
          <span className="mt-2">Add Sale Transaction</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 pt-2">
              <Label htmlFor="dailyRation">Amount</Label>
              <InputGroup>
                <Input
                  placeholder="Enter Ration"
                  className="text-center"
                  id="dailyRation"
                  type="number"
                />
                <InputLeftElement width={"6rem"}>
                  <MeasuringUnitSelect
                    onchange={(value: string) => {
                      // Handle measuring unit selection
                    }}
                  />
                </InputLeftElement>
              </InputGroup>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Quantity</Label>
              <Input id="name" placeholder="Enter Quantity" />
            </div>
            <div className="flex flex-col space-y-1.5 pt-2">
              <Label htmlFor="framework">Description</Label>
              <Input id="name" placeholder="Enter Transaction Description" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Notes</Label>
              <Textarea placeholder="Write Something" />
            </div>

            <div className="flex  mt-8 gap-[20px]">
              <DialogClose asChild>
                <Btn className="w-full text-black border-[3px]border-gray-200">
                  Cancel
                </Btn>
              </DialogClose>

              <Button className="w-full">Save Transaction</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default RecordSale;
