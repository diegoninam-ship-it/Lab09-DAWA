'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { searchMovies, getMovieById } from '@/lib/omdb'
import { MovieSearchResult, MovieDetail } from '@/types/movie'
import MovieModal from '@/components/MovieModal'

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<MovieSearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null)
    const [detailLoading, setDetailLoading] = useState(false)

    // Búsqueda en tiempo real, con debounce para no disparar una petición por cada tecla
    useEffect(() => {
        if (query.trim().length < 3) {
            setResults([])
            setErrorMsg('')
            return
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true)
            setErrorMsg('')
            try {
                const data = await searchMovies(query)
                if (data.Response === 'False') {
                    setResults([])
                    setErrorMsg(data.Error || 'Sin resultados')
                } else {
                    setResults(data.Search || [])
                }
            } catch (err) {
                setErrorMsg('Error al conectar con OMDb')
            } finally {
                setLoading(false)
            }
        }, 500) // espera 500ms desde la última tecla antes de buscar

        return () => clearTimeout(timeoutId)
    }, [query])

    async function handleSelectMovie(imdbID: string) {
        setDetailLoading(true)
        setSelectedMovie(null)
        try {
            const movie = await getMovieById(imdbID)
            setSelectedMovie(movie)
        } catch (err) {
            setErrorMsg('No se pudo cargar el detalle')
        } finally {
            setDetailLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gradient-to-r from-pink-600 to-orange-500 py-8 px-6 text-center">
                <h1 className="text-3xl font-bold">🔍 Búsqueda interactiva</h1>
                <p className="text-orange-100 mt-1">Renderizado del lado del cliente (CSR) — resultados en vivo</p>
                <Link href="/" className="inline-block mt-4 text-sm underline text-orange-100 hover:text-white">
                    ← Volver a Populares
                </Link>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-10">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Escribe un título (mín. 3 letras)... ej: batman"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-5 py-3 text-lg focus:outline-none focus:border-pink-500"
                />

                <div className="mt-8">
                    {loading && (
                        <p className="text-center text-gray-400">Buscando...</p>
                    )}

                    {!loading && errorMsg && (
                        <p className="text-center text-red-400">{errorMsg}</p>
                    )}

                    {!loading && !errorMsg && results.length === 0 && query.trim().length >= 3 && (
                        <p className="text-center text-gray-500">Sin resultados todavía</p>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {results.map((movie) => (
                            <button
                                key={movie.imdbID}
                                onClick={() => handleSelectMovie(movie.imdbID)}
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform text-left"
                            >
                                <img
                                    src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
                                    alt={movie.Title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="font-semibold text-sm line-clamp-2">{movie.Title}</h3>
                                    <p className="text-gray-400 text-xs mt-1">
                                        {movie.Year} · {movie.Type === 'series' ? 'Serie' : 'Película'}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <MovieModal
                movie={selectedMovie}
                loading={detailLoading}
                onClose={() => setSelectedMovie(null)}
            />
        </div>
    )
}