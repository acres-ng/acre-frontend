import { ROLES } from './constants';
import { PERMISSIONS, STATUSES } from './users-data';

export const statuses = Object.values(STATUSES).map((status) => ({
  name: status,
  value: status,
}));
export const permissions = Object.values(PERMISSIONS).map((permission) => ({
  name: permission,
  value: permission,
}));
export const roles = Object.entries(ROLES).map(([key, value]) => ({
  name: value,
  value: key,
}));
