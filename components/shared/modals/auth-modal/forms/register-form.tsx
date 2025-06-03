"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formRegisterSchema, TFormRegisterValues } from "./schemas";
import toast from "react-hot-toast";
import { FormInput, Title } from "@/components/shared";
import { Button } from "@/components/ui";
import { registerUser } from "@/app/actions";

interface Props {
    onClose?: VoidFunction;
    onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
            });

            toast.success("Регистрация успешна 📝. Подтвердите свою почту");

            onClose?.();
        } catch (error) {
            console.error("Error [REGISTER]", error);
            toast.error("Неверный E-Mail или пароль");
        }
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title
                            text="Регистрация"
                            size="md"
                            className="font-bold"
                        />
                    </div>
                    <img
                        src="/assets/images/phone-icon.png"
                        alt="Phone Icon"
                        width={60}
                        height={60}
                    />
                </div>

                <FormInput name="fullName" label="Полное имя" required />
                <FormInput name="email" label="E-Mail" required />
                <FormInput
                    name="password"
                    label="Пароль"
                    type="password"
                    required
                />
                <FormInput
                    name="confirmPassword"
                    label="Подтвердите пароль"
                    type="password"
                    required
                />
                <Button
                    loading={form.formState.isSubmitting}
                    className="h-12 text-base"
                    type="submit"
                >
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
};
