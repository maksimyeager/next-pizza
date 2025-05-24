"use client";

import { CartStateItem } from "@/lib/get-cart-details";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { useCartStore } from "@/store";
import { useEffect } from "react";

interface ReturnProps {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
    removeCartItem: (id: number) => void;
}

export const useCart = (): ReturnProps => {
    const cartState = useCartStore((state) => state);

    useEffect(() => {
        cartState.fetchCartItems();
    }, []);

    return cartState;
};
