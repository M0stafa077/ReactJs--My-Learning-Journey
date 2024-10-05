import { useState } from "react";

export function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <ButtonToggle onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? "–" : "+"}
            </ButtonToggle>
            {isOpen && children}
        </div>
    );
}
export function MoviesList({ movies, onSelect }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MovieItem
                    movie={movie}
                    onSelect={onSelect}
                    key={movie.imdbID}
                />
            ))}
        </ul>
    );
}
export function WatchedMoviesList({ watchedMovies }) {
    return (
        <>
            <Statistics watched={watchedMovies} />
            <ul className="list">
                {watchedMovies.map((movie) => (
                    <WatchedMovieItem movie={movie} key={movie.imdbID} />
                ))}
            </ul>
        </>
    );
}
function WatchedMovieItem({ movie }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}
export function Statistics({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}
function MovieItem({ movie = {}, onSelect = () => {} }) {
    return (
        <li key={movie.imdbID} onClick={() => onSelect(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}
function ButtonToggle({ onClick, children }) {
    return (
        <button className="btn-toggle" onClick={onClick}>
            {children}
        </button>
    );
}
const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
