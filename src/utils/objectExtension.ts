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

      if (typeof newItem === "string") {
        const iNewItem = newItem * 1;
        if (!isNaN(iNewItem)) {
          return [...acc, newItem];
        }
      }

      return [...acc, newItem];
    }, []);
  }

  return Object.keys(obj).reduce((acc, key) => {
    const newItem = obj[key];

    if (typeof newItem === "object") {
      acc[key] = ObjectClean(newItem);
    } else if (typeof key === "string" && newItem.length !== 0) {
      const iNewItem = newItem * 1;
      if (!isNaN(iNewItem)) {
        acc[key] = iNewItem;
      } else {
        acc[key] = newItem;
      }
    }

    return acc;
  }, {});
}
