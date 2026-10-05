import { useEffect, useState } from "react"
import type { Film } from "../types/Film";

export function useFilm(id: string | undefined) {
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

    return { film, loading, error}

}