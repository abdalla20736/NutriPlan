import { RegisterMultiEvents } from "../utils/utils.js";
import { SetHeaderInfo } from "../utils/sharedComponents.js";

const sideBar = document.getElementById("sidebar");
const tabs = sideBar.querySelectorAll("nav ul li a");
const mobileToggle = document.getElementById("header-menu-btn");
const closeMobileBtn = document.getElementById("sidebar-close-btn");

let currentActiveTab = tabs[0];

function DeactiveTab(tab) {
  if (tab.classList.contains("active")) {
    tab.classList.remove("bg-emerald-50", "text-emerald-700", "active");
    tab.classList.add("text-gray-600", "hover:bg-gray-50");
  }
}

function ActiveTab(tab) {
  tab.classList.add("bg-emerald-50", "text-emerald-700", "active");
  tab.classList.remove("text-gray-600", "hover:bg-gray-50");
}

function SetActiveSection(sectionId) {
  const selectedSections = document.querySelectorAll(
    `[data-section="${sectionId}"]`,
  );
  document.querySelectorAll(`section`).forEach((oldSection) => {
    oldSection.classList.toggle("hidden", true);
  });

  selectedSections.forEach((section) => {
    section.classList.toggle("hidden", false);
  });
}

function NavigateToTab(e) {
  e.preventDefault();

  const link = e.target;

  const section = link.getAttribute("href");
  console.log(section);
  let clickedTab = e.currentTarget;
  // const target = clickedTab.dataset.target;
  // if (!target) return;
  // history.pushState(null, null, `#${target}`);
  tabs.forEach((tab) => {
    DeactiveTab(tab);
  });

  ActiveTab(clickedTab);
  SetActiveSection(clickedTab.dataset.sectionId);
  SetNavigationTitle(clickedTab);
  currentActiveTab = clickedTab;
}

function SetNavigationTitle(tab) {
  switch (tab.dataset.sectionId) {
    case "meal-recipes":
      SetHeaderInfo(
        "Meals & Recipes",
        "Discover delicious and nutritious recipes tailored for you",
      );
      break;
    case "products-section":
      SetHeaderInfo(
        "Product Scanner",
        "Search packaged foods by name or barcode",
      );
      break;
    case "foodlog-section":
      SetHeaderInfo("Food Log", "Track your daily nutrition and food intake");
      break;
  }
}

function OpenMobileSideBar() {
  if (!sideBar.classList.contains("open")) {
    sideBar.classList.add("open");
    document.body.querySelector(".sidebar-overlay").classList.add("active");
  }
}
function CloseSideBarOnMobile() {
  if (sideBar.classList.contains("open")) {
    sideBar.classList.remove("open");
    document.body.querySelector(".sidebar-overlay").classList.remove("active");
  }
}

function RegisterEvents() {
  RegisterMultiEvents(tabs, "click", (e) => NavigateToTab(e));
  mobileToggle.addEventListener("click", OpenMobileSideBar);
  closeMobileBtn.addEventListener("click", CloseSideBarOnMobile);
  document.addEventListener("click", (e) => {
    if (e.target === document.body.querySelector(".sidebar-overlay")) {
      CloseSideBarOnMobile();
    }
  });
  window.addEventListener("popstate", () => {
    const path = location.pathname;

    const matchedTab = [...tabs].find((tab) => tab.dataset.target === path);
    if (!matchedTab) return;

    tabs.forEach(DeactiveTab);

    ActiveTab(matchedTab);
    SetActiveSection(matchedTab.dataset.sectionId);
    SetNavigationTitle(matchedTab);

    currentActiveTab = matchedTab;
  });
}

const sideBarUI = {
  RegisterEvents,
  NavigateToTab,
};

export default sideBarUI;
