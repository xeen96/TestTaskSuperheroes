export interface Superhero {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

export type Superheroes = Superhero[];

export interface SuperherosContextType {
  superheroes: Superheroes;
  loading: boolean;
  error: string | null;
  refreshSuperheroes: () => Promise<void>;
}

export const API_URL = import.meta.env.VITE_API_URL;
