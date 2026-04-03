export interface Review {
  id: number;
  user: number;      
  recipe: number;    
  rating: number;
  comment?: string;
  created_at: string;
}