import { redirect } from "react-router-dom";
import { createOrder } from "../../../services/apiRestaurant";

const isValidPhone = (str: string) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );

export async function createOrderAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const order = {
        ...data,
        priority: data.priority === "on",
        cart: JSON.parse(String(data.cart)),
    };
    const errors: any = {};
    if (!isValidPhone(String(data.phone))) {
        errors.phone = "Please provide your correct phone number";
    }
    if (Object.keys(errors)) return errors;

    const createdOrderInfo = await createOrder(order);

    return redirect(`/order/${createdOrderInfo.id}`);
}
