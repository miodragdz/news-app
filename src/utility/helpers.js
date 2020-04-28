export const generateUniqueString = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const isObject = value =>
  typeof value === 'object' && !Array.isArray(value) && value !== null;

export const isArray = value => Array.isArray(value);

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function isArrayEmpty(array) {
  return isArray(array) && array.length === 0;
}

export const objectHasProperty = (object, property) => {
  return object[property] !== undefined;
};
