import api from "./api.js";

async function GetProductsCategories() {
  const processedData = await api.ProcessApi(
    "https://nutriplan-api.vercel.app/api/products/categories?page=1&limit=300"
  );

  return await processedData.results;
}

async function GetProductsBySearch(query, isLimited = true) {
  let limit = isLimited ? "&limit=24" : "&limit=10000000";

  const processedData = await api.ProcessApi(
    `https://nutriplan-api.vercel.app/api/products/search?q=${query}&page=1${limit}`
  );

  return await processedData;
}

async function GetProductsByBarCode(barcode) {
  const processedData = await api.ProcessApi(
    `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`
  );

  return await processedData.result;
}

async function GetProductsByCategories(category) {
  const processedData = await api.ProcessApi(
    `https://nutriplan-api.vercel.app/api/products/category/${category}?page=1&limit=24`
  );

  return await processedData;
}

const productApi = {
  GetProductsCategories,
  GetProductsByCategories,
  GetProductsBySearch,
  GetProductsByBarCode,
};

export default productApi;
