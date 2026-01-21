import api from "./api.js";
const BASE_URL = `https://nutriplan-api.vercel.app/api/meals`;
async function GetMealsAreas() {
  const processedData = await api.ProcessApi(`${BASE_URL}/areas`);

  return processedData.results;
}
async function GetMealsCategories() {
  const processedData = await api.ProcessApi(`${BASE_URL}/categories`);

  return await processedData.results;
}

async function GetMealsByCategory(category) {
  const processedData = await api.ProcessApi(
    `${BASE_URL}/filter?category=${category}&page=1&limit=all`,
  );

  return await processedData.results;
}

async function GetMealsByArea(area) {
  const processedData = await api.ProcessApi(
    `${BASE_URL}/filter?area=${area}&page=1&limit=all`,
  );


  return await processedData.results;
}
async function GetMealById(id) {
  const processedData = await api.ProcessApi(`${BASE_URL}/${id}`);

  return await processedData.result;
}

async function GetMealsByTerm(term) {
  const processedData = await api.ProcessApi(
    `${BASE_URL}/search?q=${term}&page=1&limit=25`,
  );

  return processedData.results;
}

async function GetMealsByFirstLetter(firstLetter) {
  const processedData = await api.ProcessApi(
    `${BASE_URL}/search?f=${firstLetter}&page=1&limit=25`,
  );

  return processedData.results;
}

const mealApi = {
  GetMealsByCategory,
  GetMealsCategories,
  GetMealsAreas,
  GetMealsByArea,
  GetMealsByTerm,
  GetMealsByFirstLetter,
  GetMealById,
};

export default mealApi;
