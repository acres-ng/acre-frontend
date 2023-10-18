import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const step2Schema = z.object({
  address1: z.string().min(1, "Enter a valid address"),
  address2: z.string().min(1, "Enter a valid address"),
  country: z.string().min(1, "Enter a valid country"),
  state: z.string().min(1, "Enter a valid state"),
});

type TStep2Schema = z.infer<typeof step2Schema>;

const Step2 = () => {
  // const prevStep = () => {
  //     setStep(step - 1);
  //   };

  const submitStep2 = (data: TStep2Schema) => {
    // Handle form submission for step 2
    console.log("Step 2 Data:", data);
    // nextStep();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStep2Schema>({ resolver: zodResolver(step2Schema) });
  return (
    <form onSubmit={handleSubmit(submitStep2)}>
      <div className="my-10">
        <div className="my-5">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Where is your farm located?
          </h1>
          <p className="text-gray-400 text-xs py-2">
            Enter your farm's line address
          </p>
        </div>
        <div className="my-2">
          <label
            htmlFor="address1"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Line Address 1
          </label>
          <input
            type="text"
            name="address1"
            id="address1"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
            // onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="my-2">
          <label
            htmlFor="address1"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Line Address 2
          </label>
          <input
            type="text"
            name="address2"
            id="address2"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
            // onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="flex flex-row gap-5 w-full">
          <div>
            <label
              htmlFor="address1"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Country
            </label>
            <input
              type="text"
              name="address2"
              id="address2"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
              // onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="address1"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              State
            </label>
            <input
              type="text"
              name="address2"
              id="address2"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
              // onChange={(e) => setLogin(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row my-2 gap-2">
          <button
            className="border border-green-500 my-2 w-full hover:bg-gray-200 text-green-600  py-2 rounded-lg focus:outline-none focus:shadow-outline"
            //   onClick={prevStep}
          >
            Back
          </button>

          <button
            className="bg-green-500 my-2 w-full hover:bg-green-700 text-white  py-2 rounded-lg focus:outline-none focus:shadow-outline"
            // onClick={nextStep}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step2;
