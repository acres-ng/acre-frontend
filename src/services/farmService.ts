import http from "./HttpService";
import { API_URL } from "@/config";
import { getUserLocal } from "./userService";
import { Country } from "country-state-city";
import { getCurrentUser, setCurrentUser } from "./authService";
import { Farm } from "@/lib/types";

const apiUrl = API_URL + "farms";

interface Verify {
  contact: string;
  otp: string;
}

export async function addFarm(formData: any) {
  return http.post(apiUrl, formData, http.getDefaultOptions());
}

export function verifyOtp(data: Verify) {
  return http.post(API_URL + "auth/verify_otp", data);
}

export function sendOtp(data: any) {
  return http.post(API_URL + "auth/send_otp", data);
}

export async function getFarmById(id: number) {
  const { data } = await http.get(
    API_URL + "farms/" + id,
    http.getDefaultOptions()
  );
  if (data.status === "success") {
    const user = getCurrentUser();
    const farms: Farm[] = [
      {
        id: data.data.id,
        farm_name: data.data.farm_name,
        country: data.data.country,
        line_address1: data.data.line_address1,
        line_address2: data.data.line_address2,
        state: data.data.state,
        geocode: data.data.geocode,
      },
    ];
    user.farms = farms;
    setCurrentUser(user);
  }
  return data;
}

export function getActiveFarm() {
  return getUserLocal().farms[0];
}

/**
 * Returns the localized time of active farm in the correct timezone
 * @returns string
 */
export function getFarmLocalTime() {
  const farmCountry = Country.getCountryByCode(getActiveFarm().country);
  const farmTimezone =
    farmCountry && farmCountry.timezones
      ? farmCountry.timezones[0].zoneName
      : null;

  const time = farmTimezone
    ? new Date(
        new Date().toLocaleString("en-US", { timeZone: farmTimezone })
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : new Date().toLocaleTimeString();

  return time;
}

export async function getMeasuringUnits(type: string = 'mass', system: string = 'metric') {
  const { data } = await http.get(
    API_URL + `utils/measuring_units?type=${type}&system=${system}`,
    http.getDefaultOptions()
  );
  return data.data;
}






