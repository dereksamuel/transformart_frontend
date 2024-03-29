const getLocalStorage = (key) => {
  try {
    return JSON.parse(JSON.stringify(localStorage.getItem(key)));
  } catch (error) {
    console.error(error);
    return null;
  }
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export {
  getLocalStorage,
  setLocalStorage
};
