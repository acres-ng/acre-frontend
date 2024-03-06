// import { ROLES } from "./constants";
// import { avatarIds } from "./get-avatar";
// import { getRandomArrayElement } from "./get-random-array-element";

export type User = {
  id: string;
  avatar: string;
  fullName: string;

  // createdAt: Date;
  price: keyof typeof PRICE;
  status: keyof typeof STATUSES;
};

export const PRICE = {
  amount: "N15,000",
} as const;

export const STATUSES = {
  Pending: "Pending",
  Active: "Active",
  Deactivated: "Deactivated",
} as const;

export const usersData = [
  {
    id: "NutriBlend Pro",
    fullName: "Rabbits",

    price: "N15,000",
    status: STATUSES.Pending,
  },

  {
    id: "BioHarvest Boost",
    // avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
    //   avatarIds
    // )}.webp`,
    fullName: "Poultry",

    price: "N22,000",

    status: STATUSES.Active,
  },
];
