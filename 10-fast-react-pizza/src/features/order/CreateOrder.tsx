import { Form, useActionData, useNavigation } from "react-router-dom";

const fakeCart = [
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

function CreateOrder() {
    const formErrors = useActionData();
    const cart = fakeCart;
    const isSubmitting = useNavigation().state === "loading";

    return (
        <div>
            <h2>Ready to order? Let's go!</h2>

            <Form method="POST">
                <div>
                    <label>First Name</label>
                    <input type="text" name="customer" required />
                </div>

                <div>
                    <label>Phone number</label>
                    <div>
                        <input type="tel" name="phone" required />
                    </div>
                    {formErrors?.phone && <span> {formErrors.phone}</span>}
                </div>

                <div>
                    <label>Address</label>
                    <div>
                        <input type="text" name="address" required />
                    </div>
                </div>

                <div>
                    <input type="checkbox" name="priority" id="priority" />
                    <label htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? "Placing Order..." : "Order now"}
                    </button>
                </div>
                <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            </Form>
        </div>
    );
}

export default CreateOrder;
