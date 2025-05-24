"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { CheckboxFiltersGroup, RangeSlider, Title } from ".";
import { useIngredients, useFilters, useQueryFiltres } from "@/hooks/";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients();
    const filters = useFilters();
    useQueryFiltres(filters);

    // Изменения ингредиентов под нужный тип
    const items = ingredients.map(({ id, name }) => {
        return {
            value: String(id),
            text: name,
        };
    });

    const updatePrices = (prices: number[]) => {
        filters.setPrices("priceFrom", prices[0]);
        filters.setPrices("priceTo", prices[1]);
    };

    return (
        <div className={cn("", className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            {/* Фильтрация Тип теста */}
            <CheckboxFiltersGroup
                name={"types"}
                title={"Тип теста:"}
                items={[
                    {
                        text: "Традиционное",
                        value: "1",
                    },
                    {
                        text: "Тонкое",
                        value: "2",
                    },
                ]}
                selectedValues={filters.pizzaTypes}
                onClickCheckbox={filters.setPizzaTypes}
                className="mb-5"
            />

            {/* Фильрация Размеры теста */}
            <CheckboxFiltersGroup
                name={"sizes"}
                title={"Размеры:"}
                items={[
                    { text: "20см", value: "20" },
                    { text: "30см", value: "30" },
                    { text: "40см", value: "40" },
                ]}
                selectedValues={filters.sizes}
                onClickCheckbox={filters.setSizes}
                className="mb-5"
            />

            {/* Фильрация по цене */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={filters.prices.priceFrom ?? 0}
                        onChange={(e) =>
                            filters.setPrices(
                                "priceFrom",
                                Number(e.target.value)
                            )
                        }
                    />
                    <Input
                        type="number"
                        placeholder="1000"
                        min={0}
                        max={1000}
                        value={filters.prices.priceTo ?? 1000}
                        onChange={(e) =>
                            filters.setPrices("priceTo", Number(e.target.value))
                        }
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[
                        filters.prices.priceFrom || 0,
                        filters.prices.priceTo || 1000,
                    ]}
                    onValueChange={updatePrices}
                />
            </div>

            {/* Фильтрация с ингредиентами */}
            <CheckboxFiltersGroup
                className="mt-5"
                title={"Ингредиенты:"}
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={filters.setSelectedIngredients}
                selectedValues={filters.selectedIngredients}
                name="ingredients"
            />
        </div>
    );
};
