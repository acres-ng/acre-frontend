const animalLocalKey = "animals";

export const getAnimalLocal = () => {
  return getLocalItem(animalLocalKey);
};

export const setAnimalLocal = (data: any) => {
  let status = true;
  try {
    setLocalItem(animalLocalKey, data);
  } catch (error) {
    status = false;
  }
  return status;
};
export const getLocalItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setLocalItem = (key: string, data: any) => {
  const dataStr = JSON.stringify(data);
  localStorage.setItem(key, dataStr);
};

export const updateLocalItem = (key: string, data: any) => {
  const item = getLocalItem(key);
  const newItem = { ...item, ...data };
  const dataStr = JSON.stringify(newItem);
  localStorage.setItem(key, dataStr);
};
