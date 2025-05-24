import React from "react";
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";
import qs from "qs";

export const useQueryFiltres = (filters: Filters) => {
    const router = useRouter();

    React.useEffect(() => {
        const params = {
            ...filters.prices,
            sizes: Array.from(filters.sizes),
            pizzaTypes: Array.from(filters.pizzaTypes),
            ingredients: Array.from(filters.selectedIngredients),
        };

        const queryString = qs.stringify(params, {
            arrayFormat: "comma",
        });

        router.push(`?${queryString}`, {
            scroll: false,
        });
    }, [
        router,
        filters.prices,
        filters.pizzaTypes,
        filters.selectedIngredients,
        filters.sizes,
    ]);
};
