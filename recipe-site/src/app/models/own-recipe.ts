
export interface OwnRecipe {
  id?: number;           // ID обычно добавляет бэкенд, знак ? значит "необязательно"
  name: string;
  photos: string[];      // Здесь будут храниться пути к фото или Base64 строки
  ingredients: string;   // Можно сделать строкой или массивом string[]
  steps: string[];       // Массив шагов приготовления
  createdAt: Date;
}