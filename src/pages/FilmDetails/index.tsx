import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Film } from "../../types/Film"

function FilmDetails() {
    const { id } = useParams()
    const [film, setFilm] = useState<Film | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchFilm() {
            try {
                setLoading(true)
                const result = await fetch(`https://ghibliapi.vercel.app/films/${id}`)

                if (!result.ok) {
                    throw new Error("Erro ao buscar detalhes do filme")
                }

                const data = await result.json()

                setFilm(data)
            } catch (error) {
                setError("Erro ao buscar detalhes do filme")
            } finally {
                setLoading(false)
            }
        }
        fetchFilm()
    }, [id])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-8 animate-pulse">
                <div className="w-full h-96 bg-surface-alt rounded-lg"></div>
                <div className="h-8 bg-surface-alt rounded mt-6 w-1/2"></div>
                <div className="h-4 bg-surface-alt rounded mt-4 w-1/4"></div>
                <div className="h-4 bg-surface-alt rounded mt-6 w-full"></div>
                <div className="h-4 bg-surface-alt rounded mt-2 w-full"></div>
                <div className="h-4 bg-surface-alt rounded mt-2 w-3/4"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-8 text-center">
                <p className="text-error font-body">Erro: {error}</p>
            </div>
        )
    }

    if (!film) {
        return null
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <img
                src={film.movie_banner}
                alt={film.title}
                className="w-full h-96 object-cover rounded-lg shadow-md"
            />

            <h1 className="font-display text-3xl md:text-4xl text-heading mt-6">
                {film.title}
            </h1>

            <div className="font-body flex items-center gap-4 mt-2 text-text-secondary">
                <span>📅 {film.release_date}</span>
                <span>⭐ {film.rt_score}</span>
            </div>

            <div className="bg-surface border-l-4 border-l-primary rounded-lg p-10 mt-8 shadow-sm">
                <h2 className="font-display text-xl text-heading mb-4 flex items-center gap-2">
                    Sobre o filme
                </h2>
                <p className="font-body text-text leading-relaxed">
                    {film.description}
                </p>
            </div>

        </div>
    )
}

export default FilmDetails