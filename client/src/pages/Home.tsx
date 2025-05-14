import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import type { Superheroes} from '../definitions/definitions'
import SuperheroCard from '../ui/superhero_card/SuperheroCard';

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);


function Home() {
  const [superheroes, setSuperheroes] = useState<Superheroes>([]);

useEffect(() => {
  async function fetchSuperheroes() {
    try {
      const response = await fetch(API_URL + 'superheroes');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuperheroes(data);
    } catch (error) {
      console.error('Ошибка при загрузке супергероев:', error);
    }
  }

  fetchSuperheroes();
}, []);

  return (
    <div className={styles['card-board']}>
      {superheroes.map((hero) => (
        <SuperheroCard key={hero.nickname} {...hero} />
      ))}
    </div>
  );
}

export default Home;