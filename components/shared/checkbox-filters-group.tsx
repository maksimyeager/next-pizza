"use client";

import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    selectedValues?: Set<string>;
    name?: string;
    defaultValues?: string[];
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    loading,
    searchInputPlaceholder = "Поиск...",
    onClickCheckbox,
    selectedValues,
    name,
    // defaultValues,
    className,
}) => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const itemsList = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLowerCase())
          )
        : (defaultItems || items).slice(0, limit);

    const onChangeSerachValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>

                {...Array(limit)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-6 mb-4 rounded-[8px]"
                        />
                    ))}

                <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
            </div>
        );
    }

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                        onChange={onChangeSerachValue}
                    />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {itemsList.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        checked={selectedValues?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        endAdornment={item.endAdornment}
                        name={name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div
                    className={
                        showAll ? "border-t border-t-neutral-100 mt-4" : ""
                    }
                >
                    <button
                        className="text-primary mt-3"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Скрыть" : "+ Показать всё"}
                    </button>
                </div>
            )}
        </div>
    );
};
