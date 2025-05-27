import React from "react";
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from "..";
import { getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { CartStateItem } from "@/lib/get-cart-details";

interface Props {
    items: CartStateItem[];
    onClickCountButton: (
        id: number,
        quantity: number,
        type: "plus" | "minus"
    ) => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
    items,
    onClickCountButton,
    removeCartItem,
    loading,
    className,
}) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {loading
                    ? new Array(3)
                          .fill(0)
                          .map((_, index) => (
                              <CheckoutItemSkeleton key={index} />
                          ))
                    : items.map((item) => (
                          <CheckoutItem
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              imageUrl={item.imageUrl}
                              price={item.price}
                              quantity={item.quantity}
                              details={getCartItemDetails(
                                  item.ingredients,
                                  item.pizzaType as PizzaType,
                                  item.pizzaSize as PizzaSize
                              )}
                              disabled={item.disabled}
                              onClickCountButton={(type) =>
                                  onClickCountButton(
                                      item.id,
                                      item.quantity,
                                      type
                                  )
                              }
                              onClickRemove={() => removeCartItem(item.id)}
                          />
                      ))}
            </div>
        </WhiteBlock>
    );
};
