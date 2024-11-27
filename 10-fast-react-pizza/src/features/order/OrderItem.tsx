import { formatCurrency } from "../../utils/helpers";

interface ProbsI {
    item: {
        name: string;
        quantity: number;
        totalPrice: number;
    };
    isLoadingIngredients?: boolean;
    ingredients?: any;
}

function OrderItem({
    item,
    isLoadingIngredients = false,
    ingredients = "",
}: ProbsI) {
    const { quantity, name, totalPrice } = item;

    return (
        <li className="py-3">
            <div className="flex items-center justify-between gap-4 text-sm font-bold">
                <p>
                    <span>{quantity}&times;</span> {name}
                </p>
                <p>{formatCurrency(totalPrice)}</p>
            </div>
        </li>
    );
}

export default OrderItem;
