import { useEffect, useState } from "react";
import { Navbar, Logo, SearchBox, NumResult } from "./Navbar";
import { Box, MoviesList, WatchedMoviesList } from "./MovieBox";

const apiURL = `https://www.omdbapi.com/?i=tt3896198&apikey=47c6b691&s=`;

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                const res = await fetch(apiURL + query);
                const data = await res.json();
                if (data.Response === "False")
                    throw new Error("Movie not found!");
                setMovies(data.Search ? data.Search : []);
            } catch (err) {
                setError(
                    err.message === "Failed to fetch"
                        ? "Something went wrong"
                        : err.message
                );
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, [query]);
    function handleSearch(query) {
        setQuery(query);
        setError("");
    }
    function handleMovieSelection(movieId) {
        setSelectedMovie((oldId) => (oldId === movieId ? null : movieId));
    }
    function handleClose() {
        setSelectedMovie(null);
    }
    return (
        <>
            <Navbar movies={movies}>
                <Logo />
                <SearchBox query={query} onSerach={handleSearch} />
                <NumResult movies={movies} />
            </Navbar>
            <Main>
                <Box>
                    {isLoading && <p className="loader">Loading...</p>}
                    {!isLoading && !error && (
                        <MoviesList
                            movies={movies}
                            onSelect={handleMovieSelection}
                        />
                    )}
                    {error && <p className="error">{error}</p>}
                    {!query && (
                        <p className="loader">Start searching for movies </p>
                    )}
                </Box>

                <Box>
                    {selectedMovie ? (
                        <MovieDetails
                            movieId={selectedMovie}
                            onClose={handleClose}
                        />
                    ) : (
                        <WatchedMoviesList watchedMovies={watched} />
                    )}
                </Box>
            </Main>
        </>
    );
}
function MovieDetails({ movieId, onClose = () => {} }) {
    return (
        <div className="details">
            <button className="btn-back" onClick={onClose}>
                &larr;
            </button>
            <h1 className="header">MOVIE</h1>
        </div>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}
