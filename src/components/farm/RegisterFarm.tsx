import { useState } from "react";
import house from "../../assets/farm-house.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import location from "../../assets/farm-location.png";
import selection from "../../assets/selection.png";
import Navbar from "../common/Navbar";

const step1Schema = z.object({
  farm_name: z.string().nonempty({ message: "Enter a valid farm name" }),
});

const step2Schema = z.object({
  address1: z.string().min(1, "Enter a valid address"),
  address2: z.string().min(1, "Enter a valid address"),
  country: z.string().min(1, "Enter a valid country"),
  state: z.string().min(1, "Enter a valid state"),
});

const step3Schema = z.object({
  currency: z.string().min(1, "Enter a valid currency"),
  measuring_system: z.string().min(1, "Enter a valid measuring system"),
});

type TStep1Schema = z.infer<typeof step1Schema>;
type TStep2Schema = z.infer<typeof step2Schema>;
type TStep3Schema = z.infer<typeof step3Schema>;

const RegisterFarm = () => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(
      step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema
    ),
  });

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = (stepData: any) => {
    if (step < 3) {
      if (step === 1) {
        setStep1Data(stepData);
      } else if (step === 2) {
        setStep2Data(stepData);
      } else if (step === 3) {
        setStep3Data(stepData);
      }
      nextStep();
    } else {
      // Submit the final data to the server
      const finalData = {
        ...step1Data,
        ...step2Data,
        ...step3Data,
        ...stepData, // Include step3Data
      };
      console.log("Form data:", finalData);
    }
  };

  const renderProgressIndicator = () => {
    return (
      <div className="text-left mb-4">
        <div className="text-gray-600 dark:text-gray-400 pt-5">
          Step {step} of 3
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          {step === 1 && (
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "33%" }}
            ></div>
          )}
          {step === 2 && (
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "66%" }}
            ></div>
          )}
          {step === 3 && (
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "100%" }}
            ></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#eaf8f2] h-screen">
      <Navbar />
      <div className="grid grid-cols-2">
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="">
                  {renderProgressIndicator()}
                  <div className="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {step === 1 && (
                        <>
                          <div className="my-10">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                              Create your first farm
                            </h1>
                            <p className="text-gray-500 text-xs py-2">
                              Start out with creating and naming your first farm
                              on Acre
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Farm name
                            </label>
                            <input
                              {...register("farm_name", {
                                required: "Farm name is required",
                              })}
                              id="name"
                              type="farm_name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {/* {errors.farm_name && (
                            <p className="text-red-500 text-sm">
                              {errors.farm_name.message}
                            </p>
                          )} */}
                          </div>
                          <button
                            type="submit"
                            className="bg-green-500 my-4 w-full hover:bg-green-700 text-white font-semibold py-2 rounded-lg focus:outline-none focus:shadow-outline"
                            // onClick={nextStep}
                          >
                            Continue
                          </button>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div className="my-10">
                            <div className="my-5">
                              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Where is your farm located?
                              </h1>
                              <p className="text-gray-400 text-xs py-2">
                                Enter your farm's line address
                              </p>
                            </div>
                            <div className="my-2">
                              <label
                                htmlFor="address1"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                              >
                                Line Address 1
                              </label>
                              <input
                                type="text"
                                id="address1"
                                {...register("address1", {
                                  required: "Farm name is required",
                                })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              />
                              {/* {errors.address1 && (
                              <p className="text-red-500 text-sm">
                                {errors.address1.message}
                              </p>
                            )} */}
                            </div>

                            <div className="my-2">
                              <label
                                htmlFor="address1"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                              >
                                Line Address 2
                              </label>
                              <input
                                {...register("address2", {
                                  required: "Farm name is required",
                                })}
                                type="text"
                                id="address2"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              />
                              {/* {errors.address2 && (
                              <p className="text-red-500 text-sm">
                                {errors.address2.message}
                              </p>
                            )} */}
                            </div>

                            <div className="flex flex-row gap-5 w-full">
                              <div>
                                <label
                                  htmlFor="country"
                                  className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                  Country
                                </label>
                                <input
                                  type="text"
                                  {...register("country", {
                                    required: "Country is required",
                                  })}
                                  id="country"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                                {/* {errors.country && (
                                <p className="text-red-500 text-sm">
                                  {errors.country.message}
                                </p>
                              )} */}
                              </div>

                              <div>
                                <label
                                  htmlFor="state"
                                  className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                  State
                                </label>
                                <input
                                  type="text"
                                  {...register("state", {
                                    required: "State is required",
                                  })}
                                  id="state"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                                {/* {errors.state && (
                                <p className="text-red-500 text-sm">
                                  {errors.state.message}
                                </p>
                              )} */}
                              </div>
                            </div>

                            <div className="flex flex-row my-2 gap-2">
                              <button
                                className="border border-green-500 my-2 w-full hover:bg-gray-200 text-green-600  py-2 rounded-lg focus:outline-none focus:shadow-outline"
                                onClick={prevStep}
                              >
                                Back
                              </button>

                              <button
                                className="bg-green-500 my-2 w-full hover:bg-green-700 text-white  py-2 rounded-lg focus:outline-none focus:shadow-outline"
                                type="submit"
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {step === 3 && (
                        <div>
                          <div className="my-10">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                              What are your preferences?
                            </h1>
                            <p className="text-gray-400 text-xs py-2">
                              Please choose your preferred options from the list
                              below
                            </p>
                          </div>

                          <div>
                            <label
                              htmlFor="currency"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Currency
                            </label>
                            <input
                              id="currency"
                              {...register("currency", {
                                required: "Currency is required",
                              })}
                              type="currency"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {/* {errors.currency && (
                            <p className="text-red-500 text-sm">
                              {errors.currency?.message}
                            </p>
                          )} */}
                          </div>

                          <div>
                            <label
                              htmlFor="measuring_system"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Measuring system
                            </label>
                            <input
                              {...register("measuring_system", {
                                required: "Measuring system is required",
                              })}
                              id="measuring_system"
                              type="measuring_system"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {/* {errors.measuring_system && (
                            <p className="text-red-500 text-sm">
                              {errors.measuring_system?.message}
                            </p>
                          )} */}
                          </div>

                          <div className="flex flex-row my-5 gap-2">
                            <button
                              className="border border-green-500  w-full hover:bg-gray-200 text-green-600  py-2 rounded-lg focus:outline-none focus:shadow-outline"
                              onClick={prevStep}
                            >
                              Back
                            </button>

                            <button
                              className="bg-green-500  w-full hover:bg-green-700 text-white  py-2 rounded-lg focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-center items-center">
          {step === 1 ? (
            <img src={house} alt="" className="h-[500px] object-contain" />
          ) : step === 2 ? (
            <img src={location} alt="" className="h-[500px] object-contain" />
          ) : (
            <img src={selection} alt="" className="h-[500px] object-contain" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterFarm;
