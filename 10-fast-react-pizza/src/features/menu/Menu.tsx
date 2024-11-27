import { useLoaderData } from "react-router-dom";
import { MenuItemInterface } from "./interfaces/menuItem.interface";
import MenuItem from "./MenuItem";

function Menu() {
    const menu = useLoaderData();

    return (
        <ul className="divide-y divide-stone-200 px-2">
            {menu.map((pizza: MenuItemInterface) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    );
}

export default Menu;
