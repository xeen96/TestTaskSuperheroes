import { useLocation } from 'react-router-dom';
import type { Superhero } from '../../definitions/definitions';
import EditorForm from './EditorForm';

export default function Editor() {
  const location = useLocation();
  const initialData = location.state as Superhero | undefined;
  return <EditorForm initialData={initialData} />;
}
