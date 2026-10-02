import { Link } from "react-router-dom";
import type { Film } from "../../types/Film";

interface FilmCardProps {
    film: Film;
    highlighted?: boolean; // true = usado na seção de busca, com borda destacada
}

export function FilmCard({ film, highlighted = false }: FilmCardProps) {
    return (
        <li
            className={`group rounded-lg overflow-hidden shadow-sm bg-surface transition duration-200 hover:shadow-lg ${highlighted ? "border-2 border-primary/30" : "border border-border"
                }`}
        >
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
    );
}