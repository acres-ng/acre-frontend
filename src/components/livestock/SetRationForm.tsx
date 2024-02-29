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
import { ApiResponse, Feeds } from "@/lib/types";

interface SetFeedRationProps {
  row: any;
  onRationCreated: () => void;
}

const setRationSchema = z.object({
  name: z.string().min(1, { message: "The Name field is required" }),
  feed_id: z.string().min(1, { message: "The feed field is required" }),
  daily_ration_weight: z
    .number()
    .min(0.1, { message: "The ration weight must be greater than 0" }),
  animal_type: z.number().min(1),
  animal_maturity: z.number().min(1),
  weight_measuring_unit: z.string().min(1),
});

const SetFeedRation: React.FC<SetFeedRationProps> = ({
  row,
  onRationCreated,
}) => {
  const rationAutoName = `${row.animal_type}-${row.maturity_public_name}`;
  const [feedData, setFeedData] = useState<Feeds[]>([]);
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [rationName, setRationName] = useState<string>(rationAutoName);
  const [formError, setFormError] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");

  const fetchFeedData = async () => {
    try {
      const data: any[] = await getFarmFeed();
      const feeds: Feeds[] = data.map((feed) => {
        return {
          id: feed.id,
          name: feed.name,
        };
      });
      setFeedData(feeds);
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  const rationForm = useForm<z.infer<typeof setRationSchema>>({
    resolver: zodResolver(setRationSchema),
    defaultValues: {
      feed_id: "",
      name: rationAutoName,
      daily_ration_weight: 1.0,
      animal_type: row.animal_id,
      animal_maturity: row.maturity_id,
      weight_measuring_unit: selectedUnit,
    },
  });

  useEffect(() => {
    fetchFeedData();
    rationForm.setValue("animal_maturity", parseInt(row.maturity_id));
    rationForm.setValue("animal_type", parseInt(row.animal_id));
  }, []);

  useEffect(() => {
  }, [rationName, formError, selectedUnit]);

  const handleFeedSelection = (value: string) => {
    rationForm.setValue("feed_id", value);
    const feedItem = feedData.find((feed) => feed.id === value);
    setSelectedFeed(feedItem!.name);
    if (!editMode) {
      const updatedRationName = feedItem!.name + "-" + rationAutoName;
      setRationName(updatedRationName);
      rationForm.setValue("name", updatedRationName);
    }
  };

  const handleEditName = () => {
    setEditMode(true);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRationName(event.target.value);
    rationForm.setValue("name", event.target.value);
  };

  const onSubmit: SubmitHandler<z.infer<typeof setRationSchema>> = async (
    postData
  ) => {
    try {
      const userActiveFarmId = getActiveFarm().id;
      const { data } = await HttpService.post(
        `${API_URL}farms/${userActiveFarmId}/rations`,
        postData,
        HttpService.getDefaultOptions()
      );

      if (data.data && data.status === "success") {
        toast.success(data.message);
        onRationCreated();
      } else {
        toast.error(data.message);
      }
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
                value={rationName}
                onChange={handleNameChange}
              />
            ) : (
              <>{rationName}</>
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
              value={rationName}
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
                {feedData.map((feed, index) => (
                  <SelectItem key={index} value={feed.id}>
                    {feed.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {rationForm.formState.errors.feed_id && (
              <span>{rationForm.formState.errors.feed_id.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5 pt-2">
            <Label htmlFor="daily_ration_weight">Daily Ration</Label>
            <InputGroup>
              <Input
                placeholder="Enter Ration"
                className="text-center"
                id="daily_ration_weight"
                type="number"
                {...rationForm.register("daily_ration_weight", {
                  setValueAs: (value: string) => parseFloat(value) || 0,
                })}
              />
              {rationForm.formState.errors.daily_ration_weight && (
                <span>
                  {rationForm.formState.errors.daily_ration_weight.message}
                </span>
              )}
              <InputRightElement width={"6rem"}>
                <MeasuringUnitSelect
                  onchange={(value: string) => {
                    setSelectedUnit(value);
                    rationForm.setValue("weight_measuring_unit", value);
                  }}
                />
              </InputRightElement>
            </InputGroup>
          </div>
        </div>

        {/* error pane */}
        {formError !== "" && (
          <div className="flex justify-center mt-3 items-center">
            <span className="text-red-600 ">{formError}</span>
          </div>
        )}

        <CardFooter className="flex justify-between mt-8 gap-9">
          <DialogClose asChild>
            <Btn className="w-full text-black border-[3px]border-gray-200">
              Cancel
            </Btn>
          </DialogClose>

          <Button
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              try {
                setFormError("");
                setRationSchema.parse(rationForm.getValues());
                onSubmit(rationForm.getValues());
              } catch (error) {
                if (error instanceof z.ZodError) {
                  console.error(error.errors);
                  setFormError(error.errors[0].message);
                }
                return;
              }
            }}
          >
            Save Ration
          </Button>
        </CardFooter>
      </Form>
    </div>
  );
};

export default SetFeedRation;
