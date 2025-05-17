import { useEffect } from 'react';
import styles from './HeroModal.module.css';
import type { Superhero } from '../../definitions/definitions';

type HeroModalProps = Superhero & { onClose: () => void };

export default function HeroModal({
  nickname,
  real_name,
  origin_description,
  superpowers,
  catch_phrase,
  images,
  onClose,
}: HeroModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.heroTitle}>{nickname}</h2>

        <div className={styles.imageContainer}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${nickname}`}
              className={styles.heroImage}
            />
          ))}
        </div>

        <div className={styles.heroInfo}>
          <p>
            <span className={styles.infoLabel}>Real name:</span> {real_name}
          </p>
          <p>
            <span className={styles.infoLabel}>Origin:</span>{' '}
            {origin_description}
          </p>

          <p>
            <span className={styles.infoLabel}>Superpowers:</span>
            <span className={styles.powersList}>
              {superpowers.map((power, idx) => (
                <span key={idx} className={styles.powerTag}>
                  {power}
                </span>
              ))}
            </span>
          </p>

          <p className={styles.catchphrase}>{catch_phrase ? `"${catch_phrase}"` : 'N/A'} </p>
        </div>
      </div>
    </div>
  );
}
