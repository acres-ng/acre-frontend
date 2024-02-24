import { ROLES } from "./constants";
import { avatarIds } from "./get-avatar";
import { getRandomArrayElement } from "./get-random-array-element";

// {
//   "name": "GT1706143390",
//   "id": 19,
//   "uuid": "9b2c3f12-dea9-42c2-926b-d771f59382ed",
//   "animal_type": "Goat",
//   "animal_id": "2",
//   "breed": "Red Sokoto (Maradi)",
//   "sex": "male",
//   "weight": 4253,
//   "measuring_unit": "kg",
//   "price": 0,
//   "quantity": 50,
//   "status": "okay",
//   "age": 200,
//   "maturity_id": null,
//   "is_flock": 1,
//   "stocking_date": "2023-11-17",
//   "housing_id": "9b213e49-0aaa-48bd-b85e-fac076769b94"
// },



// {
  //   "name": "GT1706143390",
  //   "animal_type": "Goat",
  //   "breed": "Red Sokoto (Maradi)",
  //   "quantity": 50,
  //   "maturity_public_name": null,
  //   "status": "okay",
  //   "stocking_date": "2023-11-17",
// },


export type User = {
  id: string;
  avatar: string;
  fullName: string;
  role: keyof typeof ROLES;
  // createdAt: Date;
  permissions: keyof typeof PERMISSIONS;
  price: keyof typeof PRICE;
  status: keyof typeof STATUSES;
};

export const PRICE = {
  amount: "N15,000",
} as const;

export const PERMISSIONS = {
  Read: "Read",
  Write: "Write",
  Delete: "Delete",
} as const;

export const STATUSES = {
  Pending: "Pending",
  Active: "Active",
  Deactivated: "Deactivated",
} as const;

