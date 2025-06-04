import {
    Cart,
    CartItem,
    Ingredient,
    Product,
    ProductVariation,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
    productVariation: ProductVariation & {
        product: Product;
    };
    ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
    quantity: number;
    items: CartItemDTO[];
}

export interface CreateCartItemValues {
    productVariationId: number;
    ingredients?: number[];
}
