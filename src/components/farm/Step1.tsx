import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const step1Schema = z.object({
  farm_name: z.string().nonempty({ message: "Enter a valid farm name" }),
});

type TStep1Schema = z.infer<typeof step1Schema>;

const Step1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStep1Schema>({ resolver: zodResolver(step1Schema) });

  const submitStep1 = (data: TStep1Schema) => {
    // Handle form submission for step 1
    console.log("Step 1 Data:", data);
    // nextStep();
  };
  return (
    <form onSubmit={handleSubmit(submitStep1)}>
      <div className="my-10">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create your first farm
        </h1>
        <p className="text-gray-400 text-xs py-2">
          Start out with creating and naming your first farm on Acre
        </p>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Farm name
        </label>
        <input
          {...register("farm_name", {
            required: "Farm name is required",
          })}
          id="name"
          type="farm_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.farm_name && (
          <p className="text-red-500 text-sm">{errors.farm_name.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-green-500 my-4 w-full hover:bg-green-700 text-white font-semibold py-2 rounded-lg focus:outline-none focus:shadow-outline"
        // onClick={nextStep}
      >
        Continue
      </button>
    </form>
  );
};

export default Step1;
