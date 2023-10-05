import authService from "@/services/authService";
import React, { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login_type, setLogin_type] = useState("email"); // Set a default value of "email"
  const [errors, setErrors] = useState("");

  // const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   user ? navigate("/") : null;
  // }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoggingIn(true);

      if (login?.includes("@")) {
        setLogin_type("email");
      } else if (/\d{11}/.test(login)) {
        setLogin_type("phone");
      } else {
        console.error("Invalid email or phone format");
        return;
      }

      await authService.login({ login, password, login_type });
      // if(response.)
      // const loginUser = authService.getCurrentUser();
      // if (loginUser) {
      //   if (location.state?.from) {
      //     navigate(location.state.from);
      //   } else {
      //     navigate("/");
      //   }
      // }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setErrors(error.response.data);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Hi, welcome back!
              </h1>
              <p className="text-gray-400 text-sm">
                Please fill in your details to access your account on Acre
              </p>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email or phone number
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Sign in
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
      <div className="">COntetnt goes here</div>
    </div>
  );
}

export default Login;
