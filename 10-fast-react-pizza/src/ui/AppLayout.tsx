import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
import SearchOrder from "../features/order/SearchOrder";

export default function AppLayout() {
    const isLoading = useNavigation().state === "loading";
    return (
        <div className="layout">
            {isLoading && <Loader />}
            <Header />
            <SearchOrder />
            <main>
                <Outlet />
            </main>
            <CartOverview />
        </div>
    );
}
