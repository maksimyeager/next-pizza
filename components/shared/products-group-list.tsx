"use client";

import React, { RefObject, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIntersection } from "react-use";
import { ProductCard, Title } from ".";
import { useCategoryStore } from "@/store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
    title: string;
    products: ProductWithRelations[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    products,
    categoryId,
    listClassName,
    className,
}) => {
    const intersectionRef = useRef<HTMLDivElement>(null);
    const intersection = useIntersection(
        intersectionRef as RefObject<HTMLDivElement>,
        {
            threshold: 0.4,
        }
    );
    const setActiveCategotyId = useCategoryStore((state) => state.setActiveId);

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategotyId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting, setActiveCategotyId]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div className={cn("grid grid-cols-3 gap-8", listClassName)}>
                {products.map((product) => {
                    return (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            price={product.variations[0].price}
                            ingredients={product.ingredients}
                        />
                    );
                })}
            </div>
        </div>
    );
};
