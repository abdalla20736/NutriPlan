import mealApi from "../api/mealApi.js";
import { MealCategory } from "../models/mealCategory.js";
import { Recipe } from "../models/recipe.js";
import { RegisterMultiEvents } from "../utils/utils.js";

import mealDetailsUI from "./mealDetailsUI.js";

const areasFilter = document.getElementById("areas-filter");
const categoriesGrid = document.getElementById("categories-grid");

const recipesGrid = document.getElementById("recipes-grid");
const recipesCount = document.getElementById("recipes-count");
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");
const searchInput = document.getElementById("search-input");

let categoriesButtons;
let areaButtons;
let recipes = [];

async function StartUp() {
  await LoadAreas();
  await LoadCategories();
  RegisterEvents();
  mealDetailsUI.RegisterEvents();
}

async function LoadAreas() {
  const areas = await mealApi.GetMealsAreas();
  const slicedAreas = areas.slice(0, 10);
  RenderAreas(slicedAreas);
}

function RenderAreas(areasData) {
  let areas = "";
  areasData.forEach((area) => {
    areas += `<button
              class="area-filter px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
              data-area="${area.name.toLowerCase()}"
              >
              ${area.name}
            </button>`;
  });

  areasFilter.innerHTML += areas;
  areaButtons = areasFilter.querySelectorAll(".area-filter");
}

async function LoadCategories() {
  const mealsCategories = await mealApi.GetMealsCategories();

  let categories = [];

  mealsCategories.forEach((category) => {
    categories.push(new MealCategory(category.name));
  });

  const slicedCategories = categories.slice(0, 12);
  RenderCategories(slicedCategories);
  categoriesButtons = categoriesGrid.querySelectorAll(".category-card");
}

