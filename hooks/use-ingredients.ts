import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInhredients = async () => {
            try {
                const ingredients = await Api.ingredients.getAllIngredients();
                setIngredients(ingredients);
                setLoading(false);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInhredients();
    }, []);

    return {
        ingredients,
        loading,
    };
};
