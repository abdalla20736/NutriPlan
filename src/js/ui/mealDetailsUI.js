import mealApi from "../api/mealApi.js";
import nutritionApi from "../api/nutritionApi.js";
import { MealDetails } from "../models/mealDetails.js";
import { LoggedItem } from "../models/loggedItem.js";
import {
  SetHeaderInfo,
  CalculatePercentage,
  standardNutriation,
  SetLinkState,
} from "./components.js";
import foodLog from "./foodLogUI.js";

const searchFiltersSection = document.getElementById("search-filters-section");
const mealDetailsSection = document.getElementById("meal-details");
const mealCategoriesSection = document.getElementById(
  "meal-categories-section",
);
const allRecipesSection = document.getElementById("all-recipes-section");

let nutritionData;
let meal;

window.GetMealDetails = async function (mealInstance, id) {
  SetHeaderInfo(
    "Recipe Details",
    "View full recipe information and nutrition facts",
  );
  const mealData = await mealApi.GetMealById(id);

  SetLinkState(mealInstance);

  if (mealData != null) {
    meal = new MealDetails(mealData);
  }

  RenderMealDetailsWithNutrition(meal);

  ToggleMealDetails(false);
};

async function RenderMealDetailsWithNutrition(meal) {
  let { name, ingredients } = meal;
  RenderMealDetails(meal);
  RegisterEventMeal();
  SetLoadingData(true);
  nutritionData = await nutritionApi.AnalyzeRecipeNutrition(name, ingredients);
  SetLoadingData(false);
  RenderNutritionData(nutritionData);
}

function RenderMealDetails(meal) {
  mealDetailsSection.innerHTML = `
                    <div class="max-w-7xl mx-auto">
                    <button
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>
              <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${meal.thumbnail}"
                alt="${meal.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${meal.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${meal.area}</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                    ${meal.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">calculating...</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              onclick="LogMeal()"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="${meal.id}"
            >
               <i  class="fa-solid fa-clipboard-list"></i>    
              <span>Log This Meal</span>
            </button>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${meal.ingredients.length} items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${meal.ingredients
                      .map((ingredient) => {
                        return `
                                          <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${ingredient.measure}</span> ${ingredient.ingredient}
                    </span>
                  </div>
                      `;
                      })
                      .join("")}
                </div>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                    ${meal.instructions
                      .map((instruction, index) => {
                        return `<div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      ${index + 1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${instruction}
                    </p>
                  </div>`;
                      })
                      .join("")}
                </div>
              </div>

              <!-- Video Section -->
${
  meal.youtube
    ? `              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="${meal.youtube.replace("watch?v=", "embed/")}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>`
    : ""
}
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div  id="loading-nutrition-container" class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
}

function RenderNutritionData() {
  const { protein, carbs, fat, sugar, fiber, saturatedFat } =
    nutritionData.perServing;

  const proteinPercent = CalculatePercentage(
    protein,
    standardNutriation.protein,
  );
  const carbsPercent = CalculatePercentage(carbs, standardNutriation.carbs);
  const fatPercent = CalculatePercentage(fat, standardNutriation.fat);
  const sugarPercent = CalculatePercentage(sugar, standardNutriation.sugar);
  const fiberPercent = CalculatePercentage(fiber, standardNutriation.fiber);
  const saturatedFatPercent = CalculatePercentage(
    saturatedFat,
    standardNutriation.saturatedFat,
  );

  document.getElementById("hero-calories").textContent =
    `${nutritionData.perServing.calories} cal/serving`;

  const nutritionFactsContainer = document.getElementById(
    "nutrition-facts-container",
  );

  nutritionFactsContainer.innerHTML = `
                    <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${nutritionData.perServing.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${nutritionData.totals.calories} cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionData.perServing.protein}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: ${proteinPercent}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionData.perServing.carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: ${carbsPercent}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionData.perServing.fat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: ${fatPercent}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionData.perServing.fiber}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: ${fiberPercent}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionData.perServing.sugar}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: ${sugarPercent}%"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionData.perServing.saturatedFat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-red-500 h-2 rounded-full"
                        style="width: ${saturatedFatPercent}%"
                      ></div>
                    </div>
                  </div>
                  </div>
                  <div class="mt-6 pt-6 border-t border-gray-100">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${nutritionData.perServing.cholesterol}mg</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${nutritionData.perServing.sodium}mg</span>
                    </div>
                </div>
            </div>
                  </div>
  `;
}

function ToggleMealDetails(isOpen) {
  mealDetailsSection.classList.toggle("hidden", isOpen);
  searchFiltersSection.classList.toggle("hidden", !isOpen);
  mealCategoriesSection.classList.toggle("hidden", !isOpen);
  allRecipesSection.classList.toggle("hidden", !isOpen);
}

window.LogMeal = function () {
  var LogMenuContent = `<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="log-meal-modal">
            <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                <div class="flex items-center gap-4 mb-6">
                    <img src="${meal.thumbnail}" alt="${meal.name}" class="w-16 h-16 rounded-xl object-cover">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                        <p class="text-gray-500 text-sm">${meal.name}</p>
                    </div>
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
                    <div class="flex items-center gap-3">
                        <button id="decrease-servings" onclick="DecrementModal()" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-minus" data-prefix="fas" data-icon="minus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"></path></svg></i>
                        </button>
                        <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                        <button id="increase-servings" onclick="IncrementModal()" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>
                        </button>
                    </div>
                </div>
                
                
                <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                    <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p class="text-lg font-bold text-emerald-600" id="modal-calories">${nutritionData.perServing.calories}</p>
                            <p class="text-xs text-gray-500">Calories</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-blue-600" id="modal-protein">${nutritionData.perServing.protein}g</p>
                            <p class="text-xs text-gray-500">Protein</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-amber-600" id="modal-carbs">${nutritionData.perServing.carbs}g</p>
                            <p class="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-purple-600" id="modal-fat">${nutritionData.perServing.fat}g</p>
                            <p class="text-xs text-gray-500">Fat</p>
                        </div>
                    </div>
                </div>
                
                
                <div class="flex gap-3">
                    <button id="cancel-log-meal" onclick="CloseLogModal()" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                        Cancel
                    </button>
                    <button id="confirm-log-meal" onclick="OnLogRecipe()" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                      <i class="fa-solid fa-clipboard-list"></i>    
  
                        Log Meal
                    </button>
                </div>
            </div>
        </div>`;
  document.body.insertAdjacentHTML("beforeend", LogMenuContent);
};

