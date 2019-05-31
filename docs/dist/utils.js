const typeFinder = value =>
  value instanceof Array ? "array" : value instanceof Object ? "object" : false;

const collectionValidator = collection => {
  return collection.reduce((a, c) => {
    if (a === null) {
      return typeFinder(c);
    } else {
      return typeFinder(c) === a ? a : false;
    }
  }, null);
};

export { collectionValidator, typeFinder };
