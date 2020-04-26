export const generateUniqueString = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const removeLastItemFromArray = array =>
  array.slice(0, array.length - 1);

export const replaceObjectInList = (items, index, updatedProp) => {
  const updatedItem = { ...items[index], ...updatedProp };

  return [
    ...items.slice(0, index),
    updatedItem,
    ...items.slice(index + 1, items.length),
  ];
};

export const arrayToObjectByKey = (arr, key) =>
  arr.reduce((obj, item) => {
    if (obj[item[key]]) return obj;

    return {
      ...obj,
      [item[key]]: arr.filter(el => el[key] === item[key]),
    };
  }, {});

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

export const trimString = string => string.trim();

export const makeSpecificValueInArrayOfObjectsFirst = (
  array,
  selectedValueId
) => {
  return array.reduce((acc, value) => {
    if (value.id === selectedValueId) {
      return [value, ...acc];
    }
    return [...acc, value];
  }, []);
};

export const replacePropsInObject = (obj, props) => {
  return {
    ...obj,
    ...props,
  };
};

export const checkTypeEquality = (item, type) => {
  return typeof item === type;
};

export const getUnionOfTwoArrays = (firstArray, secondArray, key) => {
  const unique = new Set();

  return firstArray.concat(secondArray).filter(arrayItem => {
    return unique.has(arrayItem[key]) ? false : unique.add(arrayItem[key]);
  });
};

export const isArraySubset = (array, subsetArray) => {
  const set = new Set(array.map(item => item.id));
  if (set.size === 0) {
    return false;
  }
  return (
    subsetArray.filter(arrayItem => {
      return set.has(arrayItem.id);
    }).length === subsetArray.length
  );
};

export const debounce = (fn, delay = 150) => {
  let timeout;

  return function(...args) {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, delay);
  };
};

export const makeLastItemInArrayFirst = array => {
  return Array.of(array[array.length - 1]).concat(
    array.slice(0, array.length - 1)
  );
};
