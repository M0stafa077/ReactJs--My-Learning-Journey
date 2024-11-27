import { IconButton } from "@mui/material";
import { formatCurrency } from "../../utils/helpers";
import { CartItemI } from "./Cart";
import { Delete } from "@mui/icons-material";

function CartItem({ item }: { item: CartItemI }) {
    const { pizzaId, name, quantity, totalPrice } = item;

    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between">
            <p className="mb-1 sm:mb-0">
                {quantity}&times; {name}
            </p>
            <div className="flex items-center justify-between gap-x-4">
                <p className="text-sm font-semibold">
                    {formatCurrency(totalPrice)}
                </p>
                <IconButton aria-label="delete" size="small">
                    <Delete fontSize="small" color="error" />
                </IconButton>
            </div>
        </li>
    );
}

export default CartItem;
