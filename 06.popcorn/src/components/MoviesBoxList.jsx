import { useState } from "react";
import { ButtonToggle } from "./App";

export function MoviesBoxList({ movies }) {
    const [isOpen1, setIsOpen1] = useState(true);
    return (
        <div className="box">
            <ButtonToggle onClick={() => setIsOpen1((open) => !open)}>
                {isOpen1 ? "–" : "+"}
            </ButtonToggle>
            {isOpen1 && (
                <ul className="list">
                    {movies?.map((movie) => (
                        <MovieItem movie={movie} key={movie.Title} />
                    ))}
                </ul>
            )}
        </div>
    );
}
function MovieItem({ movie }) {
    return (
        <li key={movie.imdbID}>
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
