import type { Superhero } from "../../definitions/definitions";
import styles  from './SuperheroCard.module.css'

export default function SuperheroCard({nickname, images}  : Superhero) {

  return (
        <div className={styles['card']}>
            <img src={images[0] || 'https://dummyjson.com/image/300/008080/ffffff?text=No+Image+Found'} alt={nickname} className={styles['hero-img']} />
          <h2>{nickname}</h2>
          {/* <p><strong>Real name:</strong> {real_name}</p>
          <p><strong>Origin:</strong> {origin_description}</p>
          <p><strong>Superpowers:</strong> {superpowers.join(', ')}</p>
          <p><strong>Catchphrase:</strong> {catch_phrase}</p> */}
        </div>
  )
}