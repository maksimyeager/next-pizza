"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";

interface Props {
    items: Category[];
    className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
    const categoryActiveIndex = useCategoryStore((state) => state.activeId);

    return (
        <div
            className={cn(
                "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
                className
            )}
        >
            {items.map(({ id, name }) => (
                <a
                    className={cn(
                        "flex items-center font-bold h-11 rounded-2xl px-5",
                        categoryActiveIndex === id
                            ? "bg-white shadow-md shadow-gray-200 text-primary"
                            : ""
                    )}
                    key={id}
                    href={`/#${name}`}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
