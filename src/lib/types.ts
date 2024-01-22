export type Farm = {
  id: string;
  farm_name: string;
  line_address1: string;
  line_address2: string;
  state: string;
  country: string;
  geocode: string;
};

export type LivestockType = {
  id: number;
  uuid: string;
  name: string;
  animal_type: string;
  quantity: number;
  breed?: string;
  maturity_public_name?: string;
  status?: string;
};

export type Animal = {
  id: string;
  name: string;
  code: string;
  breeds?: AnimalBreed[];
  maturity?:AnimalMaturity[];
};

export type AnimalBreed = {
  id: string;
  name: string;
  animal_type?: string
};

export type AnimalMaturity = {
  name: string;
  id: string;
  min_age_in_days?: number;
  max_age_in_days?: number;
  animal_type?: string
};

export type AnimalWithTraits = {
  animals: Animal[]
  breeds: AnimalBreed[];
  maturity?: AnimalMaturity[];
};
