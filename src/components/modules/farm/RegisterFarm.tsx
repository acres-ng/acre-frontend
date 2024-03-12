import { useEffect, useState, useRef, useContext } from "react";
import { State } from "country-state-city";
import { Country as CountryType } from "country-state-city";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../../assets/images/logo.png";
import { FaLocationDot } from "react-icons/fa6";
import anim from "../../../assets/images/create.png";
import selection from "../../../assets/images/pref.png";
import axios from "axios";
import { addFarm, getActiveFarm } from "@/services/farmService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setCurrentUser } from "@/services/authService";
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
import AuthContext from "../../context/authContext";

interface Option {
  value: string;
  displayValue: string;
  iso: string | undefined;
}

const step1Schema = z.object({
  farm_name: z
    .string()
    .nonempty({ message: "Enter a valid farm name" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Farm name cannot be empty or contain only whitespace",
    }),
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

const center: LatLng = { lat: 8.887692191562305, lng: 7.184876852041654 };

const RegisterFarm = () => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const authContext = useContext(AuthContext);
  // Function to initialize Autocomplete
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };
  const [farmAddress, setCountryAndState] = useState({
    country: "",
    state: "",
  });
  const [isLoading, setLoader] = useState(false);

  const getCountries = (selectedCountry?: string) => {
    return CountryType.getAllCountries().map((country, index) => ({
      value: country.name,
      displayValue: `${country.name}`,
      iso: `${country.isoCode}`,
      selected:
        selectedCountry && selectedCountry == country.isoCode
          ? true
          : index == 0
          ? true
          : false,
    }));
  };
  const [countryData, setCountryData] = useState(getCountries());

  const getStateData = (countryCode: string, selected?: string) => {
    const states = State.getStatesOfCountry(countryCode).map((state) => ({
      value: `${state.name}`,
      displayValue: `${state.name}`,
      iso: `${state.isoCode}`,
      selected: selected === state.name ? true : false,
    }));
    return states;
  };

  const [statesData, setStateData] = useState(getStateData("AF"));
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);

  /**
   *  populates the state dropdown with valid states for selected country
   */
  const populateStateSelect = (country: string, selectState?: string) => {
    const countryCode = country ?? farmAddress.country;
    const stateData = getStateData(countryCode, selectState);
    const stateExists = stateData.filter(
      (state) => state.value === selectState
    )[0];
    const selectedState =
      selectState && stateExists ? selectState : stateData[0].value;
    setStateData(stateData);
    setCountryAndState({
      country: countryCode,
      state: selectedState,
    });
  };

  const onPlaceChanged = async () => {
    if (autocomplete === null) return;
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location || !map) return;
    const location = place.geometry.location;
    const newCenter = { lat: location.lat(), lng: location.lng() };
    const geocodeValue = `${location.lat()}, ${location.lng()}`;
    // Extract address components
    const addressComponents = place.address_components;
    let updatedCountry = "";
    let updatedState = "";
    if (addressComponents) {
      for (const component of addressComponents) {
        if (component.types.includes("country")) {
          updatedCountry = component.short_name;
        } else if (component.types.includes("administrative_area_level_1")) {
          updatedState = component.long_name;
        }
      }
    }
    //selects country in the dropdown
    setCountryData(getCountries(updatedCountry));
    //populates and selects state for the updatedCountry in the dropdown
    populateStateSelect(updatedCountry, updatedState);
    // sets marker
    setMarkerPosition(newCenter);
    // sets updated address data
    setStep2Data({
      geocode: geocodeValue,
      country: updatedCountry,
      state: updatedState,
    });

    try {
      // Set new center on the map
      map.panTo(newCenter);
      map.setZoom(15);
    } catch (error) {
      console.error("Error in onPlaceChanged:", error);
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});

  const navigate = useNavigate();
  const user = authService.getCurrentUser();

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
    setLoader(false); //enable submit button in step3
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (stepData: any) => {
    if (step < 3) {
      if (step === 1) {
        setStep1Data(stepData);
      } else if (step === 2) {
        const step2merge = {
          ...stepData,
          ...step2Data,
        };
        setStep2Data(step2merge);
      } else if (step === 3) {
        setStep3Data(stepData);
      }
      nextStep();
    } else {
      // Submit the final data to the server
      const payload = {
        ...step1Data,
        ...step2Data,
        ...step3Data,
      };
      try {
        setLoader(true); //disables the submit button after click
        const { data } = await addFarm(payload);
        if (data?.status === "success") {
          const farmUser = authService.getCurrentUser();
          const newUser = {
            ...farmUser,
            farms: [
              {
                id: data?.data?.id,
                name: data?.data?.farm_name,
                country: data?.data?.country,
                geocode: data?.data?.geocode,
              },
            ],
          };
          authService.setCurrentUser(newUser);
          authContext.setUser(newUser);
          toast.success(data?.message);
          navigate("/");
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

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

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
  }

  /**
   * USE EFFECT
   */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [
    user,
    step1Data,
    step2Data,
    step3Data,
    statesData,
    farmAddress,
    countryData,
    navigate,
  ]);

  if (!isLoaded) {
    return <SkeletonText />;
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
                                pattern: {
                                  value: /^\S+$/,
                                  message:
                                    "Farm name cannot contain whitespace",
                                },
                              })}
                              id="name"
                              type="text"
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
                                What is the nearest landmark to your farm?
                              </label>
                              <Autocomplete
                                onLoad={onLoad}
                                onPlaceChanged={onPlaceChanged}
                              >
                                <input
                                  type="text"
                                  id="line_address1"
                                  {...register("line_address1", {
                                    required: "Line Address 1 is required",
                                  })}
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
                                What is your farm’s exact address?
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
                                  id="getCountry"
                                  value={farmAddress.country}
                                  onChange={(e) => {
                                    setCountryAndState({
                                      ...farmAddress,
                                      country: e.target.value,
                                    });
                                    populateStateSelect(e.target.value);
                                  }}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                >
                                  {countryData.map((option, index) => (
                                    <option
                                      key={index}
                                      value={option.iso}
                                      selected={option.selected}
                                    >
                                      {option.displayValue}
                                    </option>
                                  ))}
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
                                  id="getState"
                                  value={farmAddress.state}
                                  onChange={(e) =>
                                    setCountryAndState({
                                      ...farmAddress,
                                      state: e.target.value,
                                    })
                                  }
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                >
                                  {statesData.map((option, index) => (
                                    <option
                                      key={index}
                                      value={option.value}
                                      selected={option.selected}
                                    >
                                      {option.displayValue}
                                    </option>
                                  ))}
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
                              <option value="NGN">NGN (Nigeria Naira)</option>
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
                              <option value="metric">
                                Metric - (mg, g, kg, mm, ml, km)
                              </option>
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
                              disabled={isLoading}
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
                            {markerPosition && (
                              <Marker position={markerPosition} />
                            )}
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
