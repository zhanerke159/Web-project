export interface Products {
    id: number;
    name: string;
    description: string;
    category: number;
    categoryName?: string;
    image: string;
    instructions?: Step[];
    ingredients?: Ingredient[];
    time?: number | null;
    author: number | null;
    author_name?: string;
}
export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

export interface Step {
    number: number;
    description: string;
}