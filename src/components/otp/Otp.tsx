import { FormEvent, useState } from "react";
import farmer from "../../assets/farmer.png";
import { sendOtp, verifyOtp } from "@/services/userService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import Navbar from "../common/Navbar";

const Otp = () => {
  const [otpCode, setOtpCode] = useState("");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Ensure only digits are entered and limit the length to 6 characters
    const cleanedValue = value.replace(/[^\d]/g, "").slice(0, 6);

    setOtpCode(cleanedValue);

    // If the OTP is 6 characters long, enable the "Continue" button
    setIsDisabled(cleanedValue.length !== 6);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (otpCode.length !== 6) {
      return toast.error("OTP code must be six characters long");
    }

    try {
      if (contact_type) {
        const response = await verifyOtp({
          contact: contact_type,
          otp: otpCode,
        });

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
      const response = await sendOtp({ contact: contact_type });
      if (response?.data?.status === "success") {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      if (error && error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        console.error("Unexpected error structure:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className=" bg-[#eaf8f2] h-screen">
      <Navbar />
      <div className="grid grid-cols-2">
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  className=" rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4 text-center">
                    {type === "phone" ? (
                      <p className="text-xl font-bold py-5">
                        Verify your phone number
                      </p>
                    ) : (
                      <p className="text-xl font-bold py-5">
                        Verify your Email
                      </p>
                    )}
                    <p className="text-gray-500 text-sm">
                      Please check and enter the 6 digit code we just sent to
                      your {type === "phone" ? "phone number" : "email address"}{" "}
                      {contact_type && (
                        <span className="font-semibold text-gray-700 text-xs">
                          {contact_type}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="mb-4 flex justify-center">
                    <OtpInput
                      value={otpCode}
                      onChange={setOtpCode}
                      numInputs={6}
                      shouldAutoFocus
                      inputStyle={{
                        width: "50px",
                        border: "2px solid #ccc",
                        height: "60px",
                        borderRadius: "10px",
                        margin: "0 5px",
                      }}
                      // renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                  <div className="mb-6 text-center text-gray-500 text-xs">
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
                      className={`bg-green-500 cursor-pointer hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline`}
                      // disabled={isDisabled}
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
    </div>
  );
};

export default Otp;
