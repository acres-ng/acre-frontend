import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Link } from "react-router-dom";
import { getAnimalLocal as getAnimalsLocal } from "@/services/localCacheService";
import { useEffect, useState } from "react";
import {
  Animal,
  AnimalBreed,
  AnimalMaturity,
  AnimalWithTraits,
} from "@/lib/types";
import { Group, Item } from "@radix-ui/react-select";
import { Dropdown } from "rizzui";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { getLivestockHousing } from "@/services/livestockHousingService";
import { toast } from "sonner";

const livestockSchema = z.object({
  animal_type: z.string().min(2, { message: "Please select an animal type" }),
  breed: z.string().min(1),
  sex: z.string().min(1),
  housing_id: z.string().min(1),
  weight: z.string().min(1),
  age: z.string().min(1),
  status: z.string().min(1).nullable(),
  date_of_stocking: z.string().datetime(),
});

type AnimalData = {
  id: string;
  breed: string;
  maturity?: string;
};
type LiveStockHousing = { id: string; name: string; type?: string };

const Add = () => {
  const livestockForm = useForm<z.infer<typeof livestockSchema>>({
    resolver: zodResolver(livestockSchema),
    defaultValues: {
      weight: "",
      age: "",
    },
  });

  const animalsList: Animal[] = getAnimalsLocal().animals; //gets animals from local storage
  const [housingData, setHousingData] =
    useState<LiveStockHousing[]>(); //sets housing data state
  const [animalData, setAnimalData] = useState<AnimalData>({
    id: "",
    breed: "",
  }); //sets animal and breed id's <number> for form submission
  const [formSelectOptions, setFormSelectOptions] = useState<AnimalData>({
    id: "",
    breed: "",
  }); //sets selected dropdown options state
  const [animalTraits, setAnimalTraits] = useState<AnimalWithTraits>({
    animals: [],
    breeds: [],
  }); //sets breeds for selected animal type

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

  const onChangeAnimal = (animalName: string) => {
    const animalsLocal = getAnimalsLocal();
    const animals: Animal[] = animalsLocal.animals;
    const animalObj = animals.filter((animal: Animal) => {
      return animal.name === animalName;
    })[0];
    if (animalObj) {
      setAnimalData({
        ...animalData,
        id: animalObj.id,
      });

      const breeds: AnimalBreed[] = animalsLocal.breeds.filter(
        (breed: AnimalBreed) => {
          return breed.animal_type === animalObj.id;
        }
      );

      setAnimalTraits({
        ...animalTraits,
        breeds: breeds,
      });

      setFormSelectOptions({
        ...formSelectOptions,
        breed: breeds[0].name,
      });
    }
  };

  const onChangeBreed = (breedName: string) => {
    const breedsLocal: AnimalBreed[] = getAnimalsLocal().breeds;
    const breedObj = breedsLocal.filter((breed: AnimalBreed) => {
      return breed.name === breedName && breed.animal_type === animalData.id;
    })[0];
    if (breedObj) {
      setFormSelectOptions({
        ...formSelectOptions,
        breed: breedObj.name,
      });

      setAnimalData({
        ...animalData,
        breed: breedObj.id,
      });
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof livestockSchema>> = (data) => {
    console.log("DATA: " + JSON.stringify(data));
  };

  useEffect(() => {
    getLivestockHousing().then((housing) => {
      setHousingData(housing);
    });
  }, []);

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
                {/* <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What do you want to call the animal?
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g Perry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
                  <FormField
                    control={livestockForm.control}
                    name="animal_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of animal</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            field.value = value;
                            onChangeAnimal(value);
                          }}
                          defaultValue={field.value}
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
                            field.onChange(value);
                            onChangeBreed(value);
                          }}
                          defaultValue={field.value}
                          disabled={!animalTraits.breeds[0]}
                          value={formSelectOptions.breed}
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
                                // onValueChange={field.onChange}
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
                            />
                            <InputRightElement width={"8rem"}>
                              <Select
                                defaultValue="days"
                                // onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue />
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
                {/* 
                <FormField
                  control={form.control}
                  name="maturity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maturity</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          onChangeMaturity(value);
                        }}
                        defaultValue={field.value}
                        value={
                          animalTraits.maturity[0]
                            ? animalTraits.maturity[0].name
                            : field.value
                        }
                        disabled={!animalTraits.breeds[0]}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select maturity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {maturityOptions || (
                            <SelectItem key="fallback" disabled value="0">
                              No maturity available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

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
