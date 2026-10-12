import { useState } from "react";
import { FilmCard } from "../../components/FilmCard";
import { useFilms } from "../../hooks/useFilms";

type SortOption = "title" | "rating" | "year";

function Films() {
    const { films, loading, error } = useFilms();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>("title");

    const filteredFilms = films.filter((film) =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const sortedFilms = [...filteredFilms].sort((a, b) => {
        if (sortBy === "rating") return Number(b.rt_score) - Number(a.rt_score);
        if (sortBy === "year") return Number(a.release_date) - Number(b.release_date);
        return a.title.localeCompare(b.title);
    })

    return (
        <div className="max-w-7xl mx-auto px-6 bg-background">
            <section className="text-center py-12">
                <h1 className="font-display text-4xl text-heading">Filmes</h1>
                <p className="font-body text-text-secondary mt-4">
                    Busque e ordene todos os filmes do Studio Ghibli.
                </p>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-10">
                <input
                    type="text"
                    placeholder="Buscar filme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="font-body flex-1 border-2 border-primary rounded-lg px-5 py-3 text-text text-lg shadow-sm focus:ring-2 focus:ring-primary"
                />

                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="font-body appearance-none w-full bg-surface border-2 border-primary rounded-lg pl-4 pr-10 py-3 text-text cursor-pointer focus:ring-2 focus:ring-primary"
                    >
                        <option value="title">Título (A-Z)</option>
                        <option value="rating">Melhor nota</option>
                        <option value="year">Mais antigos primeiro</option>
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary text-xl">
                        ▾
                    </span>
                </div>
            </div>

            {loading && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 mb-12">
                    {Array.from({ length: 6 }).map((_, index) => (
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

            {!loading && !error && sortedFilms.length === 0 && (
                <p className="font-body text-text-secondary text-center mb-12">
                    Nenhum filme encontrado para "{searchTerm}".
                </p>
            )}

            {!loading && !error && sortedFilms.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 mb-12">
                    {sortedFilms.map((film) => (
                        <FilmCard key={film.id} film={film} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Films;
