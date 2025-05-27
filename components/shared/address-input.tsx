"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
    onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token="0f7527d00d54a7d92dc75598e6fe7c6cfdb499ad"
            onChange={(data) => onChange?.(data?.value)}
            suggestionClassName="text-red"
        />
    );
};
