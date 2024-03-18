import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Input } from "@/components/common/ui/input";
import { Button as Btn } from "rizzui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { Button } from "../../../../common/ui/button";
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
} from "@/components/common/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "../../../../common/ui/dialog";
import { Label } from "@/components/common/ui/label";
import { getFarmFeed } from "@/services/livestockService";
import { Form, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeasuringUnitSelect } from "../../../../common/forms/acreSelect";
import HttpService from "@/services/HttpService";
import { API_URL } from "@/config";
import { getActiveFarm } from "@/services/farmService";
import { toast } from "sonner";
import { Controller } from "react-hook-form";
import * as z from "zod";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { ApiResponse, Feeds } from "@/helpers/types";
import CustomTooltip from "@/components/common/CustomTooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
// import { DatePicker } from "@/components/common/ui/datepicker";
import DatePicker from "react-datepicker";
import { Checkbox } from "@/components/common/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/common/ui/form";
import { FiClock } from "react-icons/fi";

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

  const initialDate = new Date();
  initialDate.setHours(8);
  initialDate.setMinutes(0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); 
  };



 const CustomInput = ({ value, onClick }: { value: any; onClick: any }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly
      style={{ cursor: "pointer" }}
      className="w-full p-2 border border-gray-300 mt-1 rounded-md pl-10" 
    />
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <FiClock className="text-gray-400" /> 
    </div>
  </div>
);

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

  useEffect(() => {}, [rationName, formError, selectedUnit]);

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
        <DialogTitle className="mb-2 flex justify-between items-center">
          <div className="flex items-center">
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
            <div className="ml-2">
              <CustomTooltip
                triggerText={
                  <IoMdInformationCircleOutline className="w-8 h-6" />
                }
                tooltipContent={
                  <p>
                    Enter a unique name for the ration. This helps you identify
                    and manage different feeding rations easily.
                  </p>
                }
              />
            </div>
          </div>

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
            <div className="flex items-center">
              <Label htmlFor="feedName">Feed Name or ID</Label>
              <div className="ml-2">
                <CustomTooltip
                  triggerText={
                    <IoMdInformationCircleOutline className="w-8 h-6" />
                  }
                  tooltipContent={
                    <p>
                      Choose which feed to include in the ration. This
                      determines what your livestock will be fed.
                    </p>
                  }
                />
              </div>
            </div>

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

          <div className="flex flex-col space-y-1.5 ">
            <div className="flex items-center">
              <Label htmlFor="feedName">Daily Ration</Label>
              <div className="ml-2">
                <CustomTooltip
                  triggerText={
                    <IoMdInformationCircleOutline className="w-8 h-6" />
                  }
                  tooltipContent={
                    <p>
                      Specify the weight of the selected feed for this ration.
                      This determines how much of the feed will be given to each
                      animal.
                    </p>
                  }
                />
              </div>
            </div>
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
          <div className="flex flex-col">
            <div className="flex items-center">
              {/* Label */}
              <Label htmlFor="feedName">Set Livestock Feeding Time</Label>

              {/* Tooltip */}
              <span className="flex items-center ml-2">
                <CustomTooltip
                  triggerText={
                    <IoMdInformationCircleOutline className="w-8 h-6" />
                  }
                  tooltipContent={
                    <p>
                      Set the time for the feeding schedule. This determines
                      when the ration should be given to your livestock.
                    </p>
                  }
                />
              </span>
            </div>

            {/* DatePicker */}
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
              customInput={<CustomInput value={undefined} onClick={undefined} />}
            />
          </div>

          <div className="bg-[#EAF8F2] p-3 rounded-lg">
            <div className="flex flex-col items-start space-y-1">
              <h1 className="font-semibold">Feeding Schedule</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-[10rem]">
                  {/* Checkbox and text on the left */}
              <div className="flex items-center space-x-2">
  <Checkbox defaultChecked />
  <span className="text-sm font-normal leading-none whitespace-nowrap">
    Activate Feeding Schedule
  </span>
</div>


                  {/* Tooltip on the right */}
                  <div>
                    <CustomTooltip
                      triggerText={
                        <IoMdInformationCircleOutline className="w-8 h-6" />
                      }
                      tooltipContent={
                        <p>
                          Check this box to activate the feeding schedule
                          immediately after creation. If checked, the schedule
                          will be applied to your livestock.
                        </p>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-1">
              <h1 className="font-semibold pt-1">Apply feeding ration to:</h1>
              <div className="flex items-center justify-between gap-[8rem]">
                {/* Checkbox and text on the left */}
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked />
                  <span className="text-sm font-normal leading-none">
                    All livestock in the ration group
                  </span>
                </div>

                {/* Tooltip on the right */}
                <div>
                  <CustomTooltip
                    triggerText={
                      <IoMdInformationCircleOutline className="w-8 h-6" />
                    }
                    tooltipContent={
                      <p>
                        Apply this schedule to all livestock with the same type
                        and maturity level as the current one. This saves time
                        by automatically setting up feeding schedules for
                        similar livestock
                      </p>
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-10">
                {/* Checkbox and text on the left */}
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm font-medium leading-none">
                    All livestock in “Mcdonald Stable 1” housing
                  </span>
                </div>

                {/* Tooltip on the right */}
                <div>
                  <CustomTooltip
                    triggerText={
                      <IoMdInformationCircleOutline className="w-8 h-6" />
                    }
                    tooltipContent={
                      <p>
                        Apply this schedule to all livestock in the same housing
                        or location as the current one. This ensures consistent
                        feeding across all animals in the same area.
                      </p>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* error pane */}
        {formError !== "" && (
          <div className="flex justify-center mt-3 items-center">
            <span className="text-red-600 ">{formError}</span>
          </div>
        )}

        <CardFooter className="flex justify-between mt-6 gap-9">
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
