import { STORAGE_KEYS } from "@Constant/storageKeys";

export function getLocalStorage<T extends keyof typeof STORAGE_KEYS, U>(
  key: T,
  defaultValue: U
) {
  const storageValue = localStorage.getItem(key);

  return storageValue === null ? defaultValue : JSON.parse(storageValue);
}

export function setLocalStorage<T extends keyof typeof STORAGE_KEYS>(
  key: T,
  value: string | object
) {
  localStorage.setItem(key, JSON.stringify(value));
}
