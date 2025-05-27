import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";
import qs from "qs";

export const useQueryFiltres = (filters: Filters) => {
    const isMounted = useRef(false);
    const router = useRouter();

    React.useEffect(() => {
        if (isMounted.current) {
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
        }

        isMounted.current = true;
    }, [
        router,
        filters.prices,
        filters.pizzaTypes,
        filters.selectedIngredients,
        filters.sizes,
    ]);
};
