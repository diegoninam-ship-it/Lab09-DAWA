'use client'

import { MovieDetail } from '@/types/movie'

interface MovieModalProps {
    movie: MovieDetail | null
    loading: boolean
    onClose: () => void
}

export default function MovieModal({ movie, loading, onClose }: MovieModalProps) {
    if (!movie && !loading) return null

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 text-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-gray-900/80 hover:bg-red-600 w-9 h-9 rounded-full flex items-center justify-center text-lg"
                >
                    ✕
                </button>

                {loading ? (
                    <div className="flex items-center justify-center h-80">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-400"></div>
                    </div>
                ) : movie ? (
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
                            alt={movie.Title}
                            className="w-full md:w-60 h-80 object-cover rounded-lg mx-auto"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold">{movie.Title}</h2>
                            <p className="text-gray-400 text-sm mt-1">
                                {movie.Year} · {movie.Runtime} · {movie.Rated}
                            </p>
                            <p className="text-yellow-400 font-semibold mt-2">⭐ {movie.imdbRating} / 10</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {movie.Genre.split(', ').map((g) => (
                                    <span key={g} className="bg-indigo-600 text-xs px-3 py-1 rounded-full">
                                        {g}
                                    </span>
                                ))}
                            </div>

                            <p className="mt-4 text-sm text-gray-300 leading-relaxed">{movie.Plot}</p>

                            <div className="mt-4 text-sm text-gray-400 space-y-1">
                                <p><span className="text-gray-200 font-semibold">Director:</span> {movie.Director}</p>
                                <p><span className="text-gray-200 font-semibold">Actores:</span> {movie.Actors}</p>
                                <p><span className="text-gray-200 font-semibold">País:</span> {movie.Country}</p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}