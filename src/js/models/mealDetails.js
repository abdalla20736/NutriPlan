export class MealDetails {
  constructor({
    id,
    name,
    category,
    area,
    instructions,
    thumbnail,
    tags,
    youtube,
    source,
    ingredients,
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.area = area;
    this.instructions = instructions;
    this.thumbnail = thumbnail;
    this.tags = tags;
    this.youtube = youtube;
    this.source = source;
    this.ingredients = ingredients;
  }
}
