import React from "react";
import { Textarea } from "@/components/common/ui/textarea";
import { Input } from "rizzui";
import { useState } from "react";
import { Label } from "@/components/common/ui/label";
import { Button as Btn } from "rizzui";
import { Button } from "@/components/common/ui/button";

const HousingAddForm = () => {
  return (
    <div className="p-[5rem]">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        Add Housing
      </h3>
      <form>
        <div className="pt-8">
          <Input label="Housing Name/ Id" placeholder="E.g Housing 001" />
          <label
            htmlFor="currency"
            className="block mt-6 mb-2 text-sm font-medium text-gray-900"
          >
            Type Of Housing
          </label>
          <select
            id="currency"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
          >
            <option value="NGN">yellow house</option>
          </select>

          <div className="grid w-full gap-1.5 mt-6">
            <Label htmlFor="message">Description</Label>
            <Textarea
              placeholder="Write Something about the housing"
              id="message"
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
    </div>
  );
};

export default HousingAddForm;
