// Lo que devuelve OMDb en una búsqueda (?s=...) — datos resumidos
export interface MovieSearchResult {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

// Lo que devuelve OMDb al pedir un título por Id (?i=...) — datos completos
export interface MovieDetail {
    Title: string
    Year: string
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Poster: string
    imdbRating: string
    imdbID: string
    Type: string
    Response: string
    Error?: string
}

export interface SearchResponse {
    Search?: MovieSearchResult[]
    totalResults?: string
    Response: string
    Error?: string
}