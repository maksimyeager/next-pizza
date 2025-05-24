import { Variant } from "@/components/shared/group-variants";
import { pizzaSizes, PizzaType } from "@/constants/pizza";
import { ProductVariation } from "@prisma/client";

export const getAvailablePizzaSizes = (
    variations: ProductVariation[],
    pizzaType: PizzaType
): Variant[] => {
    const filteredPizzasByType = variations.filter(
        (item) => item.pizzaType === pizzaType
    );
    const availablePizzaSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(
            (pizza) => Number(pizza.size) === Number(item.value)
        ),
    }));

    return availablePizzaSizes;
};
