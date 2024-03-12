import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/common/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/ui/form";
import { Input } from "@/components/common/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../common/ui/select";
import { getAnimalLocal as getAnimalsLocal } from "@/services/localCacheService";
import { useEffect, useState } from "react";
import { Animal, AnimalBreed, AnimalWithTraits } from "@/lib/types";
import {
  InputGroup,
  InputRightElement,
  NumberIncrementStepperProps,
} from "@chakra-ui/react";
import {
  getLivestockHousing,
  getOneFarmLivestock,
} from "@/services/livestockService";
import { toast } from "sonner";
import { API_URL } from "@/config";
import { getActiveFarm } from "@/services/farmService";
import HttpService from "@/services/HttpService";
import SucessDialogue from "./SucessDialogue";

interface AddQuantityFieldProps {
  livestockForm: {
    control: any;
  };
}

const livestockSchema = z.object({
  animal_type: z.number(),
  breed: z.number(),
  sex: z.string().min(1),
  housing_id: z.string().min(1),
  weight: z
    .number()
    .min(0.1)
    .refine((value) => value !== 0, {
      message: "Weight must be greater than zero.",
    }),

  // age: z.number().min(1).optional(),
  age: z.number().min(1),
  combinedAgeInDays: z.number().int().optional(),
  ageUnit: z.string().min(1).optional(),
  status: z.string().min(1).nullable(),
  measuring_unit: z.string().min(1),
  price: z.number(),
  date_of_stocking: z.string().refine(
    (value) => {
      const currentDate = new Date();
      const inputDate = new Date(value);
      // Check if inputDate is not in the future
      return !isNaN(inputDate.getTime()) && inputDate <= currentDate;
    },
    {
      message:
        "Please enter a valid date of stocking that is today or earlier.",
    }
  ),

  quantity: z
    .number()
    .int()
    .refine((value) => value > 1, {
      message: "Quantity must be greater than 1.",
    }),

  // quantity: z.number()
});

type LiveStockHousing = { id: string; name: string; type?: string };

