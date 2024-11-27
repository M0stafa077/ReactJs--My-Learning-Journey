import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-500 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-800 focus:ring-opacity-50 focus:ring-offset-2 sm:w-64 sm:focus:w-72"
                placeholder="Search with order number"
                value={query}
                onChange={handleSearch}
            ></input>
        </form>
    );
}
