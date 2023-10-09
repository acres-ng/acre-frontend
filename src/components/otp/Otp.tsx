import { FormEvent, useState } from "react";
import farmer from "../../assets/farmer.png";
import { verifyOtp } from "@/services/userService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  const queryString: URLSearchParams = new URLSearchParams(
    window.location.search
  );
  const type = queryString.get("type");

  if (!type) {
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

    try {
      const code = otpCode.join("");
      // Handle OTP verification or submission here
      if (type) {
        const { data } = await verifyOtp({ contact: type, otp: code });
        if (data?.status === "success") {
          toast.success(data?.message);
          setIsVerified(true);
        } else {
          setServerError(
            "An error occurred during registration, please try again."
          ); // Handle other server errors
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.log(error);
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
                <div className="mb-4 text-center">
                  <p className="text-xl font-bold py-5">
                    Verify your phone number
                  </p>
                  <p className="text-gray-400 text-sm">
                    Please check and enter the 6 digit code we just sent to your
                    phone number{" "}
                    <span className="font-semibold text-gray-700 text-xs">
                      +2347033448148
                    </span>
                  </p>
                </div>
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
                  <p className="py-5">
                    Didn't recieve code{" "}
                    <span className="font-semibold text-xs cursor-pointer text-green-600">
                      Resend
                    </span>
                  </p>
                  <button
                    disabled={!!isVerified}
                    onClick={() => navigate("/success", { replace: true })}
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
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
