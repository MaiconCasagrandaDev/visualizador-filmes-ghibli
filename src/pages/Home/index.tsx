import { useEffect, useState } from "react";
import type { Film } from "../../types/Film";
import { Link } from "react-router-dom";

function Home() {
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
            <div className="max-w-7xl mx-auto px-6 bg-background">
                {loading && <p className="text-error">Loading...</p>}
                {error && <p className="text-error"> Erro: {error}</p>}

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                    {films.map((film) => (
                        <li key={film.id}
                            className="border border-border rounded-lg overflow-hidden shadow-sm bg-surface">
                            <Link to={`/film/${film.id}`}>
                                <img 
                                src={film.movie_banner} 
                                alt={film.title}
                                className="w-full h-64 object-cover"/>
                            </Link>
                            <div className="p-4">
                                <h2 className="font-display text-lg text-heading">{film.title}</h2>
                                <div className="font-body flex items-center justify-between mt-2 text-sm text-text-secondary">
                                    <span>📅 Lançamento: {film.release_date}</span>
                                    <span>⭐Nota: {film.rt_score}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Home;