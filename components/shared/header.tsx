"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    AuthModal,
    CartButton,
    Container,
    ProfileButton,
    SearchInput,
} from "./";
import { cn } from "@/lib/utils";
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

    const [openAuthModal, setOpenAuthModal] = useState(false);

    useEffect(() => {
        if (searchParams.has("paid")) {
            setTimeout(() => {
                toast.success(
                    "Заказ успешно оплачен! Информация отправлена на почту."
                );
            }, 500);
        }
    }, [searchParams]);

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
                    <ProfileButton
                        onClickSignIn={() => setOpenAuthModal(true)}
                    />

                    <AuthModal
                        open={openAuthModal}
                        onClose={() => setOpenAuthModal(false)}
                    />

                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    );
};
