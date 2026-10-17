import axios from 'axios'
import { SearchResponse, MovieDetail } from '@/types/movie'

const BASE_URL = 'https://www.omdbapi.com/'
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY

export async function searchMovies(query: string): Promise<SearchResponse> {
    const response = await axios.get<SearchResponse>(BASE_URL, {
        params: { apikey: API_KEY, s: query }
    })
    return response.data
}

export async function getMovieById(id: string): Promise<MovieDetail> {
    const response = await axios.get<MovieDetail>(BASE_URL, {
        params: { apikey: API_KEY, i: id, plot: 'full' }
    })
    return response.data
}