import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Film } from "../../types/Film"

function FilmDetails() {
    const { id } = useParams()

    const [film, setFilm] = useState<Film | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        async function fetchFilm() {
            try {
                const result = await fetch(`https://ghibliapi.vercel.app/films/${id}`)

                if (!result.ok) {
                    throw new Error("Erro ao buscar detalhes do filme")
                }

                const data = await result.json()

                setFilm(data)
            } catch (error) {
                setError("Erro ao buscar detalhes do filme")
            }finally {

            }
        }
        fetchFilm()
    }, [id])

    if (error) {
        return <p>Erro: {error}</p>
    }

    if (!film) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h2>{film.title}</h2>
            <img src={film.movie_banner} alt={film.title} />
            <p>📅 Lançamento: {film.release_date}</p>
            <p>⭐Nota: {film.rt_score}</p>
            <p>{film.description}</p>
        </div>
    )
}

export default FilmDetails