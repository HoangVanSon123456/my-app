export const getLocalStorage = (item: string, defaultValue: string = '') => localStorage.getItem(item) || defaultValue;
export const setLocalStorage = (item: string, value: string) => localStorage.setItem(item, value);
export const removeLocalStorage = (item: string) => localStorage.removeItem(item);
