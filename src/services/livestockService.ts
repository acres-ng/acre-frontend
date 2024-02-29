import http, { getDefaultOptions } from "./HttpService";
import { getActiveFarm } from "./farmService";
import * as config from "../config";
import { error } from "console";
import { toast } from "sonner";
import { object } from "zod";
import {
  Animal,
  AnimalBreed,
  AnimalMaturity,
  AnimalWithTraits,
} from "@/lib/types";
import { setAnimalLocal } from "./localCacheService";

export const getFarmLivestock = async (farmId?: number, query?: string) => {
  const activeFarmId = farmId ?? getActiveFarm().id;
  const url = `${config.API_URL}farms/${activeFarmId}/livestock${query ? `?${query}` : ""}`;
  const { data } = await http.get(url, getDefaultOptions());
  if (data.status === "success") {
    return data.data;
  } else {
    toast.error(data.message);
    return null;
  }
};

export const getAnimals = async (id?: number | string, props?: string) => {
  let url = id ? config.API_URL + "animals/" + id : config.API_URL + "animals";
  url = props ? url + `?props=${props}` : url;
  const { data } = await http.get(url, getDefaultOptions());
  if (data.status === "success") {
    if (!id) {
      setAnimalAndTraits(data.data);
    }
    return data;
  } else {
    toast.error(data.message);
    return null;
  }
};

export const setAnimalAndTraits = (data:Animal[]) => {
  const animalsFlattened: Animal[] = [];
  const breedsFlattened: AnimalBreed[] = [];
  const maturityFlattened: AnimalMaturity[] = [];

  data.map((animal: Animal) => {
    const animalObj = {
      id: animal.id,
      name: animal.name,
      code: animal.code,
    };
    animalsFlattened.push(animalObj);
    animal.breeds?.map((breed: AnimalBreed) => {
      const breedObj = {
        id: breed.id,
        name: breed.name,
        animal_type: animal.id,
      };
      breedsFlattened.push(breedObj);
    });

    animal.maturity?.map((maturity: AnimalMaturity) => {
      const maturityObj = {
        id: maturity.id,
        name: maturity.name,
        animal_type: animal.id.toString(),
        min_days: maturity.min_age_in_days,
        max_days: maturity.max_age_in_days
      };
      maturityFlattened.push(maturityObj);
    });
  });

  const animalsTraitsObj: AnimalWithTraits = {
    animals: animalsFlattened,
    breeds: breedsFlattened,
    maturity: maturityFlattened,
  };
  setAnimalLocal(animalsTraitsObj);
};

export const getLivestockHousing = async (housingId?: string) => {
  const activeFarmId = getActiveFarm().id;
  let url = `${config.API_URL}farms/${activeFarmId}/housing`;
  url = housingId ? `${url}/${housingId}` : url;
  const { data } = await http.get(url, getDefaultOptions());
  if (data.status === "success") {
    return data.data;
  } else {
    toast.error(data.message);
    return null;
  }
};


export const getFarmFeed = async (farmId?: number) => {
  const activeFarmId = farmId ?? getActiveFarm().id;
  const url = `${config.API_URL}farms/${activeFarmId}/feeds`;
  const { data } = await http.get(url, getDefaultOptions());
  if (data.status === "success") {
    return data.data;
  } else {
    return null;
    toast.error(data.message);
  }
};

export async function getTransactionUtils() {
  try {
    const activeFarmId = getActiveFarm().id;
    const url = `${config.API_URL}farms/${activeFarmId}/transactions/utils`;
    const response = await http.get(url, getDefaultOptions());
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      toast.error(response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching transaction utilities:", error);
    throw error;
  }
}


