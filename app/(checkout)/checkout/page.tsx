"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSidebar, Container, Title } from "@/components/";
import {
    CheckoutAddressForm,
    CheckoutCart,
    CheckoutPersonalForm,
} from "@/components/";
import { useCart } from "@/hooks";
import { checkoutFormSchema, CheckoutFormValues } from "@/constants";

export default function Checkout() {
    const { totalAmount, items, updateItemQuantity, removeCartItem } =
        useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: "",
        },
    });

    const onSubmit = (data: CheckoutFormValues) => {
        console.log(data);
    };

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
        <Container className="mt-10">
            <Title
                text={"Оформление заказа"}
                className="font-extrabold mb-8 text-[36px]"
            />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* Left */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                            />

                            <CheckoutPersonalForm />

                            <CheckoutAddressForm />
                        </div>

                        {/* Right */}
                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
