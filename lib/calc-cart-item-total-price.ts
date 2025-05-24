import { CartItemDTO } from "@/services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO) => {
    const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => {
        return acc + ingredient.price;
    }, 0);

    const totalPrice =
        (ingredientsPrice + item.productVariation.price) * item.quantity;

    return totalPrice;
};
