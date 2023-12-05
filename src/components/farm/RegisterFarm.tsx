import { useEffect, useState, useRef } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/logo.png";

import anim from "../../assets/create.png";
import selection from "../../assets/pref.png";
import Map from "./Map";
import { addFarm } from "@/services/farmService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService from "@/services/authService";

import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const step1Schema = z.object({
  farm_name: z.string().nonempty({ message: "Enter a valid farm name" }),
});

const step2Schema = z.object({
  line_address1: z.string().min(1, "Enter a line address"),
  line_address2: z.string().optional(),
  country: z.string().min(1, "Enter a valid country"),
  state: z.string().min(1, "Enter a valid state"),
});

const step3Schema = z.object({
  currency: z.string().min(1, "Enter a valid currency"),
  measuring_system: z.string().min(1, "Enter a valid measuring system"),
});

type TStep1Schema = z.infer<typeof step1Schema>;
type TStep2Schema = z.infer<typeof step2Schema>;
type TStep3Schema = z.infer<typeof step3Schema>;

interface LatLng {
  lat: number;
  lng: number;
}

const center: LatLng = { lat: 48.8584, lng: 2.2945 };

const RegisterFarm = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);


  // Function to initialize Autocomplete
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  // Function to handle place selection
  const onPlaceChanged = () => {
   if (autocomplete !== null) {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location || !map) {
      return;
    }

      const location = place.geometry.location;
      const newCenter = { lat: location.lat(), lng: location.lng() };

      // Set new center on the map
      map.panTo(newCenter);
      map.setZoom(15);

      // Do other things as needed with the place data
    }
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCdpkVg4cZmmIzFPVyyTO7TCPZrVybZjUo",
    libraries: ["places"],
  });

  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});

  const navigate = useNavigate();

  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(
      step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema
    ),
  });

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (stepData: any) => {
    if (step < 3) {
      if (step === 1) {
        setStep1Data(stepData);
      } else if (step === 2) {
        setStep2Data(stepData);
      } else if (step === 3) {
        setStep3Data(stepData);
      }
      nextStep();
    } else {
      // Submit the final data to the server
      const finalData = {
        ...step1Data,
        ...step2Data,
        ...step3Data,
        // ...stepData, // Include step3Data
      };
      console.log("formdata>>", finalData);
      try {
        const { data } = await addFarm(finalData);

        if (data?.status === "success") {
          toast.success(data?.message);
          navigate(`/login`, {
            replace: true,
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const renderProgressIndicator = () => {
    return (
      <div className="text-left mt-14">
        <div className="text-gray-600 dark:text-gray-400 pt-5">
          Step {step} of 3
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          {step === 1 && (
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "33%" }}
            ></div>
          )}
          {step === 2 && (
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "66%" }}
            ></div>
          )}
          {step === 3 && (
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "100%" }}
            ></div>
          )}
        </div>
      </div>
    );
  };
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (
      !originRef.current ||
      !destinationRef.current ||
      originRef.current.value === "" ||
      destinationRef.current.value === ""
    ) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance?.text || "");
    setDuration(results.routes[0].legs[0].duration?.text || "");
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    if (originRef.current) originRef.current.value = "";
    if (destinationRef.current) destinationRef.current.value = "";
  }

  return (
    <div className="bg-[#eaf8f2] h-full">
      <div>
        <img
          src={logo}
          alt="acre logo"
          className="absolute left-4 top-0 w-[120px]  flex flex-col md:ml-5 lg:mr-28 xl:mx-28"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="">
                  {renderProgressIndicator()}
                  <div className="">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      {step === 1 && (
                        <>
                          <div className="my-10">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                              Create your first farm
                            </h1>
                            <p className="text-gray-500 text-xs py-2">
                              Start out with creating and naming your first farm
                              on Acre
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
                              <p className="text-red-500 text-sm">
                                {errors.farm_name.message?.toString()}
                              </p>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="bg-green-500 my-4 w-full hover:bg-green-700 text-white font-semibold py-2 rounded-lg focus:outline-none focus:shadow-outline"
                            // onClick={nextStep}
                          >
                            Continue
                          </button>
                          {/* <Map /> */}
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div className="mt-14">
                            <div className="my-5">
                              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Where is your farm located?
                              </h1>
                              <p className="text-gray-500 text-xs py-2">
                                Enter your farm's line address
                              </p>
                            </div>

                            <div className="my-2">
                              <label
                                htmlFor="line_address1"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                              >
                                Line Address 1
                              </label>
                              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                              <input
                                type="text"
                                id="line_address1"
                                {...register("line_address1", {
                                  required: "Line Address 1 is required",
                                })}
                                // ref={originRef}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              />
                              </Autocomplete>

                              {errors.line_address1 && (
                                <p className="text-red-500 text-sm">
                                  {errors.line_address1.message?.toString()}
                                </p>
                              )}
                            </div>

                            <div className="my-2">
                              <label
                                htmlFor="line_address2"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                              >
                                Line Address 2
                              </label>

                              <input
                                {...register("line_address2")}
                                // ref={destinationRef}
                                type="text"
                                id="line_address2"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              />

                              {/* {errors.address2 && (
                                <p className="text-red-500 text-sm">
                                  {errors.address2.message?.toString()}
                                </p>
                              )} */}
                            </div>
                           

                            {/* <HStack
                              spacing={4}
                              mt={4}
                              justifyContent="space-between"
                            >
                              <Text>Distance: {distance} </Text>
                              <Text>Duration: {duration} </Text>
                              <IconButton
                                aria-label="center back"
                                icon={<FaLocationArrow />}
                                isRound
                                onClick={() => {
                                  if (map) {
                                    map.panTo(center);
                                    map.setZoom(15);
                                  }
                                }}
                              />
                            </HStack> */}

                            <div className="flex flex-row gap-5 w-full">
                              <div className="w-full">
                                <label
                                  htmlFor="country"
                                  className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                  Country
                                </label>
                                <select
                                  {...register("country", {
                                    required: "Country is required",
                                  })}
                                  id="country"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                >
                                  <option value="">Select a country</option>
                                  <option value="Nigeria">Nigeria</option>
                                </select>
                                {/* {errors.country && (
                                  <p className="text-red-500 text-sm">
                                    {errors.country.message?.toString()}
                                  </p>
                                )} */}
                              </div>

                              <div className="w-full">
                                <label
                                  htmlFor="state"
                                  className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                  State
                                </label>
                                <select
                                  {...register("state")}
                                  id="state"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                >
                                  <option value="">Select a state</option>
                                  <option value="Adamawa">Adamawa</option>
                                  {/* Add more options for different countries as needed */}
                                </select>
                                {/* {errors.state && (
                                  <p className="text-red-500 text-sm">
                                    {errors.state.message?.toString()}
                                  </p>
                                )} */}
                              </div>
                            </div>

                            <div className="flex flex-row my-2 gap-2">
                              <button
                                className="border border-green-500 my-2 w-full hover:bg-gray-200 text-green-600  py-2 rounded-lg focus:outline-none focus:shadow-outline"
                                onClick={prevStep}
                              >
                                Back
                              </button>

                              <button
                                className="bg-green-500 my-2 w-full hover:bg-green-700 text-white  py-2 rounded-lg focus:outline-none focus:shadow-outline"
                                type="submit"
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {step === 3 && (
                        <div>
                          <div className="my-10">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                              What are your preferences?
                            </h1>
                            <p className="text-gray-500 text-xs py-2">
                              Please choose your preferred options from the list
                              below
                            </p>
                          </div>

                          <div>
                            <label
                              htmlFor="currency"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Currency
                            </label>
                            <select
                              {...register("currency", {
                                required: "Currency is required",
                              })}
                              id="currency"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                            >
                              <option value="">Select a currency</option>
                              <option value="Nigeria">Nigeria</option>
                            </select>
                            {errors.currency && (
                              <p className="text-red-500 text-sm">
                                {errors.currency.message?.toString()}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="country"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Measuring System
                            </label>
                            <select
                              {...register("measuring_system", {
                                required: "measuring_system is required",
                              })}
                              id="measuring_system"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                            >
                              <option value="">
                                Select a measuring system
                              </option>
                              <option value="grams">Grams</option>
                            </select>
                            {errors.measuring_system && (
                              <p className="text-red-500 text-sm">
                                {errors.measuring_system.message?.toString()}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-row my-5 gap-2">
                            <button
                              className="border border-green-500  w-full hover:bg-gray-200 text-green-600  py-2 rounded-lg focus:outline-none focus:shadow-outline"
                              onClick={prevStep}
                            >
                              Back
                            </button>

                            <button
                              className="bg-green-500  w-full hover:bg-green-700 text-white  py-2 rounded-lg focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right */}
        <div className="">
          {step === 1 ? (
            <div className="hidden h-screen sm:flex justify-center items-center">
              <div className=" mt-4 mb-4 w-full  relative">
                <img
                  src={anim}
                  alt="Farmer"
                  className="h-[97vh] w-[49vw]  object-cover rounded-lg"
                  style={{ borderRadius: "20px" }}
                />
                <div className="w-[45vw] absolute bottom-4 left-6 right-4 bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-md">
                  <h1 className="text-white text-lg font-bold">
                    Helping you grow
                  </h1>
                  <p className="text-white text-sm">
                    Dive Back into Agricultural Excellence! Unlock New Growth
                    Opportunities and Effortlessly Navigate Your Farm's Success
                    with acre
                  </p>
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="hidden h-screen sm:flex justify-center items-center">
              <div className=" mt-4 mb-4 w-full  relative">
                <div className="h-[97vh] w-[49vw] object-cover rounded-lg">
                  {/* Right side: Google Map Box */}
                  <Grid templateColumns="1fr" h="100vh">
                    <Box position="relative">
                      <Box
                        position="absolute"
                        left={0}
                        top={0}
                        h="100%"
                        w="100%"
                      >
                        <Box
                          position="absolute"
                          left={0}
                          top={0}
                          h="100%"
                          w="100%"
                        >
                          {/* Google Map Box */}
                          <GoogleMap
                            center={center}
                            zoom={15}
                            mapContainerStyle={{
                              width: "100%",
                              height: "100%",
                            }}
                            options={{
                              zoomControl: false,
                              streetViewControl: false,
                              mapTypeControl: false,
                              fullscreenControl: false,
                            }}
                            onLoad={(map) => setMap(map as google.maps.Map)}
                          >
                            <Marker position={center} />
                            {directionsResponse && (
                              <DirectionsRenderer
                                directions={directionsResponse}
                              />
                            )}
                          </GoogleMap>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden h-screen sm:flex justify-center items-center">
              <div className=" mt-4 mb-4 w-full  relative">
                <img
                  src={selection}
                  alt="Farmer"
                  className="h-[97vh] w-[49vw]  object-cover rounded-lg"
                  style={{ borderRadius: "20px" }}
                />
                <div className="w-[45vw] absolute bottom-4 left-6 right-4 bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-md">
                  <h1 className="text-white text-lg font-bold">
                    Helping you grow
                  </h1>
                  <p className="text-white text-sm">
                    Dive Back into Agricultural Excellence! Unlock New Growth
                    Opportunities and Effortlessly Navigate Your Farm's Success
                    with acre
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterFarm;
