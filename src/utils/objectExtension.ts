export function hasOwn(object: object, key: PropertyKey) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

export function ObjectFilter(
  object: Object,
  conditionFn: (item: { key: string; value: unknown }) => boolean
) {
  return Object.entries(object).reduce((acc, item) => {
    const [key, value] = item;
    if (conditionFn({ key, value })) return { ...acc, [key]: value };
    return acc;
  }, {});
}
