export const merge = (obj1: Object, obj2: Object): Object => {
  const mergedObj = {};

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        mergedObj[key] = merge(obj1[key], obj2[key]);
      } else {
        mergedObj[key] = obj1[key];
      }
    }
  }

  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj2[key] === "object" && typeof obj1[key] === "undefined") {
        mergedObj[key] = obj2[key];
      } else if (
        typeof obj2[key] === "object" &&
        typeof obj1[key] === "object"
      ) {
        mergedObj[key] = merge(obj1[key], obj2[key]);
      } else {
        mergedObj[key] = obj2[key];
      }
    }
  }

  return mergedObj;
};