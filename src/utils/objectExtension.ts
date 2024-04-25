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

export function ObjectClean(obj: object) {
  if (obj instanceof Array) {
    return obj.reduce((acc, item) => {
      let newItem;
      if (typeof item === "object") {
        newItem = ObjectClean(item);
      } else if (typeof item === "string" && item.length == 0) {
        newItem = null;
      }

      if (newItem === undefined || newItem === null) {
        return acc;
      }

      return [...acc, newItem];
    }, []);
  }

  return Object.keys(obj).reduce((acc, key) => {
    // @ts-ignore
    if (typeof obj[key] === "object") {
      // @ts-ignore
      acc[key] = ObjectClean(obj[key]);
      // @ts-ignore
    } else if (typeof key === "string" && obj[key].length !== 0) {
      // @ts-ignore
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
