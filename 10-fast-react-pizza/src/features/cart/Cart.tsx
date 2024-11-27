import { Button as ClearButton } from "@mui/material";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

export interface CartItemI {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

const fakeCart: CartItemI[] = [
    {
        pizzaId: 12,
        name: "Mediterranean",
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: "Vegetale",
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: "Spinach and Mushroom",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];

function Cart() {
    const cart = fakeCart;

    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>

            <h2 className="mt-7 text-xl font-semibold">Your cart, %NAME%</h2>

            <ul className="mt-3 divide-y divide-stone-200 border-b">
                {cart.map((el) => (
                    <CartItem item={el} key={el.pizzaId} />
                ))}
            </ul>

            <div className="mt-6 space-x-3">
                <Button to="/order/new">Order pizzas</Button>
                <ClearButton
                    className="rounded-full"
                    variant="outlined"
                    color="error"
                >
                    Clear cart
                </ClearButton>
            </div>
        </div>
    );
}

export default Cart;
