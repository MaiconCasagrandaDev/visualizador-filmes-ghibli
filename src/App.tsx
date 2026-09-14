import { useEffect, useState } from 'react'
import './App.css'
import type { Film } from './types/Film'

function App() {

  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFilms() {
      try {
        const result = await fetch("https://ghibliapi.vercel.app/films");
        if (!result.ok) {
          throw new Error("Erro ao buscar os filmes");
        }
        const data: Film[] = await result.json();
        const dataOrdered = data.sort((filmA, filmB) =>
          filmA.title.localeCompare(filmB.title)
        );
        const dataSliced = dataOrdered.slice(0, 10);

        setFilms(dataSliced);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro ao buscar os filmes");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchFilms();

  }, []);

  return (
    <>
      <div>
        {loading && <p className="text-red-500">Loading...</p>}
        {error && <p> Erro: {error}</p>}

        <ul>
          {films.map((film) => (
            <li key={film.id}>
              {film.title}
              <img src={film.movie_banner} alt={film.title} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
