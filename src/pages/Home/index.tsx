import { useEffect, useState } from "react";
import type { Film } from "../../types/Film";
import { Link } from "react-router-dom";

function Home() {
    const [films, setFilms] = useState<Film[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")

    const filteredFilms = films.filter((film) =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const featuredFilms = [...films]
        .sort((a, b) => Number(b.rt_score) - Number(a.rt_score))
        .slice(0, 3)

    // useEffect executa uma única vez ao montar o componente.
    // Ele busca os filmes da API do Studio Ghibli e atualiza o estado.
    useEffect(() => {
        async function fetchFilms() {
            try {
                const result = await fetch("https://ghibliapi.vercel.app/films");

                // Se a resposta não estiver ok, dispara um erro.
                if (!result.ok) {
                    throw new Error("Erro ao buscar os filmes");
                }

                const data: Film[] = await result.json();

                // Ordena os filmes por título em ordem alfabética.
                const dataOrdered = data.sort((filmA, filmB) =>
                    filmA.title.localeCompare(filmB.title)
                );

                setFilms(dataOrdered);

            } catch (error) {
                // Captura a mensagem do erro para mostrar na tela.
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Erro ao buscar os filmes");
                }
            } finally {
                // Mesmo com erro ou sucesso, o carregamento termina.
                setLoading(false);
            }
        }

        fetchFilms();

    }, []);

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 bg-background">
                <section className="text-center py-12 mb-6">
                    <h1 className="font-display text-4xl md:text-5xl text-heading">
                        Studio Ghibli
                    </h1>
                    <p className="font-body text-text-secondary mt-4 max-w-xl mx-auto">
                        Explore os mundos fantásticos criados pelo Studio Ghibli - histórias cheias de magia, natureza e personagens inesquecíveis.
                    </p>
                </section>

                {/* ===== BUSCA (destaque principal) ===== */}
                <input
                    type="text"
                    placeholder="Buscar filme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="font-body w-full max-w-lg mx-auto block border-2 border-primary rounded-lg px-5 py-3 mb-10 text-text text-lg shadow-sm focus:ring-2 focus:ring-primary"
                />

                <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6"></div>

                {searchTerm && !loading && !error && (
                    <div className="bg-surface-alt rounded-xl p-6 mb-12">
                        <h2 className="font-display text-2xl text-heading text-center mb-6">
                            Resultados da busca
                        </h2>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                            {filteredFilms.map((film) => (
                                <li key={film.id}
                                    className="group border-2 border-primary/30 rounded-lg overflow-hidden shadow-sm bg-surface transition duration-200 hover:shadow-lg">
                                    <Link to={`/film/${film.id}`}>
                                        <img
                                            src={film.movie_banner}
                                            alt={film.title}
                                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
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
                )}

                {/* ===== FILMES EM DESTAQUE ===== */}
                <h2 className="font-display text-xl text-heading text-center mb-6">
                    Filmes em destaque
                </h2>

                {loading && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 mb-12">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <li key={index} className="border border-border rounded-lg overflow-hidden bg-surface">
                                <div className="w-full h-64 bg-surface-alt animate-pulse"></div>
                                <div className="p-4 space-y-2">
                                    <div className="h-5 bg-surface-alt rounded animate-pulse w-3/4"></div>
                                    <div className="h-4 bg-surface-alt rounded animate-pulse w-1/2"></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {error && <p className="text-error text-center">Erro: {error}</p>}

                {!loading && !error && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 mb-12">
                        {featuredFilms.map((film) => (
                            <li key={film.id}
                                className="group border border-border rounded-lg overflow-hidden shadow-sm bg-surface transition duration-200 hover:shadow-lg">
                                <Link to={`/film/${film.id}`}>
                                    <img
                                        src={film.movie_banner}
                                        alt={film.title}
                                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
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
                )}
            </div>
        </>
    )
}

export default Home;