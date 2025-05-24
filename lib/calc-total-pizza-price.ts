import { PizzaSize, PizzaType } from "@/constants/pizza";
import { Ingredient, ProductVariation } from "@prisma/client";

export const calcTotalPizzaPrice = (
    pizzaType: PizzaType,
    size: PizzaSize,
    variations: ProductVariation[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice =
        variations.find(
            (item) => item.size === size && item.pizzaType == pizzaType
        )?.price || 0;
    const totalIngredientPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);
    const totalPrice = pizzaPrice + totalIngredientPrice;

    return totalPrice;
};
