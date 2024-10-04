import { useState } from "react";
import { average, tempWatchedData, ButtonToggle } from "./App";

export function WatchedMoviesList() {
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);
    return (
        <div className="box">
            <ButtonToggle onClick={() => setIsOpen2((open) => !open)}>
                {isOpen2 ? "–" : "+"}
            </ButtonToggle>
            {isOpen2 && (
                <>
                    <Statistics watched={watched} />
                    <ul className="list">
                        {watched.map((movie) => (
                            <WatchedMovieItem movie={movie} key={movie.Title} />
                        ))}
                    </ul>
                </>
            )}
        </div>
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
function Statistics({ watched }) {
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
