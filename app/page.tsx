import Link from 'next/link'
import { getMovieById } from '@/lib/omdb'
import { MovieDetail } from '@/types/movie'

// IDs curados de OMDb — mezcla de películas y series conocidas
const POPULAR_IDS = [
    'tt3896198', // Guardians of the Galaxy Vol. 2
    'tt4154796', // Avengers: Endgame
    'tt0944947', // Game of Thrones
    'tt1375666', // Inception
    'tt0111161', // The Shawshank Redemption
    'tt4574334', // Stranger Things
    'tt0468569', // The Dark Knight
    'tt7286456', // Joker
]

async function getPopularMovies(): Promise<MovieDetail[]> {
    const requests = POPULAR_IDS.map((id) => getMovieById(id))
    const results = await Promise.all(requests)
    return results.filter((movie) => movie.Response !== 'False')
}

export default async function Home() {
    const movies = await getPopularMovies()

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gradient-to-r from-indigo-700 to-purple-700 py-10 px-6 text-center shadow-lg">
                <h1 className="text-4xl font-bold">🎬 Galería de Películas y Series</h1>
                <p className="mt-2 text-indigo-100">
                    Renderizado en el servidor (SSR) — esta lista ya viene lista desde el primer HTML
                </p>
                <Link
                    href="/search"
                    className="inline-block mt-6 bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
                >
                    🔍 Ir a Búsqueda interactiva
                </Link>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-semibold mb-6">Populares</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <div
                            key={movie.imdbID}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
                        >
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
                                alt={movie.Title}
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-sm line-clamp-2">{movie.Title}</h3>
                                <p className="text-gray-400 text-xs mt-1">
                                    {movie.Year} · {movie.Type === 'series' ? 'Serie' : 'Película'}
                                </p>
                                <p className="text-yellow-400 text-xs mt-1">⭐ {movie.imdbRating}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}