export interface Products{
    id: number;
    name: string;
    description: string;
    category: number;
    image: string;
    time?: number|null;
    author: number | null;
    author_name?: string;
}