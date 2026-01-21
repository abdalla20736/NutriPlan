/**
 * NutriPlan - Main Entry Point
 *
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

import sideBarUI from "./ui/sidebarUI.js";
import meals from "./ui/mealsUI.js";
import products from "./ui/productscannerUI.js";
import foodLog from "./ui/foodlogUI.js";
import { ToggleAppLoading } from "./ui/components.js";

const navLinks = document.querySelectorAll("a");

StartUp();

function StartUp() {
  RegisterEvents();
  sideBarUI.RegisterEvents();
  meals.StartUp();
  products.StartUp();
  meals.LoadRecipeByFilter("all", "chicken");
  foodLog.StartUp();
}

function RegisterEvents() {
  window.addEventListener("load", () => {
    ToggleAppLoading(false);
  });
}
