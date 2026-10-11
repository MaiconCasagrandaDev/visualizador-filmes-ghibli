import { Link } from "react-router-dom";
import { FilmCard } from "../../components/FilmCard";
import { useFilms } from "../../hooks/useFilms";

function Home() {
    const { films, loading, error } = useFilms();

    const featuredFilms = [...films]
        .sort((a, b) => Number(b.rt_score) - Number(a.rt_score))
        .slice(0, 3)

    return (
        <div className="max-w-7xl mx-auto px-6 bg-background">
            <section className="text-center py-12 mb-6">
                <h1 className="font-display text-4xl md:text-5xl text-heading">
                    Studio Ghibli
                </h1>
                <p className="font-body text-text-secondary mt-4 max-w-xl mx-auto">
                    Explore os mundos fantásticos criados pelo Studio Ghibli - histórias cheias de magia, natureza e personagens inesquecíveis.
                </p>
                <Link
                    to="/filmes"
                    className="font-body inline-block mt-6 bg-primary text-background rounded-lg px-6 py-3 hover:opacity-90 transition"
                >
                    Ver todos os filmes
                </Link>
            </section>

            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6"></div>

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
                        <FilmCard key={film.id} film={film} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Home;