import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, type Superhero } from '../../definitions/definitions';
import HeroModal from '../hero_modal/HeroModal';
import styles from './SuperheroCard.module.css';
import { useSuperheroes } from '../../context/SuperheroContext';

export default function SuperheroCard({
  nickname,
  real_name,
  origin_description,
  superpowers,
  catch_phrase,
  images,
}: Superhero) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { refreshSuperheroes } = useSuperheroes();

  const handleHeroClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteHero = async () => {
    if (!confirm(`Are you sure you want to delete "${nickname}"?`)) return;
    try {
      const response = await fetch(
        `${API_URL}/api/v1/superheroes/${nickname}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        alert('Error deleting superhero:');
      }
      alert('Superhero deleted successfully');
      refreshSuperheroes();
    } catch (err) {
      alert('Error deleting superhero:');
      refreshSuperheroes();
      console.error('Error deleting superhero:', err);
    }
  };

  return (
    <>
      <div
        className={styles['card']}
        onClick={handleHeroClick}
        title="Click to view more details"
      >
        <img
          src={
            images[0] ||
            'https://dummyjson.com/image/300/008080/ffffff?text=No+Image+Found'
          }
          alt={nickname}
          className={styles['hero-img']}
        />
        <h2>{nickname}</h2>
        <div className={styles['options-wrapper']}>
          <button
            className={styles['delete-btn']}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteHero();
            }}
            title="Delete Superhero"
          >
            Delete
          </button>
          <button
            className={styles['edit-btn']}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${nickname}`, {
                state: {
                  nickname,
                  real_name,
                  origin_description,
                  superpowers,
                  catch_phrase,
                  images,
                },
              });
            }}
            title="Edit Superhero"
          >
            Edit
          </button>
        </div>
      </div>

      {showModal && (
        <HeroModal
          nickname={nickname}
          real_name={real_name}
          origin_description={origin_description}
          superpowers={superpowers}
          catch_phrase={catch_phrase}
          images={images}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
