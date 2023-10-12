import { FormEvent, useState } from "react";
import farmer from "../../assets/farmer.png";
import { sendOtp, verifyOtp } from "@/services/userService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

const Otp = () => {
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  const queryString: URLSearchParams = new URLSearchParams(
    window.location.search
  );
  const contact_type = queryString.get("contact");
  const type = queryString.get("t");

  if (!contact_type || !type) {
    return null;
  }

  const handleChange = (e: any, index: number) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);

      // Move focus to the next input field if available
      if (value !== "" && index < otpCode.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const jointCode = otpCode.join("");

    if (jointCode.length !== 6) {
      console.log(jointCode.length);
      return toast.error("OTP code must be six characters long");
    }

    try {
      if (contact_type) {
        const code = otpCode.join("");
        const response = await verifyOtp({ contact: contact_type, otp: code });

        if (response.status) {
          toast.success(response?.data?.message);
          navigate("/success", { replace: true });
          setIsVerified(true); // Mark OTP as verified
        } else {
          setServerError(
            "An error occurred during registration, please try again."
          );
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const handleResend = async (contact_type: string) => {
    try {
      if (type === "email") {
        const response = await sendOtp({ contact: contact_type });
        if (response?.data?.status === "success") {
          toast.success(response.data.message);
        }
      } else {
        const response = await sendOtp({ contact: contact_type });
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
        }
      }
    } catch (error: any) {
      if (error && error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        // Handle the error when it doesn't have the expected structure
        console.error("Unexpected error structure:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="grid grid-cols-2">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="bg-white  rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
              >
                {type === "phone" ? (
                  <div className="mb-4 text-center">
                    <p className="text-xl font-bold py-5">
                      Verify your phone number
                    </p>
                    <p className="text-gray-400 text-sm">
                      Please check and enter the 6 digit code we just sent to
                      your phone number{" "}
                      {contact_type && (
                        <span className="font-semibold text-gray-700 text-xs">
                          {contact_type}
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="mb-4 text-center">
                    <p className="text-xl font-bold py-5">Verify your Email</p>
                    <p className="text-gray-400 text-sm">
                      Please check and enter the 6 digit code we just sent to
                      your email address{" "}
                      {contact_type && (
                        <span className="font-semibold text-gray-700 text-xs">
                          {contact_type}
                        </span>
                      )}
                    </p>
                  </div>
                )}
                <div className="mb-4 flex justify-center">
                  {otpCode.map((digit, index) => (
                    <input
                      id={`otp-input-${index}`}
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      className="w-10 h-10 mx-1 text-center border border-gray-400 rounded focus:outline-none focus:border-blue-500"
                      // maxLength="1"
                    />
                  ))}
                </div>
                <div className="mb-6 text-center text-gray-400 text-xs">
                  {contact_type && (
                    <p
                      className="py-5"
                      onClick={() => handleResend(contact_type)}
                    >
                      Didn't receive the code{" "}
                      <span className="font-semibold text-xs cursor-pointer text-green-600">
                        Resend
                      </span>
                    </p>
                  )}
                  <button
                    type="submit"
                    className={`bg-green-500 cursor-pointer hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
              
              
             `}
                  >
                    Continue
                  </button>
                </div>
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
};

export default Otp;
6;
