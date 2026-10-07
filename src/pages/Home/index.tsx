import { useRef, useState } from "react";
import { FilmCard } from "../../components/FilmCard";
import { useFilms } from "../../hooks/useFilms";

function Home() {
    const { films, loading, error } = useFilms();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const searchRef = useRef<HTMLInputElement>(null);

    const sccrollToSearch = () => {
        searchRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
    }

    const filteredFilms = films.filter((film) =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const featuredFilms = [...films]
        .sort((a, b) => Number(b.rt_score) - Number(a.rt_score))
        .slice(0, 3)

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
                    ref={searchRef}
                    type="text"
                    placeholder="Buscar filme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={sccrollToSearch}
                    className="font-body w-full max-w-lg mx-auto block border-2 border-primary rounded-lg px-5 py-3 mb-10 text-text text-lg shadow-sm focus:ring-2 focus:ring-primary scroll-mt-24"
                />

                <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6"></div>

                {searchTerm && !loading && !error && (
                    <div className="bg-surface-alt rounded-xl p-6 mb-12">
                        <h2 className="font-display text-2xl text-heading text-center mb-6">
                            Resultados da busca
                        </h2>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                            {filteredFilms.map((film) => (
                                <FilmCard key={film.id} film={film} highlighted />
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
                            <FilmCard key={film.id} film={film} />
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default Home;