export function isNil<T>(
  value: T | undefined | null
): value is undefined | null {
  if (typeof value === "undefined" || value === null) return true;
  return false;
}

export function isNotNil<T>(value: T | undefined | null): value is T {
  if (isNil(value)) return false;
  return true;
}
