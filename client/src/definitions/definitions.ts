export interface Superhero {
  nickname: string,
  real_name: string,
  origin_description: string,
  superpowers: string[],
  catch_phrase: string,
  images: string[]
}

export type Superheroes = Superhero[];