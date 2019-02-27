export const typeFinder = value =>
  Array.isArray(value) ? "array" : value instanceof Object ? "object" : false;

export const collectionValidator = collection => {
  return collection.reduce((a, c) => {
    if (a === null) {
      return typeFinder(c);
    } else {
      return typeFinder(c) === a ? a : false;
    }
  }, null);
};
