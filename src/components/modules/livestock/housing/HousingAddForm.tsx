import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/common/ui/textarea";
import { Input } from "rizzui";
import { Label } from "@/components/common/ui/label";
import { Button as Btn } from "rizzui";
import { Button } from "@/components/common/ui/button";
import { API_URL } from "@/config";
import HttpService from "@/services/HttpService";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/common/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getActiveFarm } from "@/services/farmService";
import { toast } from "sonner";
import { Housing } from "@/helpers/types";
import { getHousingUtils } from "@/services/livestockService";

interface FormData {
  name: string;
  description: string;
  id: string;
}

const housingSchema = z.object({
  name: z.string().nonempty("Housing name is required"),
  description: z.string(),
  id: z.string(),
});

const HousingAddForm = () => {
  const [housingData, setHousingData] = useState<Housing[]>([]);
  const housingForm = useForm<FormData>({
    resolver: zodResolver(housingSchema),
    defaultValues: {
      name: "",
      description: "",
      id: "",
    },
  });

  const fetchHousingData = async () => {
    try {
      const response = await getHousingUtils();
      const housingTypes: Housing[] = response?.housing_types || [];
      const housing: Housing[] = housingTypes.map((house) => {
        return {
          id: house.id,
          name: house.name,
        };
      });
      setHousingData(housing);
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error fetching housing data:", error);
    }
  };

  useEffect(() => {
    fetchHousingData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const userActiveFarmId = getActiveFarm().id;

      const requestData = [
        {
          name: data.name,
          description: data.description || null,
          id: data.id,
        },
      ];

      const response = await HttpService.post(
        `${API_URL}farms/${userActiveFarmId}/housing`,
        requestData,
        HttpService.getDefaultOptions()
      );

      if (response.data) {
        toast.success("Housing added successfully!");
      } else {
        toast.error("Failed to add housing. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-[5rem]">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        Add Housing
      </h3>
      <Form {...housingForm}>
        <form onSubmit={housingForm.handleSubmit(onSubmit)}>
          <div className="pt-8">
            <div>
              <Input
                label="Housing Name/ Id"
                placeholder="E.g Housing 001"
                {...housingForm.register("name")}
              />
              {housingForm.formState.errors.name && (
                <span>{housingForm.formState.errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5 mt-3">
              <Label htmlFor="feedName">Housing Name or ID</Label>

              <select
                {...housingForm.register("id")}
                onChange={(e) => housingForm.setValue("id", e.target.value)}
                className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-400"
              >
                <option value="" disabled selected className="text-gray-400">
                  Select Housing
                </option>
                {housingData.map((housing) => (
                  <option
                    key={housing.id}
                    value={housing.id}
                    className="text-gray-900"
                  >
                    {housing.name}
                  </option>
                ))}
              </select>

              {housingForm.formState.errors.id && (
                <span>{housingForm.formState.errors.id.message}</span>
              )}
            </div>

            <div className="grid w-full gap-1.5 mt-6">
              <Label htmlFor="message">Description</Label>
              <Textarea
                placeholder="Write Something about the housing"
                id="message"
                {...housingForm.register("description")}
              />
            </div>

            <div className="flex justify-center mt-8 space-x-10">
              <Btn className="w-[15rem] bg-white text-green-400 border border-green-400">
                Back
              </Btn>
              <Button
                type="submit"
                className="w-[15rem] bg-green-500 hover:bg-green-600"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HousingAddForm;
