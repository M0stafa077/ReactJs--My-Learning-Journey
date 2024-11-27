import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
    return (
        <header className="flex items-center justify-between border-b-2 border-stone-200 bg-yellow-500 px-2.5 py-3 uppercase sm:px-3">
            <Link to="/" className="tracking-wider">
                Fast Rect Pizza Co.
            </Link>
            <SearchOrder />
            <Username />
        </header>
    );
}