function SetLoadingSpinner() {
  recipesGrid.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
  </div>`;
}

function RenderCategories(categories) {
  let categoriesContent = "";

  categories.forEach((category) => {
    categoriesContent += `  <div
              class="category-card bg-gradient-to-br from-${category.bgColor.from}-50 to-${category.bgColor.to}-50 rounded-xl p-3 border border-${category.bgColor.from}-200 hover:border-${category.bgColor.from}-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${category.name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-${category.bgColor.from}-400 to-${category.bgColor.to}-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid ${category.icon}"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
                </div>
              </div>
            </div>`;
  });
  categoriesGrid.innerHTML = categoriesContent;
}
function SetAreaButtonStyle(area) {
  areaButtons.forEach((button) => {
    const isActive = button.dataset.area === area;

    button.classList.toggle("bg-emerald-600", isActive);
    button.classList.toggle("text-white", isActive);
    button.classList.toggle("bg-gray-100", !isActive);
    button.classList.toggle("text-gray-700", !isActive);
  });
}
async function LoadRecipeByFilter(filter, data) {
  SetLoadingSpinner();
  let recipesData;
  switch (filter) {
    case "all":
      recipesData = await mealApi.GetMealsByTerm(data);
      break;
    case "category":
      recipesData = await mealApi.GetMealsByCategory(data);
      break;
    case "area":
      SetAreaButtonStyle(data);
      recipesData =
        data === "all"
          ? await mealApi.GetMealsByTerm("chicken")
          : await mealApi.GetMealsByArea(data);
      break;
  }
  recipes = [];
  recipesData.forEach((recipe) => {
    const newRecipe = new Recipe(recipe);

    recipes.push(newRecipe);
  });
  recipes = filter === "area" && data != "all" ? recipes.slice(0, 20) : recipes;
  RenderMealsUI(recipes, filter, data);
}

function RenderMealsUI(recipes, filter, data, recipesContentMsg) {
  DisplayCountMessage(recipes, filter, data, recipesContentMsg);
  RenderRecipes(recipes);
}

function DisplayCountMessage(recipes, filter, data, recipesContentMsg) {
  let text = "";
  if (filter === "category") {
    text = `Showing ${recipes.length} ${data} recipes`;
  } else if (filter === "area") {
    text = `Showing ${recipes.length} ${data === "all" ? "" : data} recipes`;
  } else if (recipesContentMsg) {
    text = `Showing ${recipes.length} recipes for ${recipesContentMsg}`;
  } else {
    text = `Showing ${recipes.length} recipes`;
  }
  recipesCount.innerHTML = text;
}

function RenderRecipes(recipes) {
  let recipesContent = "";
  if (recipes.length > 0) {
    recipes.forEach((recipe) => {
      recipesContent += `            <div
              onclick="GetMealDetails(this,'${recipe.id}')"
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-target="meal/${recipe.name.replaceAll(" ", "-").toLowerCase()}"
              data-area="${recipe.area.toLowerCase()}"
              data-meal-id="${recipe.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${recipe.thumbnail}"
                  alt="${recipe.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${recipe.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${recipe.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${recipe.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${recipe.instructions[0]}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                     ${recipe.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                     ${recipe.area}
                  </span>
                </div>
              </div>
            </div>`;
    });
  } else {
    recipesContent = `<div class="flex flex-col items-center justify-center py-12 text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
              </div>
              <p class="text-gray-500 text-lg">No recipes found</p>
              <p class="text-gray-400 text-sm mt-2">Try a different search term.</p>
          </div>`;
  }
  recipesGrid.innerHTML = recipesContent;
}

async function SearchRecipesByFirstLetter(value) {
  value = value.toLowerCase();
  SetLoadingSpinner();
  const recipesData = await mealApi.GetMealsByFirstLetter(value);

  RenderMealsUI(recipesData, "", "", `"${value}"`);
}

async function SearchRecipesByName(value) {
  value = value.toLowerCase();
  const recipesData = await mealApi.GetMealsByTerm(value);

  RenderMealsUI(recipesData, "", "", `"${value}"`);
}

function SetRecipesView(isListView) {
  const recipeCards = document.querySelectorAll(".recipe-card");

  listViewBtn.classList.toggle("bg-white", isListView);
  listViewBtn.classList.toggle("shadow-sm", isListView);

  gridViewBtn.classList.toggle("bg-white", !isListView);
  gridViewBtn.classList.toggle("shadow-sm", !isListView);

  recipesGrid.classList.toggle("grid-cols-2", isListView);
  recipesGrid.classList.toggle("gap-4", isListView);

  recipesGrid.classList.toggle("grid-cols-4", !isListView);
  recipesGrid.classList.toggle("gap-5", !isListView);

  recipeCards.forEach((card) => {
    const imageWrapper = card.querySelector(".relative");
    const badge = card.querySelector(".relative .absolute.bottom-3");
    const img = card.querySelector("img");

    card.classList.toggle("flex", isListView);
    card.classList.toggle("flex-row", isListView);
    card.classList.toggle("h-40", isListView);

    imageWrapper.classList.toggle("h-48", !isListView);
    imageWrapper.classList.toggle("h-full", isListView);
    imageWrapper.classList.toggle("w-48", isListView);
    imageWrapper.classList.toggle("flex-shrink-0", isListView);

    badge?.classList.toggle("hidden", isListView);
    img?.classList.toggle("h-full", !isListView);
  });
}

function RegisterEvents() {
  listViewBtn.addEventListener("click", (e) => SetRecipesView(true));
  gridViewBtn.addEventListener("click", (e) => SetRecipesView(false));
  searchInput.addEventListener("input", (e) => {
    if (e.target.value.length > 1) {
      SearchRecipesByName(e.target.value);
    }
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      SearchRecipesByFirstLetter(e.target.value);
    }
  });

  RegisterMultiEvents(categoriesButtons, "click", (e) =>
    LoadRecipeByFilter("category", e.currentTarget.dataset.category),
  );
  RegisterMultiEvents(areaButtons, "click", (e) =>
    LoadRecipeByFilter("area", e.currentTarget.dataset.area),
  );
}

const meals = {
  StartUp,
  LoadRecipeByFilter,
};
export default meals;
