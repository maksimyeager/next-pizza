import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { Ingredient, ProductVariation } from "@prisma/client";

export const getPizzaDetails = (
    pizzaType: PizzaType,
    size: PizzaSize,
    variations: ProductVariation[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const totalPrice = calcTotalPizzaPrice(
        pizzaType,
        size,
        variations,
        ingredients,
        selectedIngredients
    );
    const textDetaills = `${size} см, ${mapPizzaType[pizzaType]} тесто`;

    return { totalPrice, textDetaills };
};
