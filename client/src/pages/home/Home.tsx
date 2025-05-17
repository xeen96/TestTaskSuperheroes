import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import SuperheroCard from '../../components/superhero_card/SuperheroCard';
import { useSuperheroes } from '../../context/SuperheroContext';
import CreateButton from '../../components/create_button/CreateButton';

const PAGE_SIZE = 5;
function Home() {
  const { superheroes, refreshSuperheroes, loading } = useSuperheroes();
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    refreshSuperheroes();
  }, []);

  const displayedHeroes = superheroes.slice(0, page * PAGE_SIZE);

  return (
    <>
      {loading ? (
        <p
          style={{
            position: 'relative',
            placeSelf: 'center',
          }}
        >
          Loading...
        </p>
      ) : (
        <>
          <div className={styles['card-board']}>
            {displayedHeroes.map((hero) => (
              <SuperheroCard key={hero.nickname} {...hero} />
            ))}
          </div>
          {displayedHeroes.length < superheroes.length && (
            <div className={styles['load-more-container']}>
              <p>
                Showing {displayedHeroes.length} of {superheroes.length}{' '}
                superheroes
              </p>
              <button className={styles['load-more']} onClick={handleLoadMore}>
                Load more...
              </button>
            </div>
          )}
          <CreateButton />
        </>
      )}
    </>
  );
}

export default Home;
