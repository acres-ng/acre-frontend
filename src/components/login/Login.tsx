import authService, { getCurrentUser } from "@/services/authService";
import React, { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

import farmer from "../../assets/farmer.png";
interface User {
  login: string;
  password: string;
  login_type: string;
}

const loginSchema = z.object({
  login: z.string().refine(
    (value) => {
      // Check if it's a valid email or a valid phone number
      return (
        (/\S+@\S+\.\S+/.test(value) && value.includes("@")) || // Check for email
        (/\d{11}/.test(value) && !value.includes("@")) // Check for phone number (adjust the pattern as needed)
      );
    },
    {
      message: "Please enter a valid email address or phone number",
    }
  ),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type TLoginSchema = z.infer<typeof loginSchema>;

function Login() {
  // const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   user ? navigate("/") : null;
  // }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: FieldValues) => {
    try {
      let loginType = "email";

      if (values.login?.includes("@")) {
        loginType = "email";
      } else if (/\d{11}/.test(values.login)) {
        loginType = "phone";
      }

      const user: User = {
        login: values.login,
        password: values.password,
        login_type: loginType,
      };

      const response = await authService.login(user);
      if (response.status === "success") {
        if (
          response?.data?.customer?.farm === null ||
          response?.data?.customer?.farm === undefined
        ) {
          navigate("/add-farm");
          return;
        }
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Hi, welcome back!
              </h1>
              <p className="text-gray-400 text-sm">
                Please fill in your details to access your account
              </p>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="login"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email or phone number
                  </label>
                  <input
                    {...register("login", {
                      required: "Email or phone is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email address",
                      },
                    })}
                    type="text"
                    name="login"
                    id="login"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                  {errors.login && (
                    <p className="text-red-500 text-sm">
                      {errors.login.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-green-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-green-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center items-center">
        <img src={farmer} alt="" className="h-[500px]" />
      </div>
    </div>
  );
}

export default Login;
