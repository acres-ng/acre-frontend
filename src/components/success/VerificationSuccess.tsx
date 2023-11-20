import { useNavigate } from "react-router-dom";
import success from "../../assets/thumbs-up.png";
import Navbar from "../common/Navbar";

const VerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#eaf8f2]">
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {/* Left Side */}
      <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
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

      {/* Right Side */}
      <div className="hidden sm:flex justify-center items-center">
        <div className="h-screen w-full  relative">
          <img src={success} alt="Farmer" className="h-full w-full object-cover rounded-lg" />
          <div className="absolute bottom-6 left-4 right-4 bg-white bg-opacity-20 p-4 rounded-b-lg backdrop-filter backdrop-blur-md">
            <p className="text-white text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris diam tellus, euismod sit amet est et, tempus semper diam. Etiam condimentum lectus ut leo cursus scelerisque. Nullam sed bibendum orci. Phasellus in lacinia neque. Aliquam volutpat elit nibh, non luctus enim aliquam vel. Etiam eu volutpat nunc. Integer aliquam metus ac nisl imperdiet lobortis.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default VerificationSuccess;
