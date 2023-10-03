import React, { useState } from "react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import userService from "@/services/userService";

const signUpSchema = z
  .object({
    firstname: z.string().min(1, "Enter a valid name"),
    email: z.string().email("Email is required"),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
    confirmPassword: z.string(),
    phone: z.string().refine(isValidPhoneNumber, {
      message: "Please enter a valid phone number",
    }),
    country_code: z.string().min(2),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TSignUpSchema = z.infer<typeof signUpSchema>;

enum RegistrationStep {
  UserData,
  RegistrationSuccess,
}

const Signup = () => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(
    RegistrationStep.UserData
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const handlePhoneChange = (value: string) => {
    setValue("phone", value || "");
    const phoneNumber = parsePhoneNumber(value);
    if (phoneNumber) {
      setValue("country_code", phoneNumber.country || "");
    } else {
      setValue("country_code", "");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    reset,
    setError,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      const result = await userService.register(data);
      if (result.status >= 200 && result.status <= 300) {
        setCurrentStep(RegistrationStep.RegistrationSuccess);
      } else {
        setServerError("An error occurred during registration1."); // Handle other server errors
      }
    } catch (error: any) {
      setServerError(error.response.data); // Handle unexpected errors
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Hi, lets get you started
              </h1>
              <p className="text-sm text-gray-400">
                To create an account, pleease enter your preferred phone number
                and we would send an OTP verification to you shortly
              </p>
              {serverError && (
                <div className="text-red-500 text-sm mb-4">{serverError}</div>
              )}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your name
                  </label>
                  <input
                    {...register("firstname", { required: "Name is required" })}
                    type="text"
                    name="firstname"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-sm">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <PhoneInput
                  {...register("phone", {
                    required: "Phone is required",
                    validate: {
                      validPhone: (value) =>
                        isValidPhoneNumber(value) ||
                        "Enter a valid phone number",
                    },
                  })}
                  value={getValues("phone")}
                  onChange={handlePhoneChange}
                  defaultCountry="NG"
                  countryCallingCodeEditable={false}
                  country="NG"
                  international
                  withCountryCallingCode
                  className="border appearance-none text-gray-700 border-gray-200 rounded py-2 px-1  focus:outline-none"
                />

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email address",
                      },
                    })}
                    id="email"
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                    type="password"
                    name="password"
                    id="password"
                    // placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: "Password do not match",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I agree to the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        <span className="text-green-500">
                          Terms and Conditions
                        </span>
                      </a>{" "}
                      of Acre
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      {/* <span className="mr-2">Signing up...</span> */}
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    </span>
                  ) : (
                    "Create account"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-green-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="">second part</div>
    </div>
  );
};

export default Signup;
