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
import { Link, useNavigate } from "react-router-dom";
import regimg from "../../assets/regimg.png";
import { toast } from "sonner";
import { encryptData } from "@/lib/encrypt";
import logo from "../../assets/logo.png";
import { setCurrentUser } from "@/services/authService";
import { BiSolidLock } from "react-icons/bi";
import { IoCheckbox } from "react-icons/io5";


const signUpSchema = z
  .object({
    firstname: z.string().min(1, "Enter a valid name"),
    email: z.string().email("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm Password is required"), // Make it required
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

const Signup = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [termsChecked, setTermsChecked] = useState(false); // State for checkbox

  const navigate = useNavigate();

  const handlePhoneChange = (value: string) => {
    // Remove spaces from the phone number value
    if (value === undefined) return;

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
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (values: FieldValues) => {
    if (!termsChecked) {
      toast.error(
        "Please confirm that you've read the terms before signing up."
      );
      return; // Stop submission if terms are not checked
    }

    if (
      !hasEightCharacters ||
      !hasOneNumber ||
      !hasSpecialCharacter ||
      !hasUpperCase ||
      !hasLowerCase
    ) {
      toast.error("Please complete the password requirements.");
      return; // Stop submission if criteria are not met
    }
    const cleanedPhoneNumber = values.phone.replace(/\s+/g, "");

    const cleanedValues = {
      ...values,
      phone: cleanedPhoneNumber,
    };

    try {
      const { data } = await userService.register(cleanedValues);

      if (data?.status === "success") {
        setCurrentUser(data.data.customer);
        navigate(`/otp`, { replace: true });
      } else {
        throw new Error("Registration failed."); // Throw an error for generic server error
      }
    } catch (error: any) {
      console.error("Error:", error); // Log the error object for debugging

      let errorMessage = "An error occurred during registration.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      // Ensure 'toast' from 'sonner' is correctly imported and initialized
      toast.error(errorMessage);
      setServerError(errorMessage); // Update serverError state to display error message
    }
  };

  // states for mananging validation
  const [hasEightCharacters, setHasEightCharacters] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasOneNumber, setHasOneNumber] = useState(false);

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;

    // has special characters
    const hasSpecialCharacterTest = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
    setHasSpecialCharacter(hasSpecialCharacterTest.test(value));

    // has uppercase characters
    const hasUpperCaseTest = /[A-Z]/;
    setHasUpperCase(hasUpperCaseTest.test(value));

    // has lowercase characters
    const hasLowerCaseTest = /[a-z]/;
    setHasLowerCase(hasLowerCaseTest.test(value));

    // has one number
    const hasOneNumberTest = /\d+/;
    setHasOneNumber(hasOneNumberTest.test(value));

    // has eight characters
    setHasEightCharacters(value.length >= 8 ? true : false);
    setValue("password", value);
  };

  return (
    <div className={` bg-[${backgroundColours.bgColour2}] lg:min-h-screen min-h-[110vh]  `}>
      <div>
        <img
          src={logo}
          alt="acre logo"
          className="absolute left-4 top-0 w-[120px]  flex flex-col md:ml-5 lg:mr-28 xl:mx-28"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 ">
        {/* Left Side */}
        <section className=" flex mt-12 flex-col justify-center items-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Hi, let's get you started!
              </h1>
              <p className="text-sm text-gray-500">
                To create your account, enter your details below and we'll send
                you an OTP shortly.
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
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Your name
                  </label>
                  <input
                    {...register("firstname", {
                      required: "Name is required",
                    })}
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
                <div>
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
                    className="border appearance-none text-gray-700 bg-gray-50 border-gray-200 rounded py-2 px-1  focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address{" "}
                  </label>
                  <input
                    {...register("email", {
                      // required: "Email is required",
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
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
                    onChange={handlePasswordChange}
                    // placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <div>
                    {getValues()?.password?.length > 0 && (
                      <div>
                        <div
                          className={`flex flex-row gap-x-3 items-center my-2 ${
                            hasEightCharacters
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          <IoCheckbox />
                          <p>At least 8 characters</p>
                        </div>
                        <div
                          className={`flex flex-row gap-x-3 items-center my-2 ${
                            hasOneNumber ? "text-green-600" : "text-gray-600"
                          }`}
                        >
                          <IoCheckbox />
                          <p>Contains at least one number</p>
                        </div>
                        <div
                          className={`flex flex-row gap-x-3 items-center my-2 ${
                            hasSpecialCharacter
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          <IoCheckbox />
                          <p>Contains a special character</p>
                        </div>
                        <div
                          className={`flex flex-row gap-x-3 items-center my-2 ${
                            hasUpperCase ? "text-green-600" : "text-gray-600"
                          }`}
                        >
                          <IoCheckbox />
                          <p>Contains uppercase letter</p>
                        </div>
                        <div
                          className={`flex flex-row gap-x-3 items-center my-2 ${
                            hasLowerCase ? "text-green-600" : "text-gray-600"
                          }`}
                        >
                          <IoCheckbox />
                          <p>Contains lowercase letter</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
                      onChange={(e) => setTermsChecked(e.target.checked)}
                      checked={termsChecked} // Add checked attribute to sync with state
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500">
                      I agree to the{" "}
                      <a
                        className="font-medium text-gray-600 hover:underline"
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
                  disabled={isSubmitting || !termsChecked} // Disable button if terms are not checked
                  className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    </span>
                  ) : (
                    "Create account"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-green-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
                {/* <div className="flex items-center justify-center dark:bg-gray-800">
                  <button className="px-4 py-2 border flex gap-2 w-full border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 items-center justify-center">
                    <span className="flex items-center justify-center">
                      <img
                        className="w-6 h-6"
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        loading="lazy"
                        alt="Google Logo"
                      />
                      <span>Login with reg</span>
                    </span>
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <div className="h-screen hidden md:flex sm:hidden relative">
          <div className=" w-full relative">
            <div className="relative  ">
              <img
                src={regimg}
                alt="Farmer"
                className=" fixed h-[97vh] w-[49vw] mt-[10px] object-cover rounded-lg"
                style={{ borderRadius: "20px" }}
              />
              <div className="fixed w-[45%] bottom-6 right-9 bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-md">
                <h1 className="text-white text-lg font-bold">
                  Cultivate Success With Acre
                </h1>
                <p className="text-white text-sm ">
                  Transform your farming experience with our intuitive livestock
                  and crop management app. Track your farm activities, cultivate
                  crops, raise livestock, and craft feeds/rations for maximum
                  productivity!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
