export class Recipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.area = data.area;
    this.instructions = data.instructions || [];
    this.thumbnail = data.thumbnail;
    this.tags = data.tags || [];
    this.youtube = data.youtube;
    this.source = data.source;
    this.ingredients = data.ingredients || [];
  }
}
