



import React from "react";
import { Checkbox, CheckboxGroup } from "rizzui";
import {
  InputGroup,
  InputRightElement,
  InputLeftElement,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Label } from "@/components/common/ui/label";
// import { Input } from "@/components/common/ui/input";
import { useState } from "react";
import { Button, Input, Textarea } from "rizzui";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../common/ui/select";
import { CardFooter } from "@/components/common/ui/card";
import { DialogClose } from "@/components/common/ui/dialog";

const VaccinationRecordForm = () => {
  const [state, setState] = useState(0);
  const [values, setValues] = useState(["yes"]);
  return (
    <div>
      <div>
        <Input
          label="Quantity Of Livestock"
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
      </div>

      
      <div className="mt-4">
        <Label htmlFor="daily_ration_weight">Vaccinated From</Label>
        <InputGroup>
          <Input type="tel" placeholder="e.g coccidiosis" className="w-full" />
        </InputGroup>
      </div>

      <div className="mt-4">
        <Label htmlFor="daily_ration_weight">Total AMount Spent</Label>
        <InputGroup>
          <InputLeftAddon>NGN</InputLeftAddon>
          <Input type="tel" placeholder="Enter Price" className="w-full" />
        </InputGroup>
      </div>

      <div className="mt-4">
        <Label htmlFor="daily_ration_weight">Medication Administered</Label>
        <InputGroup>
          <Input type="tel" placeholder="e.g flagyl" className="w-full" />
        </InputGroup>
      </div>

      <div className="mt-4">
        <Label htmlFor="daily_ration_weight">Vet Name or Id</Label>
        <InputGroup>
          <Input type="tel" placeholder="e.g animals bestie" className="w-full" />
        </InputGroup>
      </div>

      <div className="mt-4">
        <Label>Treatment Completed ?</Label>

        <CheckboxGroup
          values={values}
          setValues={setValues}
          className="flex flex-row gap-4"
        >
          <Checkbox label="Yes" value="yes" />
          <Checkbox label="No" value="no" />
        </CheckboxGroup>
      </div>


      <div className="flex flex-col space-y-1.5 mt-4">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea id="notes" placeholder="Write Something" />
      </div>

      <CardFooter className="flex  gap-12 mt-4">
        <DialogClose asChild>
          <Button variant="outline" className="w-full">Cancel</Button>
        </DialogClose>

        <Button type="submit" className="w-full bg-green-400 text-white">Save</Button>
      </CardFooter>
    </div>
  );
};

export default VaccinationRecordForm;