const Edit = () => {
  const location = useLocation();
  const { id } = useParams();
  const { uuid } = useParams();

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const animalsList: Animal[] = getAnimalsLocal()?.animals;
  const [housingData, setHousingData] = useState<LiveStockHousing[]>();

  const [animalTraits, setAnimalTraits] = useState<AnimalWithTraits>({
    animals: [],
    breeds: [],
  });
  const [ageUnit, setAgeUnit] = useState("days");

  const [entryType, setEntryType] = useState<"single" | "flock" | "">("");

  useEffect(() => {
    getLivestockHousing().then((housing) => {
      setHousingData(housing);
    });
  }, []);

  const livestockForm = useForm<z.infer<typeof livestockSchema>>({
    resolver: entryType === "single" ? undefined : zodResolver(livestockSchema),
    // resolver: zodResolver(livestockSchema),
    defaultValues: {
      weight: 0,
      age: 0,
      measuring_unit: "kg",
      price: 0,
      date_of_stocking: new Date().toISOString().split("T")[0],
      quantity: 0,
      ageUnit: "days",
    },
  });

  useEffect(() => {
    getOneFarmLivestock(id!).then((res) => {
      console.log("Res>>", res);
      livestockForm.setValue("weight", res?.weight || 0);
      livestockForm.setValue("age", res?.age || 0);
      livestockForm.setValue("measuring_unit", res?.measuring_unit || "kg");
      livestockForm.setValue("price", res?.price || 0);
      livestockForm.setValue("date_of_stocking", res?.stocking_date || 0);
      livestockForm.setValue("quantity", res?.quantity || 0);
      setEntryType(res?.quantity === 1 ? "single" : "flock");
      livestockForm.setValue("sex", res?.sex || "");
      livestockForm.setValue("housing_id", res?.housing_id || "");
      livestockForm.setValue("animal_type", parseInt(res?.animal_id) || 0);
      livestockForm.setValue("status", res?.status || "");

      const breeds: AnimalBreed[] = getAnimalsLocal().breeds.filter(
        (breed: AnimalBreed) => {
          return breed.animal_type === parseInt(res?.animal_id) || 0;
        }
      );
      const breedObj = breeds.filter((breed: AnimalBreed) => {
        return breed.name === res?.breed;
      })?.[0];

      livestockForm.setValue("breed", breedObj?.id || 0);
      setAnimalTraits({
        ...animalTraits,
        breeds: breeds || [],
      });
    });
  }, []);

  const breedOptions = animalTraits?.breeds.map((breed, index) => (
    <SelectItem key={index} value={breed.name}>
      {breed.name}
    </SelectItem>
  ));

  const housingOptions = housingData?.map((housing, index) => {
    return (
      <SelectItem key={index} value={housing.id}>
        {housing.name}
      </SelectItem>
    );
  });

  const convertToDays = (
    value: number | undefined,
    unit: string | undefined
  ): number => {
    const numericValue = value || 0;
    const selectedUnit = unit || "days";

    switch (selectedUnit) {
      case "years":
        return numericValue * 365;
      case "months":
        return numericValue * 30;
      case "weeks":
        return numericValue * 7;
      default:
        return numericValue;
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof livestockSchema>> = async (
    data
  ) => {
    try {
      const combinedAgeInDays = convertToDays(data.age, data.ageUnit);

      const postData = {
        ...data,
        // date_of_stocking: data.date_of_stocking,
        age: combinedAgeInDays.toString(),
      };

      const userActiveFarmId = getActiveFarm().id;
      const postDataToSend =
        livestockForm.getValues().quantity === 1
          ? [postData] // Enclose in an array for single entries
          : postData;
      const response = await HttpService.put(
        `${API_URL}farms/${userActiveFarmId}/livestock/${id}`,
        postDataToSend,
        HttpService.getDefaultOptions()
      );

      if (response.data) {
        toast.success("Livestock added successfully!");
        setSubmitSuccess(true);
      } else {
        toast.error("Failed to add livestock. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const AddQuantityField = () => {
    return (
      <FormField
        control={livestockForm.control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter quantity"
                type="number"
                {...field}
                disabled={entryType === "single"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  field.onChange(value.length > 0 ? Number(value) : 0);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="h-auto px-4 py-6 lg:px-8">
      {/* {submitSuccess && <SucessDialogue open={true} onClose={() => {}} />} */}
      <div className="h-full space-y-6 bg-white rounded-lg px-14 py-5">
        <div className="">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Add Livestock
          </h3>
          <div className="flex mt-10 ">
            <Form {...livestockForm}>
              <form
                onSubmit={livestockForm.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
                  <FormField
                    control={livestockForm.control}
                    name="animal_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of animal</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const animalObj = animalsList.filter(
                              (animal: Animal) => {
                                return animal.name === value;
                              }
                            )?.[0];
                            if (animalObj) {
                              field.onChange(animalObj?.id);
                              field.value = animalObj?.id;
                              const breeds: AnimalBreed[] =
                                getAnimalsLocal().breeds.filter(
                                  (breed: AnimalBreed) => {
                                    return breed.animal_type === animalObj.id;
                                  }
                                );
                              setAnimalTraits({
                                ...animalTraits,
                                breeds: breeds,
                              });
                            }
                          }}
                          value={
                            animalsList.filter((animal: Animal) => {
                              return animal.id === field.value;
                            })?.[0]?.name
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {animalsList.map((animal: Animal) => {
                              return (
                                <SelectItem key={animal.id} value={animal.name}>
                                  {animal.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={livestockForm.control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="breed-select">
                          Select breed
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const breedObj = animalTraits.breeds.filter(
                              (breed: AnimalBreed) => {
                                return breed.name === value;
                              }
                            )?.[0];
                            if (breedObj) {
                              field.onChange(breedObj?.id);
                            }
                          }}
                          value={
                            animalTraits.breeds.filter((breed: AnimalBreed) => {
                              return breed.id === field.value;
                            })?.[0]?.name
                          }
                          disabled={!animalTraits.breeds[0]}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select breed" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {breedOptions || (
                              <SelectItem key="fallback" disabled value="0">
                                No breeds available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={livestockForm.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sex</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={livestockForm.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight at stocking</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <Input
                              placeholder="Enter weight"
                              {...field}
                              onChange={(e) => {
                                const inputWeightValue = e.target.value;
                                if (inputWeightValue === "") {
                                  livestockForm.setValue("weight", 0); // Set value to 0 if input is cleared
                                } else {
                                  livestockForm.setValue(
                                    "weight",
                                    parseInt(inputWeightValue, 10)
                                  ); // Parse the input value as an integer
                                }
                              }}
                            />
                            <InputRightElement width={"8rem"}>
                              <Select
                                value={
                                  livestockForm.getValues().measuring_unit ||
                                  "kg"
                                }
                                onValueChange={(value) => {
                                  livestockForm.setValue(
                                    "measuring_unit",
                                    value
                                  );
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="kg">Kilogram</SelectItem>
                                  <SelectItem value="g">Gram</SelectItem>
                                </SelectContent>
                              </Select>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={livestockForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age at stocking</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <Input
                              required
                              placeholder="Enter age"
                              {...field}
                              onChange={(e) => {
                                const inputAgeValue = e.target.value.trim();
                                if (inputAgeValue === "") {
                                  livestockForm.setValue("age", 0);
                                } else {
                                  const parsedValue = parseInt(inputAgeValue);
                                  if (!isNaN(parsedValue)) {
                                    livestockForm.setValue("age", parsedValue);
                                  } else {
                                  }
                                }
                              }}
                            />
                            <InputRightElement width={"8rem"}>
                              <Select
                                defaultValue="days"
                                onValueChange={(value) => {
                                  livestockForm.setValue("ageUnit", value);
                                  setAgeUnit(value);
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue>
                                    {livestockForm.getValues("ageUnit")}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="days">Days</SelectItem>
                                  <SelectItem value="weeks">Weeks</SelectItem>
                                  <SelectItem value="months">Months</SelectItem>
                                  <SelectItem value="years">Years</SelectItem>
                                </SelectContent>
                              </Select>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={livestockForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price"
                          {...field}
                          onChange={(e) => {
                            const inputPriceValue = e.target.value.trim();
                            if (inputPriceValue === "") {
                              livestockForm.setValue("price", 0);
                            } else if (!isNaN(parseFloat(inputPriceValue))) {
                              livestockForm.setValue(
                                "price",
                                parseFloat(inputPriceValue)
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={livestockForm.control}
                  name="date_of_stocking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Stocking</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={livestockForm.control}
                  name="housing_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Housing ID</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={livestockForm.getValues().housing_id}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select housing" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {housingOptions || (
                            <SelectItem key="fallback" disabled value="0">
                              No Housing available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={livestockForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Animal status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="okay">Okay</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <AddQuantityField />
                <Button
                  type="submit"
                  disabled={livestockForm.formState.isSubmitting}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
