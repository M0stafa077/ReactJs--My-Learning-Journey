import { getOrder } from "../../../services/apiRestaurant";

interface paramsI {
    params: any;
}

export async function orderLoader({ params }: paramsI) {
    return getOrder(params.orderId);
}
