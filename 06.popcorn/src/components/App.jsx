import { useEffect, useState } from "react";
import { Navbar, Logo, SearchBox, NumResult } from "./Navbar";
import { MoviesContainer, MoviesList, WatchedMoviesList } from "./MovieBox";
import MovieDetails from "./MovieDetails";

const searchApiURL = `https://www.omdbapi.com/?i=tt3896198&apikey=47c6b691&s=`;

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                const res = await fetch(searchApiURL + query, {
                    signal: controller.signal,
                });
                const data = await res.json();
                if (data.Response === "False")
                    throw new Error("Movie not found!");

                setMovies(data.Search ? data.Search : []);
            } catch (err) {
                if (err.message === "signal is aborted without reason") {
                    return;
                }
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

        return () => {
            controller.abort();
        };
    }, [query]);

    useEffect(() => {
        function eventCallback(e) {
            if (e.key === "/") {
                e.preventDefault();
                document.getElementById("searchBox").focus();
            }
        }
        document.addEventListener("keydown", eventCallback);
        return () => document.removeEventListener("keydown", eventCallback);
    }, []);
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
    function handleAddWatchedMovie(movie) {
        setWatched((watched) => [...watched, movie]);
    }
    function handleDeleteWatchedMovie(movieId) {
        setWatched((watched) =>
            watched.filter((movie) => movie.imdbID !== movieId)
        );
    }
    return (
        <>
            <Navbar movies={movies}>
                <Logo />
                <SearchBox query={query} onSerach={handleSearch} />
                <NumResult movies={movies} />
            </Navbar>
            <Main>
                <MoviesContainer>
                    {isLoading && <Loader />}
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
                </MoviesContainer>
                <MoviesContainer>
                    {selectedMovie ? (
                        <MovieDetails
                            movieId={selectedMovie}
                            onClose={handleClose}
                            onAddMovie={handleAddWatchedMovie}
                            watched={watched}
                        />
                    ) : (
                        <WatchedMoviesList
                            watchedMovies={watched}
                            onDelete={handleDeleteWatchedMovie}
                        />
                    )}
                </MoviesContainer>
            </Main>
        </>
    );
}
function Main({ children }) {
    return <main className="main">{children}</main>;
}
export function Loader() {
    return <p className="loader">Loading...</p>;
}
