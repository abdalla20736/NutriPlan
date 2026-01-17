import api from "./api.js";

async function GetMealsAreas() {
  const processedData = await api.ProcessApi(
    "https://nutriplan-api.vercel.app/api/meals/areas"
  );

  return processedData.results;
}
async function GetMealsCategories() {
  const processedData = await api.ProcessApi(
    "https://nutriplan-api.vercel.app/api/meals/categories"
  );

  return await processedData.results;
}

async function GetMealsByCategory(category) {
  const processedData = await api.ProcessApi(
    `https://nutriplan-api.vercel.app/api/meals/filter?category=${category}&page=1&limit=25`
  );

  return await processedData.results;
}

async function GetMealsByArea(area) {
  const processedData = await api.ProcessApi(
    `https://nutriplan-api.vercel.app/api/meals/filter?area=${area}&page=1&limit=25`
  );

  return await processedData.results;
}
async function GetMealById(id) {
  const processedData = await api.ProcessApi(
    `https://nutriplan-api.vercel.app/api/meals/${id}`
  );

  return await processedData.result;
}

async function GetMealsByTerm(term) {
  const processedData = await api.ProcessApi(
    `https://nutriplan-api.vercel.app/api/meals/search?q=${term}&page=1&limit=25`
  );

  return processedData.results;
}

async function GetMealsByFirstLetter(firstLetter) {
  const processedData = await api.ProcessApi(
    `https://nutriplan-api.vercel.app/api/meals/search?f=${firstLetter}&page=1&limit=25`
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
