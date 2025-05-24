"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GroupVariants, PizzaImage, Title, IngredientItem } from ".";
import { Button } from "../ui";
import { PizzaSize, PizzaType, pizzaTypes } from "@/constants/pizza";
import { Ingredient, ProductVariation } from "@prisma/client";
import { getPizzaDetails } from "@/lib/";
import { usePizzaOptions } from "@/hooks";

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    variations: ProductVariation[];
    onSubmit: (variationId: number, ingredients: number[]) => void;
    loading: boolean;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
    imageUrl,
    name,
    ingredients,
    variations,
    onSubmit,
    loading,
    className,
}) => {
    const {
        size,
        pizzaType,
        selectedIngredients,
        availablePizzaSizes,
        currentVariationId,
        setSize,
        setPizzaType,
        addIngredient,
    } = usePizzaOptions(variations);

    const { totalPrice, textDetaills } = getPizzaDetails(
        pizzaType,
        size,
        variations,
        ingredients,
        selectedIngredients
    );

    const handleClickAdd = () => {
        if (currentVariationId) {
            onSubmit(currentVariationId, Array.from(selectedIngredients));
        }
    };

    return (
        <div className={cn(className, "flex flex-1")}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetaills}</p>

                <div className="flex flex-col gap-4 mt-5">
                    <GroupVariants
                        items={availablePizzaSizes}
                        value={String(size)}
                        onClick={(value) => setSize(Number(value) as PizzaSize)}
                    />
                    <GroupVariants
                        items={pizzaTypes}
                        value={String(pizzaType)}
                        onClick={(value) =>
                            setPizzaType(Number(value) as PizzaType)
                        }
                    />
                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[210px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((item) => (
                            <IngredientItem
                                key={item.id}
                                name={item.name}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                active={selectedIngredients.has(item.id)}
                                onClick={() => addIngredient(item.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    loading={loading}
                    onClick={handleClickAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                >
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
