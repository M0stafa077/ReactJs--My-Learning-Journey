import { useLoaderData } from "react-router-dom";
import { MenuItemInterface } from "./interfaces/menuItem.interface";
import MenuItem from "./MenuItem";

function Menu() {
    const menu = useLoaderData();

    return (
        <ul>
            {menu.map((pizza: MenuItemInterface) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    );
}

export default Menu;
