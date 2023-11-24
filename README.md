# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

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
import { useFormik } from "formik";

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
        setServerError(
          "An error occurred during registration, please try again."
        ); // Handle other server errors
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
      email: "",
    },
  });

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
    formik.setFieldValue("password", value);
  };

  return (

  );
};

export default Signup;
  <div className="hidden md:flex sm:hidden relative">
  <div className="h-screen w-full relative">
    <div className="relative">
      <img
        src={regimg}
        alt="Farmer"
        className="h-[95vh] w-[100vh] fixed mt-6 mb-6 object-cover rounded-lg"
        style={{ borderRadius: "20px" }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-20 p-4 rounded-b-lg backdrop-filter backdrop-blur-md">
        <h1 className="text-white text-lg-center">
          Cultivate Success With Acre
        </h1>
        <p className="text-white text-sm">
          Transform your farming experience with our intuitive livestock and crop
          management app. Track your farm activities, cultivate crops, raise
          livestock, and craft feeds/rations for maximum productivity!
        </p>
      </div>
    </div>
  </div>
</div>