import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { ProductVariation } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { Variant } from "@/components/shared/group-variants";
import { getAvailablePizzaSizes } from "@/lib";

interface ReturnProps {
    size: PizzaSize;
    pizzaType: PizzaType;
    selectedIngredients: Set<number>;
    availablePizzaSizes: Variant[];
    currentVariationId?: number;
    setSize: (size: PizzaSize) => void;
    setPizzaType: (pizzaType: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (
    variations: ProductVariation[]
): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [pizzaType, setPizzaType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(
        new Set<number>([])
    );

    const availablePizzaSizes = getAvailablePizzaSizes(variations, pizzaType);

    const currentVariationId = variations.find(
        (item) => item.pizzaType === pizzaType && item.size === size
    )?.id;

    useEffect(() => {
        const isAvailableSize = availablePizzaSizes.find(
            (item) => Number(item.value) === size && !item.disabled
        );
        const availableSize = availablePizzaSizes.find(
            (item) => !item.disabled
        );

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [pizzaType]);

    return {
        size,
        pizzaType,
        selectedIngredients,
        availablePizzaSizes,
        currentVariationId,
        setSize,
        setPizzaType,
        addIngredient,
    };
};
