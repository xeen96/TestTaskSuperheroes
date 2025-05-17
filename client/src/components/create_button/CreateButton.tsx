import { useNavigate } from 'react-router-dom';
import styles from './CreateButton.module.css';

export default function CreateButton() {
  const navigate = useNavigate();

  return (
    <button
      className={styles.createBtn}
      onClick={() => navigate('/create')}
      title="Create new Superhero"
    >
      +
    </button>
  );
}
