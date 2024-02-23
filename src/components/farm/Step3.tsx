import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const step3Schema = z.object({
  currency: z.string().min(1, "Enter a valid currency"),
  measuring_system: z.string().min(1, "Enter a valid measuring system"),
});

type TStep3Schema = z.infer<typeof step3Schema>;

const submitStep3 = (data: TStep3Schema) => {
  // Handle form submission for step 2

  // nextStep();
};

const Step3 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStep3Schema>({ resolver: zodResolver(step3Schema) });

  return (
    <form onSubmit={handleSubmit(submitStep3)}>
      <div>
        <div className="my-10">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            What are your preferences?
          </h1>
          <p className="text-gray-400 text-xs py-2">
            Please choose your preferred options from the list below
          </p>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Currency
          </label>
          <input
            id="name"
            type="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Measuring system
          </label>
          <input
            id="name"
            type="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex flex-row my-5 gap-2">
          <button
            className="border border-green-500  w-full hover:bg-gray-200 text-green-600  py-2 rounded-lg focus:outline-none focus:shadow-outline"
            //   onClick={prevStep}
          >
            Back
          </button>

          <button
            className="bg-green-500  w-full hover:bg-green-700 text-white  py-2 rounded-lg focus:outline-none focus:shadow-outline"
            // onClick={nextStep}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step3;
