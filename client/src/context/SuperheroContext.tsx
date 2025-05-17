import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../definitions/definitions';
import type {
  Superheroes,
  SuperherosContextType,
} from '../definitions/definitions';
import type { ReactNode } from 'react';

const SuperheroContext = createContext<SuperherosContextType | undefined>(
  undefined
);

export function SuperheroProvider({ children }: { children: ReactNode }) {
  const [superheroes, setSuperheroes] = useState<Superheroes>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSuperheroes = async () => {
    const res = await fetch(`${API_URL}/api/v1/superheroes`);
    const data = await res.json();
    setSuperheroes(data);
  };

  useEffect(() => {
    refreshSuperheroes();
  }, []);
  useEffect(() => {
    async function fetchSuperheroes() {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/v1/superheroes`);
        const data = await response.json();
        setSuperheroes(data);
      } catch (err) {
        setError('Failed to load superheroes');
        console.error('Error fetching superheroes:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSuperheroes();
  }, []);

  return (
    <SuperheroContext.Provider
      value={{ superheroes, loading, error, refreshSuperheroes }}
    >
      {children}
    </SuperheroContext.Provider>
  );
}

export function useSuperheroes() {
  const context = useContext(SuperheroContext);
  if (!context) {
    throw new Error('useSuperheroes must be used within a SuperheroProvider');
  }
  return context;
}
