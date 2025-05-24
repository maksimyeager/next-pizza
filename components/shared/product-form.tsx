"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/store";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm, ChooseProductForm } from "./";

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
    product,
    onSubmit: _onSubmit,
}) => {
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);

    const firstVariation = product.variations[0];
    const isPizza = Boolean(firstVariation.pizzaType);

    const onSubmit = async (
        productVariationId?: number,
        ingredients?: number[]
    ) => {
        try {
            const variationId = productVariationId ?? firstVariation.id;

            await addCartItem({
                productVariationId: variationId,
                ingredients,
            });

            toast.success(`Товар ${product.name} успешно добавлен в корзину`);

            _onSubmit?.();
        } catch (error) {
            toast.error(`Не удалось добавить ${product.name} в корзину`);
            console.error(error);
        }
    };

    if (isPizza) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                ingredients={product.ingredients}
                variations={product.variations}
                onSubmit={onSubmit}
                loading={loading}
            />
        );
    }

    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstVariation.price}
            onSumbit={onSubmit}
            loading={loading}
        />
    );
};
