import { SuperheroModel } from './schemas';
export const SeedSuperHeroes = async () => {
  try {
    // Clear collection before seeding
    await SuperheroModel.deleteMany({});
    // Array with 10 heroes based on comic/movie prototypes
    const heroes = [
      {
        nickname: 'The Arachnid',
        real_name: 'Peter Parker',
        origin_description: 'Bitten by a radioactive spider',
        superpowers: ['Wall-Crawling', 'Enhanced Strength', 'Spider Sense'],
        catch_phrase: 'With great power comes great responsibility!',
        images: [
          'https://dummyjson.com/image/300',
          'https://dummyjson.com/image/300',
        ],
      },
      {
        nickname: 'Dark Knight',
        real_name: 'Bruce Wayne',
        origin_description:
          'Witnessed parents murder, trained to physical perfection',
        superpowers: [
          'Master Detective',
          'Martial Arts Expert',
          'Advanced Technology',
        ],
        catch_phrase: 'I am the night!',
        images: ['https://dummyjson.com/image/300'],
      },
      {
        nickname: 'Metal Man',
        real_name: 'Tony Stark',
        origin_description: 'Genius inventor who built powered armor suit',
        superpowers: ['Flight', 'Repulsor Blasts', 'Super Intelligence'],
        catch_phrase: 'Genius, billionaire, philanthropist.',
        images: [
          'https://dummyjson.com/image/300',
          'https://dummyjson.com/image/300',
        ],
      },
      {
        nickname: 'Amazon Princess',
        real_name: 'Diana Prince',
        origin_description: 'Sculpted from clay and given life by gods',
        superpowers: ['Super Strength', 'Invulnerability', 'Combat Master'],
        images: ['https://dummyjson.com/image/300'],
      },
      {
        nickname: 'Thunder God',
        real_name: 'Thor Odinson',
        origin_description: 'Asgardian deity and wielder of enchanted hammer',
        superpowers: ['Weather Control', 'Flight', 'Superhuman Durability'],
        catch_phrase: 'For Asgard!',
        images: [
          'https://dummyjson.com/image/300',
          'https://dummyjson.com/image/300',
        ],
      },
      {
        nickname: 'Emerald Archer',
        real_name: 'Oliver Queen',
        origin_description: 'Stranded on island, trained with bow to survive',
        superpowers: [
          'Master Archery',
          'Tactical Planning',
          'Peak Human Combat',
        ],
        images: [],
      },
      {
        nickname: 'Scarlet Speedster',
        real_name: 'Barry Allen',
        origin_description: 'Struck by lightning near chemical bath',
        superpowers: ['Super Speed', 'Phasing', 'Time Travel'],
        catch_phrase:
          "Life is locomotion... if you're not moving, you're not living.",
        images: ['https://dummyjson.com/image/300'],
      },
      {
        nickname: 'Jade Giant',
        real_name: 'Bruce Banner',
        origin_description: 'Exposed to gamma radiation during experiment',
        superpowers: ['Superhuman Strength', 'Invulnerability', 'Regeneration'],
        catch_phrase: "You wouldn't like me when I'm angry!",
        images: [
          'https://dummyjson.com/image/300',
          'https://dummyjson.com/image/300',
        ],
      },
      {
        nickname: 'Professor X',
        real_name: 'Charles Xavier',
        origin_description: 'Born with mutant gene enabling mental powers',
        superpowers: ['Telepathy', 'Mind Control', 'Astral Projection'],
        images: ['https://dummyjson.com/image/300'],
      },
      {
        nickname: 'Steel Man',
        real_name: 'Clark Kent',
        origin_description: 'Last son of dying alien planet',
        superpowers: [
          'Flight',
          'Super Strength',
          'Heat Vision',
          'Invulnerability',
        ],
        catch_phrase: 'Truth, Justice, and a Better Tomorrow!',
        images: [
          'https://dummyjson.com/image/300',
          'https://dummyjson.com/image/300',
        ],
      },
    ];
    await SuperheroModel.insertMany(heroes);
    console.log(`Database seeded successfully with ${heroes.length} heroes!`);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
