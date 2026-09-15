import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Film } from "../../types/Film"

function FilmDetails() {
    const { id } = useParams()

    const [film, setFilm] = useState<Film | null>(null)

    useEffect(() => {
        async function fetchFilm() {
            const result = await fetch(`https://ghibliapi.vercel.app/films/${id}`)
            const data = await result.json()

            setFilm(data)
        }
        fetchFilm()
    }, [id])

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