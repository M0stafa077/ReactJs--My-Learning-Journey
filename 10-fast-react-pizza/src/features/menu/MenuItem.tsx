import { formatCurrency } from "../../utils/helpers";
import { MenuItemInterface } from "./interfaces/menuItem.interface";

function MenuItem({ pizza }: { pizza: MenuItemInterface }) {
    const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

    return (
        <li>
            <img src={imageUrl} alt={name} />
            <div>
                <p>{name}</p>
                <p>{ingredients.join(", ")}</p>
                <div>
                    {!soldOut ? (
                        <p>{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p>Sold out</p>
                    )}
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
