export interface RecipeIngredient {
    name: string;
    amount: number;
    unit: string;
}

export interface RecipeStep {
    description: string;
}

export interface Recipe {
    title: string;
    image?: string;
    description: string;
    category: number;

    ingredients: RecipeIngredient[] | string;
    instructions: RecipeStep[] | string;

    prep_time?: number;
    name?: string;
    categoryName?: string;
    time?: string | number;
}