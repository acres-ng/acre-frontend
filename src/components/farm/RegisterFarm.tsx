// src/components/FarmForm.js
import React, { useState } from "react";
import house from "../../assets/farm-house.png";

const RegisterFarm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="my-10">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create your first farm
              </h1>
              <p className="text-gray-400 text-xs py-2">
                Start out with creating and naming your first farm on Acre
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
                id="name"
                type="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              className="bg-green-500 my-4 w-full hover:bg-green-700 text-white font-semibold py-2 rounded-lg focus:outline-none focus:shadow-outline"
              onClick={nextStep}
            >
              Continue
            </button>
          </div>
        );
      case 2:
        return (
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
                name="address1"
                id="address1"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
                // onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="address1"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Line Address 2
              </label>
              <input
                type="text"
                name="address2"
                id="address2"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
                // onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div className="flex flex-row gap-5 w-full">
              <div>
                <label
                  htmlFor="address1"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Country
                </label>
                <input
                  type="text"
                  name="address2"
                  id="address2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  // onChange={(e) => setLogin(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="address1"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  State
                </label>
                <input
                  type="text"
                  name="address2"
                  id="address2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  // onChange={(e) => setLogin(e.target.value)}
                />
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
                onClick={nextStep}
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div className="my-10">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                What are your preferences?
              </h1>
              <p className="text-gray-400 text-xs py-2">
                Please choose your preferred options from the list below
              </p>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Currency
              </label>
              <input
                id="name"
                type="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Measuring system
              </label>
              <input
                id="name"
                type="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
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
                // onClick={nextStep}
              >
                Continue
              </button>
            </div>
          </div>
        );
      default:
        return null;
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
    <div className="grid grid-cols-2">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="mb-4">
                {renderProgressIndicator()}

                {renderFormStep()}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center items-center">
        <img src={house} alt="" className="h-[500px]" />
      </div>
    </div>
  );
};

export default RegisterFarm;
