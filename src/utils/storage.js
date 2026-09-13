// storage.js - LocalStorage utility functions

export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to localStorage", error);
  }
};

export const getData = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error retrieving data from localStorage", error);
    return null;
  }
};

export const updateData = (key, newData) => {
  const existingData = getData(key) || (Array.isArray(newData) ? [] : {});
  let updatedData;
  if (Array.isArray(existingData)) {
    updatedData = [...existingData, newData];
  } else {
    updatedData = { ...existingData, ...newData };
  }
  saveData(key, updatedData);
};

export const deleteData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error deleting data from localStorage", error);
  }
};
