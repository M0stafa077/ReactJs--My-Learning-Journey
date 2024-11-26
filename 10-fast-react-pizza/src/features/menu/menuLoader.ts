import { getMenu } from "../../services/apiRestaurant";

export async function menuLoader() {
    return getMenu();
}