export const usersData = [
  {
    id: "NutriBlend Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Rabbits",
    role: ROLES.Manager,
    price: "N15,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
  {
    id: "OmegaMax Essentials",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Rabbits",

    role: ROLES.Support,
    price: "N15,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "PoultryPower Plus",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Rabbits",

    role: ROLES.Support,
    price: "N15,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "FiberFuel Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Camels",

    role: ROLES.RestrictedUser,
    price: "N15,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete],
    status: STATUSES.Deactivated,
  },
  {
    id: "GreenHarvest Elite",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Camels.",

    role: ROLES.RestrictedUser,
    price: "N15,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write, PERMISSIONS.Delete],
    status: STATUSES.Pending,
  },
  {
    id: "AquaPrime NutraMix",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Camels",

    role: ROLES.Manager,
    price: "N15,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
  {
    id: "VitalGlow Balance",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Camels",

    role: ROLES.RestrictedUser,
    price: "N15,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "FreshBite Spectrum",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Chicken",

    role: ROLES.Sales,
    price: "N15,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "NatureVibe Crunch",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Developer,
    price: "N15,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "HarvestGold Fusion",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Administrator,
    price: "N15,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
  {
    id: "BioNutri Vitality",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Customer,
    price: "N15,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "AquaCrisp Enhance",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Administrator,
    price: "N15,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "FarmFiesta Prime",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.HRD,
    price: "N22,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "HerbalGraze Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Administrator,
    price: "N22,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "NutraPulse Complete",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Administrator,
    price: "N22,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "ProVita Essence",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Customer,
    price: "N22,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "AquaGlow Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Administrator,
    price: "N22,000",
    permissions: [PERMISSIONS.Delete],
    status: STATUSES.Pending,
  },
  {
    id: "FruityFeast Deluxe",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Support,
    price: "N22,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "VitalBite Fusion",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Horses",

    role: ROLES.Administrator,
    price: "N22,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "ProMunch Supreme",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Developer,
    price: "N22,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete, PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "UltraGraze Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Developer,
    price: "N22,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "BioHarvest Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Manager,
    price: "N22,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Pending,
  },
  {
    id: "BioHarvest Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Support,
    price: "N22,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "EcoBlend Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.RestrictedUser,
    price: "N22,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "GrainMaster Plus",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Sales,
    price: "N22,000",
    permissions: [PERMISSIONS.Delete],
    status: STATUSES.Pending,
  },
  {
    id: "FreshVibe Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Support,
    price: "N22,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
  {
    id: "AquaFusion Elite",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Support,
    price: "N22,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "HerbalBurst Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Developer,
    price: "N22,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "PoultryPeak Deluxe",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Developer,
    price: "N22,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "OmegaVita Fusion",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Manager,
    price: "N22,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write, PERMISSIONS.Delete],
    status: STATUSES.Pending,
  },
  {
    id: "NatureNourish Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Sales,
    price: "N22,000",
    permissions: [PERMISSIONS.Delete],
    status: STATUSES.Pending,
  },
  {
    id: "HarvestHub Elite",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Sales,
    price: "N22,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Deactivated,
  },
  {
    id: "AquaHarmony Blend",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Support,
    price: "N22,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "NutriCraze Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.HRD,
    price: "N22,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Deactivated,
  },
  {
    id: "GreenGlow Essentials",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Customer,
    price: "N22,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Deactivated,
  },
  {
    id: "AquaCrunch Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Poultry",

    role: ROLES.Customer,
    price: "N30,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "ProVibe Complete",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Administrator,
    price: "N30,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Deactivated,
  },
  {
    id: "VitalHarvest Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.HRD,
    price: "N30,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "BioFeast Fusion",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.HRD,
    price: "N30,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "AquaBite Essentials",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Sales,
    price: "N30,000",
    permissions: [PERMISSIONS.Delete],
    status: STATUSES.Pending,
  },
  {
    id: "FruityFusion Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Manager,
    price: "N30,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "VitalBlend Supreme",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Support,
    price: "N30,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "FreshHarvest Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Customer,
    price: "N30,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "FarmVita Elite",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Manager,
    price: "N30,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "NutriCrunch Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Manager,
    price: "N30,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "HerbalHarmony Plus",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Sales,
    price: "N30,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Deactivated,
  },
  {
    id: "PoultryFiesta Fusion",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.HRD,
    price: "N30,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write, PERMISSIONS.Delete],
    status: STATUSES.Deactivated,
  },
  {
    id: "AquaPulse Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.HRD,
    price: "N30,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "NatureBlend Supreme",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Manager,
    price: "N30,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
  {
    id: "EcoGraze Essentials",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Manager,
    price: "N30,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "ProGlow Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Goats",

    role: ROLES.Sales,
    price: "N30,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Deactivated,
  },
  {
    id: "NutriHarvest Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.HRD,
    price: "N30,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "AquaPrime Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Developer,
    price: "N30,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete, PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "FruityEssence Elite",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Sales,
    price: "N30,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "HarvestFusion Fusion",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Administrator,
    price: "N30,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Deactivated,
  },
  {
    id: "HerbalMax Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Sales,
    price: "N30,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "FreshBurst Deluxe",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Sales,
    price: "N30,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "OmegaBlend Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Administrator,
    price: "N30,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "ProCraze Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Support,
    price: "N30,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "NatureBite Plus",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Customer,
    price: "N30,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "NatureBite Plus",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Support,
    price: "N40,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "AquaFuel Essentials",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Developer,
    price: "N40,000",
    permissions: [PERMISSIONS.Delete],
    status: STATUSES.Pending,
  },
  {
    id: "VitalFusion Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Manager,
    price: "N40,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "NutraCrave Elite",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Sales,
    price: "N40,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "EcoFeast Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.HRD,
    price: "N40,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Deactivated,
  },
  {
    id: "GreenHarvest Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Customer,
    price: "N40,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "AquaBalance Plus",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.Sales,
    price: "N40,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "FreshVitality Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Louis Rippin",

    role: ROLES.RestrictedUser,
    price: "N40,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "NutriPulse Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.HRD,
    price: "N40,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "PoultryEssentials Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sheep",

    role: ROLES.HRD,
    price: "N40,000",
    permissions: [PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "9NatureGraze Fusion681",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.HRD,
    price: "N40,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "HerbalPeak Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.HRD,
    price: "N50,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "AquaFiesta Supreme",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.Administrator,
    price: "N50,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Write, PERMISSIONS.Delete],
    status: STATUSES.Deactivated,
  },
  {
    id: "FruityMax Essentials",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.Developer,
    price: "N50,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "HarvestHarmony Plus",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.Support,
    price: "N50,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "ProVital Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.RestrictedUser,
    price: "N50,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete, PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "VitalCraze Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.Sales,
    price: "N50,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete, PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "AquaGraze Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.Sales,
    price: "N50,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read, PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "BioFusion Fusion",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.RestrictedUser,
    price: "N50,000",
    permissions: [PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "EcoCrunch Essentials",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.Developer,
    price: "N50,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "FreshBlend Plus",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pigs",

    role: ROLES.Support,
    price: "N50,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "NutraFiesta Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.HRD,
    price: "N50,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "NutraFiesta Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Manager,
    price: "N50,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "NutraFiesta Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Developer,
    price: "N50,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read, PERMISSIONS.Delete],
    status: STATUSES.Pending,
  },
  {
    id: "NutraFiesta Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Customer,
    price: "N150,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
  {
    id: "NutraFiesta Max",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.HRD,
    price: "N150,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete],
    status: STATUSES.Deactivated,
  },
  {
    id: "HerbalEssence Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Customer,
    price: "N150,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Deactivated,
  },
  {
    id: "Cattle",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Leroy Buckridge",

    role: ROLES.RestrictedUser,
    price: "N150,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Active,
  },
  {
    id: "HerbalEssence Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Sales,
    price: "N150,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
  {
    id: "HerbalEssence Pro",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Customer,
    price: "N150,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
  {
    id: "AquaBurst Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Manager,
    price: "N150,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete],
    status: STATUSES.Active,
  },
  {
    id: "AquaBurst Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.HRD,
    price: "N150,000",
    permissions: [PERMISSIONS.Read],
    status: STATUSES.Deactivated,
  },
  {
    id: "AquaBurst Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.RestrictedUser,
    price: "N150,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "AquaBurst Harmony",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.HRD,
    price: "N150,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Deactivated,
  },
  {
    id: "FruityPrime Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Customer,
    price: "N150,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete],
    status: STATUSES.Deactivated,
  },
  {
    id: "FruityPrime Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Developer,
    price: "N150,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "FruityPrime Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.HRD,
    price: "N150,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Delete, PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
  {
    id: "FruityPrime Boost",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Customer,
    price: "N150,000",
    permissions: [PERMISSIONS.Write],
    status: STATUSES.Active,
  },
  {
    id: "ProGraze Supreme",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Manager,
    price: "N150,000",
    permissions: [PERMISSIONS.Delete, PERMISSIONS.Write],
    status: STATUSES.Pending,
  },
  {
    id: "ProGraze Supreme",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Cattle",

    role: ROLES.Manager,
    price: "N150,000",
    permissions: [PERMISSIONS.Write, PERMISSIONS.Read],
    status: STATUSES.Pending,
  },
];
