import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button as Btn } from "rizzui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@/components/ui/label";
import { getFarmFeed } from "@/services/livestockService";
import { Form, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeasuringUnitSelect } from "../FormInput/AcreSelect";
import HttpService from "@/services/HttpService";
import { API_URL } from "@/config";
import { getActiveFarm } from "@/services/farmService";
import { toast } from "sonner";
import * as z from "zod";

type FeedItem = {
  value: string;
  label: string;
};

interface SetFeedRationProps {
  row: any;
  onRationCreated: () => void; // Accepts one argument of type any
}

interface FormData {
  feed_id: string;
  dailyRation: number;
  editedName: string;
}

// const setRationSchema = z.object({
//   feedName: z.string(),
//   dailyRation: z.number(),
// });
const setRationSchema = z.object({
  feed_id: z.string().nonempty(), // Required field
  dailyRation: z.number(),
  editedName: z.string().nonempty(), // Required field
});

const SetFeedRation: React.FC<SetFeedRationProps> = ({
  row,
  onRationCreated,
}) => {
  const [feedNames, setFeedNames] = useState<string[]>([]);
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>("");
  const [selectedMeasuringUnit, setSelectedMeasuringUnit] =
    useState<string>("");

  const handleMeasuringUnitSelect = (value: string) => {
    setSelectedMeasuringUnit(value);
  };

  const rationForm = useForm<FormData>({
    resolver: zodResolver(setRationSchema),
    defaultValues: {
      feed_id: "",
      dailyRation: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any[] = await getFarmFeed();
        const names: string[] = data.map((feed) => feed.name);
        setFeedNames(names);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFeedSelection = (value: string) => {
    rationForm.setValue("feed_id", value);
    setSelectedFeed(value);
    setEditedName(value);
  };

  const handleEditName = () => {
    setEditMode(true);

    setEditedName(
      selectedFeed
        ? `${selectedFeed}-${row.animal_type}-${row.maturity_public_name}`
        : row.animal_type
    );
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const onSubmit: SubmitHandler<z.infer<typeof setRationSchema>> = async (
    data,
    uuid
  ) => {
    try {
      if (!data.dailyRation) {
        toast.error("Daily Ration is required.");
        return;
      }
      const userActiveFarmId = getActiveFarm().id;
      const measuringUnit = selectedMeasuringUnit;

      const postData = {
        name: editedName,
        feed_id: data.feed_id,
        animal_type: 1,
        animal_maturity: 7,
        daily_ration_weight: data.dailyRation,
        weight_measuring_unit: measuringUnit,
      };
      const response = await HttpService.put(
        `${API_URL}farms/${userActiveFarmId}/livestock/${uuid}`,
        postData,
        HttpService.getDefaultOptions()
      );

      if (response.data) {
        toast.success("Ration added successfully!");
        onRationCreated();
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

  return (
    <div>
      <Form {...rationForm}>
        <DialogTitle className="mb-6 flex justify-between items-center">
          <span className="text-green-500">
            {editMode ? (
              <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
              />
            ) : (
              <>
                {selectedFeed &&
                  `${editedName || selectedFeed}-${row.animal_type} -${
                    row.maturity_public_name
                  }`}
                {!selectedFeed &&
                  `${row.animal_type}-${row.maturity_public_name}`}
              </>
            )}
          </span>

          <span className="material-icons" onClick={handleEditName}>
            <CiEdit />
          </span>
        </DialogTitle>

        {editMode && (
          <div>
            <Label htmlFor="editedName">Edit Ration Name</Label>
            <Input
              type="text"
              id="editedName"
              value={editedName}
              onChange={handleNameChange}
            />
          </div>
        )}
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5 mt-3">
            <Label htmlFor="feedName">Feed Name or ID</Label>
            <Select
              {...rationForm.register("feed_id")}
              onValueChange={(value: string) => handleFeedSelection(value)}
            >
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select Feed" />
              </SelectTrigger>
              <SelectContent position="popper">
                {feedNames.map((name, index) => (
                  <SelectItem key={index} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {rationForm.formState.errors.feed_id && (
              <span>{rationForm.formState.errors.feed_id.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5 pt-2">
            <Label htmlFor="dailyRation">Daily Ration</Label>
            <InputGroup>
              <Input
                placeholder="Enter Ration"
                className="text-center"
                id="dailyRation"
                type="number"
                {...rationForm.register("dailyRation", {
                  setValueAs: (value: string) => parseInt(value) || 0,
                })}
              />
              {rationForm.formState.errors.dailyRation && (
                <span>{rationForm.formState.errors.dailyRation.message}</span>
              )}
              <InputRightElement width={"6rem"}>
                <MeasuringUnitSelect
                  onchange={(value: string) => {
                    // Handle measuring unit selection
                    handleMeasuringUnitSelect(value);
                    rationForm.setValue("dailyRation", parseInt(value));
                  }}
                />
              </InputRightElement>
            </InputGroup>
          </div>
        </div>

        <div className="flex  mt-8 gap-[20px]">
          <DialogClose asChild>
            <Btn className="w-full text-black border-[3px]border-gray-200">
              Cancel
            </Btn>
          </DialogClose>

          <Button
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              onSubmit(rationForm.getValues(), row.uuid);
            }}
          >
            Save Ration
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SetFeedRation;
