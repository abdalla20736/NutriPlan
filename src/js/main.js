/**
 * NutriPlan - Main Entry Point
 *
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

import sideBarUI from "./ui/sidebarUI.js";
import api from "./api/mealApi.js";
import meals from "./ui/mealsUI.js";
import products from "./ui/productscannerUI.js";

const loading = document.getElementById("app-loading-overlay");

window.addEventListener("load", () => {
  loading.style.opacity = "0";
  loading.style.transition = "opacity 0.5s ease-out";
  loading.addEventListener("transitionend", () => {
    loading.classList.toggle("hidden");
  });
});

StartUp();

function StartUp() {
  sideBarUI.RegisterEvents();
  meals.LoadRecipeByFilter("all", "chicken");
}

function ToggleLoading() {}
