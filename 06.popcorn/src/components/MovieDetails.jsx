import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { Loader } from "./App";
import { useKey } from "../customHooks/useKey";

const detailsApiURL = `https://www.omdbapi.com/?apikey=47c6b691&i=`;

export default function MovieDetails({
    movieId,
    onClose,
    onAddMovie,
    watched = [],
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(null);
    const isAddedBefore = watched.find((movie) => movie.imdbID === movieId);
    useEffect(() => {
        async function fetchDetails() {
            setIsLoading(true);
            const res = await fetch(detailsApiURL + movieId);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }
        fetchDetails();
    }, [movieId]);
    useEffect(() => {
        if (!movie.Title) return;
        document.title = "Movie | " + movie.Title;
        return () => {
            document.title = "Popcorn";
        };
    }, [movie]);
    useKey("Escape", onClose);
    function handleAdd() {
        const newWatchedMovie = {
            imdbID: movieId,
            Poster: movie.Poster,
            Title: movie.Title,
            imdbRating: Number(movie.imdbRating),
            userRating: Number(userRating),
            runtime: Number(movie.Runtime.split(" ")[0]),
        };
        onAddMovie(newWatchedMovie);
        onClose();
    }
    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <MovieDetailsHeader movie={movie} onClose={onClose} />
                    <section>
                        <Rating
                            isAddedBefore={isAddedBefore}
                            handleAdd={handleAdd}
                            userRating={userRating}
                            setUserRating={setUserRating}
                        />
                        <MovieSummary movie={movie} />
                    </section>
                </>
            )}
        </div>
    );
}
function MovieDetailsHeader({ movie, onClose }) {
    return (
        <header>
            <button className="btn-back" onClick={onClose} title="Back">
                &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`} />
            <div className="details-overview">
                <h2 className="header">{movie.Title}</h2>
                <p>
                    {movie.Released} &bull; {movie.Runtime}
                </p>
                <p>{movie.Genre}</p>
                <p>
                    <span>🌟</span>
                    {movie.imdbRating} IMDb Rating
                </p>
            </div>
        </header>
    );
}
function Rating({ isAddedBefore, handleAdd, userRating, setUserRating }) {
    return (
        <div className="rating">
            {!isAddedBefore ? (
                <>
                    <StarRating
                        maxRating={10}
                        size={24}
                        onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                        <button className="btn-add" onClick={handleAdd}>
                            Add to watched list
                        </button>
                    )}
                </>
            ) : (
                <p>You rated this movie</p>
            )}
        </div>
    );
}
function MovieSummary({ movie }) {
    return (
        <>
            <p>
                <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed By {movie.Director}</p>
        </>
    );
}
