"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getCartItemDetails } from "@/lib";
import { useCart } from "@/hooks";
import { Button } from "../ui";
import { Title, CartDrawerItem } from "./";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { totalAmount, items, updateItemQuantity, removeCartItem } =
        useCart();

    const [redirecting, setRedirecting] = useState<boolean>(false);

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: "plus" | "minus"
    ) => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
        console.log(id, newQuantity, type);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div
                    className={cn(
                        "flex flex-col h-full",
                        !totalAmount && "justify-center"
                    )}
                >
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle className="text-[20px]">
                                В корзине{" "}
                                <span className="font-bold">
                                    {items.length} товара
                                </span>
                            </SheetTitle>
                        </SheetHeader>
                    )}

                    {!totalAmount && (
                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image
                                src="/assets/images/empty-box.png"
                                alt="Empty cart"
                                width={120}
                                height={120}
                            />
                            <Title
                                size="sm"
                                text="Корзина пустая"
                                className="text-center font-bold my-2"
                            />
                            <p className="text-center text-neutral-500 mb-5">
                                Добавьте хотя бы один продукт, чтобы совершить
                                заказ
                            </p>
                            <SheetClose>
                                <Button
                                    className="w-56 h-12 text-base"
                                    size="lg"
                                >
                                    <ArrowLeft className="w-5 mr-2" />
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {totalAmount > 0 && (
                        <>
                            <div className="flex flex-col gap-2 pb-2 mt-5 overflow-auto flex-1">
                                {items.map((item) => (
                                    <CartDrawerItem
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
                                        onClickRemove={() =>
                                            removeCartItem(item.id)
                                        }
                                    />
                                ))}
                            </div>

                            <SheetFooter className=" bg-white p-8">
                                <div className="w-full">
                                    <div className="flex mb-4">
                                        <span className="flex flex-1 text-lg text-neutral-500">
                                            Итого
                                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                        </span>

                                        <span className="font-bold text-lg">
                                            {totalAmount} ₽
                                        </span>
                                    </div>

                                    <Link href="/checkout">
                                        <Button
                                            onClick={() => setRedirecting(true)}
                                            loading={redirecting}
                                            type="submit"
                                            className="w-full h-12 text-base"
                                        >
                                            Оформить заказ
                                            <ArrowRight className="w-5 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};
