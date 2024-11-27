// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { CartItemI } from "../cart/Cart";

interface OrderI {
    id: string;
    customer: string;
    phone: string;
    address: string;
    priority: boolean;
    estimatedDelivery: string; // ISO 8601 date string
    cart: CartItemI[];
    position: string; // Could also use a tuple type if the position is always lat, long
    orderPrice: number;
    priorityPrice: number;
}

const order = {
    id: "ABCDEF",
    customer: "Jonas",
    phone: "123456789",
    address: "Arroios, Lisbon , Portugal",
    priority: true,
    estimatedDelivery: "2027-04-25T10:00:00",
    status: "delivered",
    cart: [
        {
            pizzaId: 7,
            name: "Napoli",
            quantity: 3,
            unitPrice: 16,
            totalPrice: 48,
        },
        {
            pizzaId: 5,
            name: "Diavola",
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        },
        {
            pizzaId: 3,
            name: "Romana",
            quantity: 1,
            unitPrice: 15,
            totalPrice: 15,
        },
    ],
    position: "-9.000,38.000",
    orderPrice: 95,
    priorityPrice: 19,
};

function Order() {
    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
    // const order = useLoaderData();
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order;
    const deliveryIn = calcMinutesLeft(estimatedDelivery);

    return (
        <div className="space-y-8 px-4 py-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">Order #{id} status</h2>

                <div className="flex flex-wrap gap-y-2 space-x-2">
                    {priority && (
                        <span className="rounded-full bg-red-500 px-3 py-1 font-semibold uppercase tracking-wider text-red-50">
                            Priority
                        </span>
                    )}
                    <span className="rounded-full bg-green-500 px-3 py-1 font-semibold uppercase tracking-wider text-green-50">
                        {status} order
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-stone-200 px-6 py-4">
                <p className="font-semibold">
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(
                              estimatedDelivery,
                          )} minutes left 😃`
                        : "Order should have arrived"}
                </p>
                <p className="text-xs text-stone-500">
                    (Estimated delivery:{" "}
                    <span>{formatDate(estimatedDelivery)}</span>)
                </p>
            </div>

            <ul className="divide-y-2 divide-stone-200 border-b border-t">
                {cart.map((el: CartItemI) => {
                    return <OrderItem item={el} key={el.pizzaId} />;
                })}
            </ul>

            <div className="space-y-2 rounded-xl bg-stone-200 px-6 py-4">
                <p className="text-sm font-medium text-stone-500">
                    Price pizza: {formatCurrency(orderPrice)}
                </p>
                {priority && (
                    <p className="text-sm font-medium text-stone-500">
                        Price priority: {formatCurrency(priorityPrice)}
                    </p>
                )}
                <p className="font-bold text-stone-800">
                    To pay on delivery:{" "}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>
        </div>
    );
}

export default Order;
