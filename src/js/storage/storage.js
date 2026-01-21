function LoadCachedLogByDate(date) {
  const data = localStorage.getItem(date);

  if (data === null || data === "undefined") {
    return { calories: 0, items: 0 };
  }

  return JSON.parse(data);
}

function RemoveCachedItems() {
  localStorage.removeItem("items");
}

function CacheLogByDate(date, data) {
  CacheData(date, data);
}

function LoadCachedItems() {
  return GetCachedData("items");
}

function CacheItems(products) {
  CacheData("items", products);
}

function CacheData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function GetCachedData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : JSON.parse("[]");
}

const storage = {
  LoadCachedItems,
  CacheItems,
  RemoveCachedItems,
  LoadCachedLogByDate,
  CacheLogByDate,
};

export default storage;