window.OnLogRecipe = function () {
  const modal = document.getElementById("log-meal-modal");
  meal.type = "Recipe";
  meal.serving = document.getElementById("meal-servings").value;

  const loggedRecipe = new LoggedItem(meal);

  loggedRecipe.nutrition.calories =
    nutritionData.perServing.calories * meal.serving;
  loggedRecipe.nutrition.protein =
    nutritionData.perServing.protein * meal.serving;
  loggedRecipe.nutrition.carbs = nutritionData.perServing.carbs * meal.serving;
  loggedRecipe.nutrition.fat = nutritionData.perServing.fat * meal.serving;

  const storedItems = foodLog.GetLoggedItem();
  storedItems.push(loggedRecipe);
  foodLog.SetLoggedItem(storedItems);

  CloseLogModal();

  Swal.fire({
    title: "Meal Logged!",
    html: `<p class="text-gray-600">${loggedRecipe.name} (${loggedRecipe.serving} serving) has been added to your daily log.</p>  <p class="text-emerald-600 font-semibold mt-2">+${loggedRecipe.nutrition.calories} calories</p>`,
    icon: "success",
    showConfirmButton: false,
    timer: 2000,
  });

  foodLog.UpdateWeeklyDataOnAddingItem(loggedRecipe);
};

document.addEventListener("click", (e) => {
  if (e.target === document.getElementById("log-meal-modal")) {
    document.getElementById("log-meal-modal").remove();
  }
});

window.CloseLogModal = function () {
  document.getElementById("log-meal-modal").remove();
};

window.IncrementModal = function () {
  const mealServing = document.getElementById("meal-servings");
  const step = parseFloat(mealServing.step);
  const max = parseFloat(mealServing.max);
  let value = parseFloat(mealServing.value);
  if (value + step <= max) {
    mealServing.value = (value + step).toFixed(1);
  }
};

window.DecrementModal = function () {
  const mealServing = document.getElementById("meal-servings");
  const step = parseFloat(mealServing.step);
  const min = parseFloat(mealServing.min);
  let value = parseFloat(mealServing.value);

  if (value - step >= min) {
    mealServing.value = (value - step).toFixed(1);
  }
};

function SetAnalyzeLoading(isLoading) {
  const nutritionContainer = document.getElementById(
    "nutrition-facts-container",
  );
  const loadingNutritionContainer = document.getElementById(
    "loading-nutrition-container",
  );
  let loadingStyle = `<div id="loading-analyze-data" class=" text-center py-8">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
                    <i class="animate-pulse text-emerald-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-calculator" data-prefix="fas" data-icon="calculator" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm16 168a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM88 352a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM64 424c0-13.3 10.7-24 24-24l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L88 448c-13.3 0-24-10.7-24-24zm232-24c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24z"></path></svg></i>
                </div>
                <p class="text-gray-700 font-medium mb-1">Calculating Nutrition</p>
                <p class="text-sm text-gray-500">Analyzing ingredients...</p>
                <div class="mt-4 flex justify-center">
                    <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                    </div>
                </div>
            </div>`;
  isLoading
    ? nutritionContainer.classList.add("hidden")
    : nutritionContainer.classList.remove("hidden");
  isLoading
    ? (loadingNutritionContainer.innerHTML += loadingStyle)
    : document.getElementById("loading-analyze-data").remove();
}

function SetLogButtonLoading(isLoading) {
  const logThisMeal = document.getElementById("log-meal-btn");
  logThisMeal.classList.toggle("bg-gray-300", isLoading);
  logThisMeal.classList.toggle("text-gray-500", isLoading);
  logThisMeal.classList.toggle("cursor-not-allowed", isLoading);
  logThisMeal.classList.toggle("bg-blue-600", !isLoading);
  logThisMeal.classList.toggle("hover:bg-blue-700", !isLoading);
  logThisMeal.disabled = isLoading;
  const text = logThisMeal.querySelector("span");
  isLoading
    ? (text.textContent = "Calculating...")
    : (text.textContent = "Log This Meal");
  const icon = logThisMeal.querySelector("i");
  const svg = icon.querySelector("svg");

  isLoading
    ? icon.classList.replace("fa-clipboard-list", "fa-spinner")
    : svg.classList.replace("fa-spinner", "fa-clipboard-list");
  isLoading ? icon.classList.add("fa-spin") : svg.classList.remove("fa-spin");

  isLoading
    ? (logThisMeal.title = "Waiting for nutrition data...")
    : (logThisMeal.title = "");
}
function SetLoadingData(isLoading) {
  SetLogButtonLoading(isLoading);
  SetAnalyzeLoading(isLoading);
}

function RegisterEventMeal() {
  const backToMealsBtn = document.getElementById("back-to-meals-btn");
  backToMealsBtn.addEventListener("click", () => ToggleMealDetails(true));
}

const mealDetailsUI = {};

export default mealDetailsUI;
