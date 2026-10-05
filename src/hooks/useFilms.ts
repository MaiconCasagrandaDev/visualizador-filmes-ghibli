import { useEffect, useState} from "react";
import type { Film} from "../types/Film";

export function useFilms() {
    const [films, setFilms] = useState<Film[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)


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

    return { films, loading, error }

}