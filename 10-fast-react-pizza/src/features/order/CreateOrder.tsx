import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";

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
        <div className="px-4 py-6">
            <h2 className="mb-8 text-center text-xl font-semibold">
                Ready to order? <span className="uppercase">Let's go!</span>
            </h2>

            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        className="input grow"
                        placeholder="Enter your first name "
                        type="text"
                        name="customer"
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            placeholder="Enter your phone number"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="mt-2 rounded-lg bg-red-100 p-2 pl-4 text-xs text-red-700">
                                {" " + formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            placeholder="Enter your address"
                            type="text"
                            name="address"
                            required
                        />
                    </div>
                </div>

                <div className="mb-7 flex items-center gap-3">
                    <input
                        className="size-4 accent-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
                        type="checkbox"
                        name="priority"
                        id="priority"
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <Button disabled={isSubmitting}>
                        {isSubmitting ? "Placing Order..." : "Order now"}
                    </Button>
                </div>
                <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            </Form>
        </div>
    );
}

export default CreateOrder;
