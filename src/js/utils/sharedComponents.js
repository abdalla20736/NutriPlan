const header = document.getElementById("main-content");

export function SetHeaderInfo(title, desc) {
  header.querySelector("h1").textContent = title;
  header.querySelector("h1").nextElementSibling.textContent = desc;
}

export const standardNutriation = {
  protein: 50,
  carbs: 300,
  fat: 70,
  sugar: 50,
  fiber: 30,
  saturatedFat: 10,
};


export function CalculatePercentage(value, max) {
  if (!max || max === 0) return 0;
  return Math.min(Math.round((value / max) * 100), 100);
}
