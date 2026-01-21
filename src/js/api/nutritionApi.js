import api from "./api.js";

const BASE_URL = `https://nutriplan-api.vercel.app/api/nutrition`;

async function AnalyzeRecipeNutrition(recipeName, ingredients) {
  const FormattedIngredients = ingredients.map(
    (ing) => `${ing.measure} ${ing.ingredient}`,
  );

  const options = {
    method: "POST",
    headers: { "x-api-key": api.key, "Content-Type": "application/json" },
    body: JSON.stringify({ recipeName, ingredients: FormattedIngredients }),
  };
  const processedData = await api.ProcessApi(`${BASE_URL}/analyze`, options);

  return await processedData.data;
}

const nutritionApi = {
  AnalyzeRecipeNutrition,
};
export default nutritionApi;
