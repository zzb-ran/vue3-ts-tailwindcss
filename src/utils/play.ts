export const setStorage = (key: string, data: object) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data === null ? undefined : JSON.parse(data);
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};
