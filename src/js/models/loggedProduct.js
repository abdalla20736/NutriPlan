export class LoggedProduct {
  constructor(product) {
    this.type = "product";
    this.id = product.barcode;
    this.name = product.name;
    this.brand = product.brand || null;
    this.barcode = product.barcode;
    this.image = product.image || null;

    this.nutrition = {
      calories: product.nutrients?.calories || 0,
      protein: product.nutrients?.protein || 0,
      carbs: product.nutrients?.carbs || 0,
      fat: product.nutrients?.fat || 0,
      sugar: product.nutrients?.sugar || 0,
      fiber: product.nutrients?.fiber || 0,
    };

    this.loggedAt = new Date().toISOString();
  }
}
