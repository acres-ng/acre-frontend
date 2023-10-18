import { useNavigate } from "react-router-dom";
import success from "../../assets/thumbs-up.png";
import Navbar from "../common/Navbar";

const VerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#eaf8f2] h-screen">
      <Navbar />
      <div className="grid grid-cols-2">
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="mb-4 text-center">
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
        <div className="flex justify-center items-center">
          <img src={success} alt="" className="h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
