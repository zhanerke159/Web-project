export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birth_date: string; 
  avatar?: string | null;
  bio?: string;
}