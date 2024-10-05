import { useState } from "react";

export function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}
export function SearchBox({ query = "", onSerach = () => {} }) {
    // const [query, setQuery] = useState("");
    try {
        return (
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => onSerach(e.target.value)}
            />
        );
    } catch (err) {
        console.log(err);
    }
}
export function NumResult({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}
export function Navbar({ movies, children }) {
    return <nav className="nav-bar">{children}</nav>;
}
