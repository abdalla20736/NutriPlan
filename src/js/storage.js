function LoadCachedFoodLogProducts() {
  return GetCachedData("products");
}

function CacheFoodLogProducts(products) {
  CacheData("products", products);
}

function CacheData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function GetCachedData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

const storage = {
  LoadCachedFoodLogProducts,
  CacheFoodLogProducts,
};

export default storage;
