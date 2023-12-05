import authService, { setCurrentUser } from "@/services/authService";
import { sendOtp, verifyOtp } from "@/services/userService";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import loginimg from "../../assets/loginimg.png";
import { encryptData } from "@/lib/encrypt";
import logo from "../../assets/logo.png";
import useAuth from "../context/useAuth";
import AuthContext from "../context/authContext";

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

  const authContext = useContext(AuthContext);

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

      if (
        response.status === "success" &&
        response.data?.is_verified === true
      ) {
        if (response.data?.farms.length >= 1) {
          const loginUser = authService.getCurrentUser();
          if (loginUser) {
            authContext.setUser(loginUser);
            navigate("/");
          }
        } else {
          navigate("/add-farm");
        }
      } else {
        setCurrentUser(response.data?.customer);
        navigate("/otp");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className=" h-screen overflow-hidden bg-[#eaf8f2]">
      <div>
        <img
          src={logo}
          alt="acre logo"
          className="absolute left-4 top-0 w-[120px]  flex flex-col md:ml-5 lg:mr-28 xl:mx-28"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 ">
        {/* Left Side */}
        <section className="flex flex-col justify-center items-center px-6 pt-[12rem] sm:py-20 relative">
          <div className="w-full sm:mt-7 rounded-lg sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 sm:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Hi, welcome back!
              </h1>
              <p className="text-gray-500 text-sm">
                Please fill in your details to access your account
              </p>
              <div />
              <form
                className="space-y-4 sm:space-y-6"
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
                    autoFocus
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
                    "Log In"
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
        </section>

        {/* Right Side */}
        <div className="hidden h-screen sm:flex justify-center items-center">
          <div className=" mt-4 mb-4 w-full  relative">
            <img
              src={loginimg}
              alt="Farmer"
              className="h-[97vh] w-[49vw]  object-cover rounded-lg"
              style={{ borderRadius: "20px" }}
            />
            <div className="w-[45vw] absolute bottom-4 left-6 right-4 bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-md">
              <h1 className="text-white text-lg font-bold">Helping you grow</h1>
              <p className="text-white text-sm">
                Dive Back into Agricultural Excellence! Unlock New Growth
                Opportunities and Effortlessly Navigate Your Farm's Success with
                acre
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
