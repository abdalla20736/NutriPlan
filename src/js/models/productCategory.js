export class ProductCategory {
  constructor(categoryData) {
    this.id = categoryData.id;
    this.name = categoryData.name;
    this.products = categoryData.products;
    this.url = categoryData.url;
  }

  static NAMES = [
    "Breakfast Cereals",
    "Beverages",
    "Snacks",
    "Dairy Products",
    "Fruits",
    "Vegetables",
    "Breads",
    "Meats",
    "Frozen Foods",
    "Sauces & Condiments",
  ];
  static ICONS = [
    "fa-wheat-awn",
    "fa-bottle-water",
    "fa-cookie",
    "fa-cheese",
    "fa-apple-whole",
    "fa-carrot",
    "fa-bread-slice",
    "fa-drumstick-bite",
    "fa-snowflake",
    "fa-jar",
  ];

  static BGCOLORS = [
    { from: "amber-500", to: "orange" },
    { from: "blue-500", to: "cyan" },
    { from: "purple-500", to: "pink" },
    { from: "sky-400", to: "blue" },
    { from: "red-500", to: "rose" },
    { from: "green-500", to: "emerald" },
    { from: "amber-500", to: "yellow" },
    { from: "red-500", to: "rose" },
    { from: "cyan-500", to: "blue" },
    { from: "orange-500", to: "red" },
  ];
}
