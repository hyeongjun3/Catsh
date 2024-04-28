export function isDev() {
  return import.meta.env.DEV;
}

// HJ TODO: 다른 방법 있을듯
export function isLocalDesktop() {
  return true;
}
