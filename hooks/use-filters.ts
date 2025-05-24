"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    sizes: string;
    pizzaTypes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (key: string) => void;
    setSizes: (key: string) => void;
    setSelectedIngredients: (key: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFilters,
        string
    >;

    // Фильтр ингредиентов
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get("ingredients")?.split(","))
    );

    // Фильтр размеров и типов теста
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(
            searchParams.get("sizes")
                ? searchParams.get("sizes")?.split(",")
                : []
        )
    );
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(
            searchParams.get("pizzaTypes")
                ? searchParams.get("pizzaTypes")?.split(",")
                : []
        )
    );

    // Фильтрация цен
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return React.useMemo(
        () => ({
            sizes,
            pizzaTypes,
            selectedIngredients,
            prices,
            setPrices: updatePrice,
            setPizzaTypes: togglePizzaTypes,
            setSizes: toggleSizes,
            setSelectedIngredients: toggleIngredients,
        }),
        [
            pizzaTypes,
            prices,
            selectedIngredients,
            sizes,
            toggleIngredients,
            togglePizzaTypes,
            toggleSizes,
        ]
    );
};
