import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getAnimalLocal as getAnimalsLocal } from "@/services/localCacheService";
import { useEffect, useState } from "react";
import { Animal, AnimalBreed, AnimalWithTraits } from "@/lib/types";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { getLivestockHousing } from "@/services/livestockHousingService";
import { toast } from "sonner";
import { API_URL } from "@/config";
import { getActiveFarm } from "@/services/farmService";
import HttpService from "@/services/HttpService";

type AddProps = {
  entryType?: string;
};

interface AddQuantityFieldProps {
  livestockForm: {
    control: any; // You may need to replace this with the correct type
  };
  entryType: string | undefined; // You can replace 'string' with the specific type if available
}

const livestockSchema = z.object({
  animal_type: z.number(),
  breed: z.number(),
  sex: z.string().min(1),
  housing_id: z.string().min(1),
  weight: z.string().min(1),
  age: z.string().min(1).optional(),
  combinedAgeInDays: z.number().int().optional(),
  ageUnit: z.string().min(1).optional(),
  status: z.string().min(1).nullable(),
  measuring_unit: z.string().min(1),
  price: z
    .string()
    .refine((value) => (value === "0" ? null : !isNaN(parseFloat(value))), {
      message: "Please enter a valid price or leave it empty.",
    }),

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
    .refine((value) => value > 0, {
      message: "Quantity must be greater than 0.",
    }),

  // quantity: z
  // .number()
  // .int()
  // .refine((value) => value > 0, {
  //   message: "Quantity must be greater than 0.",
  // }),
});

type LiveStockHousing = { id: string; name: string; type?: string };

const Add = () => {
  const location = useLocation();
  const entryType = location.state?.entryType;

  useEffect(() => {
    getLivestockHousing().then((housing) => {
      setHousingData(housing);
    });
  }, []);

  const livestockForm = useForm<z.infer<typeof livestockSchema>>({
    resolver: zodResolver(livestockSchema),
    defaultValues: {
      weight: "",
      age: "",
      measuring_unit: "kg",
      price: "",
      date_of_stocking: new Date().toISOString().split("T")[0],
      quantity: entryType === "flock" ? 2 : 1,
      ageUnit: "days",
    },
  });

  const animalsList: Animal[] = getAnimalsLocal()?.animals;
  const [housingData, setHousingData] = useState<LiveStockHousing[]>();

  const [animalTraits, setAnimalTraits] = useState<AnimalWithTraits>({
    animals: [],
    breeds: [],
  });
  const [ageUnit, setAgeUnit] = useState("days");

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

  // Helper function to convert age to days
  const convertToDays = (
    value: string | undefined,
    unit: string | undefined
  ): number => {
    const numericValue = value ? parseFloat(value) : 0;
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
    console.log("Submitting data:", data);
    data.quantity = entryType === "single" ? 1 : Number(data.quantity);

    try {
      const combinedAgeInDays = convertToDays(data.age, data.ageUnit);
      console.log("Combined Age in Days:", combinedAgeInDays);

      if (entryType !== "flock") {
        data.quantity = 1;
      }

      const postData = {
        ...data,
        // date_of_stocking: data.date_of_stocking,
        age: combinedAgeInDays.toString(),
      };

      const userActiveFarmId = getActiveFarm().id;
      const postDataToSend =
        entryType === "single"
          ? [postData] // Enclose in an array for single entries
          : postData;
      const response = await HttpService.post(
        `${API_URL}farms/${userActiveFarmId}/livestock`,
        postDataToSend,
        HttpService.getDefaultOptions()
      );

      if (response.data) {
        toast.success("Livestock added successfully!");
      } else {
        toast.error("Failed to add livestock. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const AddQuantityField = () => {
    if (entryType === "flock") {
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
                  {...field}
                  onChange={(e: any) => {
                    if (e.target.value.length === 0) {
                      field.onChange(e);
                    } else {
                      field.onChange({
                        ...e,
                        target: {
                          ...e.target,
                          value: parseInt(e.target.value),
                        },
                      });
                    }

                    if (
                      e.target.value.length > 0 &&
                      parseInt(e.target.value) === 1
                    ) {
                      livestockForm.setError("quantity", {
                        message: "Ise kushe len she yi oo",
                      });
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
  };

  return (
    <div className="h-auto px-4 py-6 lg:px-8">
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
                          defaultValue={
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
                          defaultValue={
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
                        defaultValue={field.value}
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
                            <Input placeholder="Enter weight" {...field} />
                            <InputRightElement width={"8rem"}>
                              <Select
                                defaultValue="kg"
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
                                const inputAgeValue = e.target.value;
                                livestockForm.setValue("age", inputAgeValue);
                                console.log(
                                  "Input Age:",
                                  inputAgeValue,
                                  "Selected Age Unit:",
                                  livestockForm.getValues("ageUnit")
                                );
                              }}
                            />
                            <InputRightElement width={"8rem"}>
                              <Select
                                defaultValue="days"
                                onValueChange={(value) => {
                                  livestockForm.setValue("ageUnit", value);
                                  console.log(
                                    "Input Age:",
                                    livestockForm.getValues("age"),
                                    "Selected Age Unit:",
                                    value
                                  );
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
                        <Input placeholder="Enter price" {...field} />
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
                        defaultValue={field.value}
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
                      <Select onValueChange={field.onChange}>
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
                {/* <FormField
                  control={livestockForm.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter quantity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
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

export default Add;
