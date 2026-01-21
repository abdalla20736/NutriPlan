import api from "./api.js";

const BASE_URL = `https://nutriplan-api.vercel.app/api/products`;

async function GetProductsCategories() {
  const processedData = await api.ProcessApi(
    `${BASE_URL}/categories?page=1&limit=300`,
  );

  return await processedData.results;
}

async function GetProductsBySearch(query, isLimited = true) {
  let limit = isLimited ? "&limit=24" : "&limit=all";

  const processedData = await api.ProcessApi(
    `${BASE_URL}/search?q=${query}&page=1${limit}`,
  );

  return await processedData;
}

async function GetProductsByBarCode(barcode) {
  const processedData = await api.ProcessApi(`${BASE_URL}/barcode/${barcode}`);

  return await processedData.result;
}

async function GetProductsByCategories(category) {
  const processedData = await api.ProcessApi(
    `${BASE_URL}/category/${category}?page=1&limit=24`,
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
