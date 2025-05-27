"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CartButton, Container, SearchInput } from "./";
import { Button } from "../ui";
import { User } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    hasCart?: boolean;
    hasSearch?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({
    hasCart = true,
    hasSearch = true,
    className,
}) => {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.has("paid")) {
            setTimeout(() => {
                toast.success(
                    "Заказ успешно оплачен! Информация отправлена на почту."
                );
            }, 500);
        }
    }, []);

    return (
        <header className={cn("border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                {/* Logo - Левая Часть */}
                <Link href={"/"}>
                    <div className="flex items-center gap-4">
                        <Image
                            src={"/logo.png"}
                            alt="Logo"
                            width={35}
                            height={35}
                        />
                        <div>
                            <h1 className="text-2xl uppercase font-black">
                                Next Pizza
                            </h1>
                            <p className="text-sm text-gray-400 leading-3">
                                Вкусней уже некуда
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Поиск Продуктов */}
                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        <User size={16} />
                        Войти
                    </Button>

                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    );
};
