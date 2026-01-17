export class MealCategory {
  constructor(name) {
    this.name = name;
    this.icon = this.getIcon(name);
    this.bgColor = this.getColors(name);
  }

  getIcon(name) {
    return MealCategory.ICONS.get(name.toLowerCase());
  }

  getColors(name) {
    return MealCategory.BGCOLORS.get(name.toLowerCase());
  }

  static ICONS = new Map([
    ["beef", "fa-drumstick-bite"],
    ["chicken", "fa-drumstick-bite"],
    ["dessert", "fa-cake-candles"],
    ["lamb", "fa-drumstick-bite"],
    ["miscellaneous", "fa-bowl-rice"],
    ["pasta", "fa-bowl-food"],
    ["pork", "fa-bacon"],
    ["seafood", "fa-fish"],
    ["side", "fa-plate-wheat"],
    ["starter", "fa-utensils"],
    ["vegan", "fa-leaf"],
    ["vegetarian", "fa-seedling"],
  ]);

  static BGCOLORS = new Map([
    ["beef", { from: "red", to: "rose" }],
    ["chicken", { from: "amber", to: "orange" }],
    ["dessert", { from: "pink", to: "rose" }],
    ["lamb", { from: "orange", to: "amber" }],
    ["miscellaneous", { from: "slate", to: "gray" }],
    ["pasta", { from: "yellow", to: "amber" }],
    ["pork", { from: "rose", to: "red" }],
    ["seafood", { from: "cyan", to: "blue" }],
    ["side", { from: "green", to: "emerald" }],
    ["starter", { from: "teal", to: "cyan" }],
    ["vegan", { from: "emerald", to: "green" }],
    ["vegetarian", { from: "lime", to: "green" }],
  ]);
}
