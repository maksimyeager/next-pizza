"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/constants";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import {
    CheckoutAddressForm,
    CheckoutCart,
    CheckoutPersonalForm,
    CheckoutSidebar,
    Container,
    Title,
} from "@/components/shared";
import { useSession } from "next-auth/react";
import { Api } from "@/services/api-client";

export default function Checkout() {
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
        useCart();

    const form = useForm<CheckoutFormValues>({
        // resolver: zodResolver(checkoutFormSchema),
        // defaultValues: {
        //     email: "",
        //     firstName: "",
        //     lastName: "",
        //     phone: "",
        //     address: "",
        //     comment: "",
        // },
    });

    useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullName.split(" ");

            form.setValue("firstName", firstName);
            form.setValue("lastName", lastName);
            form.setValue("email", data.email);
        }

        if (session) {
            fetchUserInfo();
        }
    }, [session]);

    const onSubmit = async (data: CheckoutFormValues) => {
        setSubmitting(true);
        try {
            const url = await createOrder(data);

            toast.success("Заказ успешно оформлен! 📝 Переход на оплату... ");

            if (url) {
                location.href = url;
            }
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            toast.error("Не удалось создать заказ");
        }
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
                                loading={loading}
                            />

                            <CheckoutPersonalForm
                                className={
                                    loading
                                        ? "opacity-40 pointer-events-none"
                                        : ""
                                }
                            />

                            <CheckoutAddressForm
                                className={
                                    loading
                                        ? "opacity-40 pointer-events-none"
                                        : ""
                                }
                            />
                        </div>

                        {/* Right */}
                        <div className="w-[450px]">
                            <CheckoutSidebar
                                totalAmount={totalAmount}
                                loading={loading || submitting}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
