import React, { useState, useEffect, FormEvent } from "react";
import otpimg from "../../../../assets/images/otpimg.png";
import mail from "../../../../assets/images/mail.png";
import { verifyOtp } from "@/services/userService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import logo from "../../../../assets/images/logo.png";
import Navbar from "../../../layout/Navbar";
import { getCurrentUser, getOTP } from "@/services/authService";

const Otp = () => {
  const [otpCode, setOtpCode] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showResendButton, setShowResendButton] = useState(false);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [showTimer, setShowTimer] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const customerContactType = currentUser?.customer?.primary_contact; // email or phone
  const customerContact = currentUser?.customer?.[customerContactType];
  const [sendOtp, setSendOtp] = useState(false);
  const fetchOTP = async (toastError =false) => {
    try {
      setLoading(true);
      const { response } = await getOTP({ contact: customerContact });
      if (response?.status === "success") {
        setTimer({
          minutes: Math.floor(response?.data / 60),
          seconds: response?.data % 60,
        });
        setShowResendButton(false);
        setShowTimer(true);
      }
    } catch (error: any) {
      console.error("Error fetching OTP:", error);
      if(toastError){
        toast.error(error?.response?.data?.message);
      }
      const time = error?.response?.data?.data;
      if (!isNaN(time)) {
        setTimer({
          minutes: Math.floor(time / 60),
          seconds: time % 60,
        });
        setShowResendButton(false);
        setShowTimer(true);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (sendOtp && customerContact) {
      fetchOTP();
    }
    setSendOtp(true);
  }, [sendOtp]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (timer.minutes === 0 && timer.seconds === 0 ) {
      setShowResendButton(true);
      setShowTimer(false);
    } else {
      setShowResendButton(false);
      setShowTimer(true);

      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer.seconds === 0) {
            return { minutes: prevTimer.minutes - 1, seconds: 59 };
          } else {
            return {
              minutes: prevTimer.minutes,
              seconds: prevTimer.seconds - 1,
            };
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, sendOtp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^\d]/g, "").slice(0, 6);

    setOtpCode(cleanedValue);
    setIsDisabled(cleanedValue.length !== 6);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      toast.error("OTP code must be six characters long");
      return;
    }

    try {
      if (customerContact) {
        setLoading(true);
        const response = await verifyOtp({
          contact: customerContact,
          otp: otpCode,
        });

        if (response.status) {
          toast.success(response?.data?.message);
          setIsVerified(true);
          navigate("/success", { replace: true });
        } else {
          setServerError(
            "An error occurred during registration, please try again."
          );
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    await fetchOTP(true);
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
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Left Side */}
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  className="rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={handleSubmit}
                >
                  <div className="text-center">
                    <div className="flex justify-center mt-[5rem] items-center">
                      <img src={mail} alt="tick" className="" />
                    </div>
                    <p className="text-xl font-bold py-3">
                      Verify your{" "}
                      {customerContactType === "phone"
                        ? "phone number"
                        : "Email"}
                    </p>
                    <p className="text-gray-500 text-sm py-3">
                      Please check and enter the 6 digit code we just sent to
                      your{" "}
                      {customerContactType === "phone"
                        ? "phone number"
                        : "Email address"}{" "}
                      {customerContact && (
                        <span className="font-semibold text-gray-700 text-xs">
                          {customerContact}
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
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                  <div className="mb-4 text-center text-gray-500 text-xs">
                    {showTimer && customerContact && (
                      <p className="py-5">
                        Didn't receive any code? Resend code in{" "}
                        {`${timer.minutes
                          .toString()
                          .padStart(2, "0")}:${timer.seconds
                          .toString()
                          .padStart(2, "0")}`}{" "}
                        minutes
                      </p>
                    )}
                    {showResendButton && (
                      <p
                        className={`pb-3 cursor-pointer ${
                          loading ? "opacity-50" : ""
                        }`}
                        onClick={() => handleResend()}
                      >
                        Resend code
                      </p>
                    )}
                    <button
                      type="submit"
                      className="bg-green-500 cursor-pointer hover-bg-green-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <div className="hidden h-screen sm:flex justify-center items-center">
          <div className=" mt-4 mb-4 w-full  relative">
            <img
              src={otpimg}
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
};

export default Otp;
