import { DatePicker, DatePickerProps } from "antd";
import React, { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

export interface IFormInputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  error?: string | boolean;
  defaultValue?: string | number;
  value?: string | number;
  type?: React.HTMLInputTypeAttribute | "textarea";
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  icon?: JSX.Element | string;
  required?: boolean;
  disabled?: boolean;
}

const FormInput = ({
  className,
  labelClassName,
  label,
  type,
  name,
  onChange,
  onBlur,
  icon,
  placeholder,
  required,
  disabled,
  defaultValue,
  error,
}: IFormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type
    ? type === "password"
      ? showPassword === true
        ? "text"
        : "password"
      : type
    : "text";

  const handleDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    onChange && onChange(dateString);
  };

  return (
    <div className={`flex flex-col mt-3 ${error ? "" : "mb-3"} ${className}`}>
      <label
        htmlFor=""
        className={`text-[14px] font-semibold mb-[0.8px] ${labelClassName}`}
      >
        {label} {required ? <span className="text-shades-red">*</span> : ""}
      </label>
      <div
        className={`flex flex-row gap-x-3 justify-center items-center p-2 border-[2px] border-[#d6d6da] rounded-md`}
      >
        {icon && <span>{icon}</span>}
        {type === "textarea" ? (
          <textarea
            name={name}
            rows={6}
            onChange={onChange}
            onBlur={onBlur}
            className={`resize-none no_scrollbar bg-transparent text-[14px] border-none hover:border-none focus:border-none focus:outline-none w-full text-[#666365]`}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
          ></textarea>
        ) : type === "date" ? (
          <DatePicker
            className={`resize-none no_scrollbar bg-transparent text-[14px] !border-none hover:!border-none focus:!border-none !shadow-none hover:!shadow-none focus:!shadow-none focus:!outline-none w-full text-[#666365]`}
            onChange={handleDateChange}
          />
        ) : (
          <input
            type={inputType}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            className={`bg-transparent text-[14px] border-none hover:border-none focus:border-none focus:outline-none w-full text-[#666365]`}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
          />
        )}
        {type === "password" && (
          <span className="cursor-pointer" onClick={handleShowPassword}>
            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </span>
        )}
      </div>
      {error && <p className="text-shades-red text-[14px] mb-3">{error}</p>}
    </div>
  );
};

export default FormInput;
