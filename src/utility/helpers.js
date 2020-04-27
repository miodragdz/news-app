export const generateUniqueString = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const replaceObjectInList = (items, index, updatedProp) => {
  const updatedItem = { ...items[index], ...updatedProp };

  return [
    ...items.slice(0, index),
    updatedItem,
    ...items.slice(index + 1, items.length),
  ];
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

export const debounce = (fn, delay = 150) => {
  let timeout;

  return function (...args) {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, delay);
  };
};
