import { useNavigate } from "react-router-dom";
import success from "../../assets/successimg.png";
import tick from "../../assets/Tick.png";
import Navbar from "../../layout/Navbar";
import logo from "../../assets/logo.png";
import { backgroundColours } from "@/lib/enums";

const VerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className={`bg-[${backgroundColours.bgColour2}]  h-screen overflow-hidden`}>
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
                <div className="mb-4  pt-[8rem] text-center">
                  <div className="flex justify-center items-center">
                    <img src={tick} alt="tick" className="" />
                  </div>
                  <p className="text-2xl font-bold py-5">
                    Verification Successful!
                  </p>
                  <p className="text-gray-400 text-sm">
                    Hurray! now that you have verified your account with Acre,
                    Let's get you your first farm
                  </p>
                  <div
                    onClick={() => navigate("/add-farm", { replace: true })}
                    className="bg-green-500 hover:bg-green-700 cursor-pointer mt-7 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Continue
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <div className="hidden h-screen sm:flex justify-center items-center">
          <div className=" mt-4 mb-4 w-full  relative">
            <img
              src={success}
              alt="Farmer"
              className="h-[97vh] w-[49vw]  object-cover rounded-lg"
              style={{ borderRadius: "20px" }}
            />
            <div className="w-[45vw] absolute bottom-4 left-6 right-4 bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-md">
              <h1 className="text-white text-lg font-bold">Cultivate Success with Acre</h1>
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

export default VerificationSuccess;
