import React from "react";
import { WhiteBlock } from "..";
import { FormInput } from "../form";

interface Props {
    className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="2. Персональная информация" className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput
                    name="firstName"
                    className="text-base"
                    placeholder="Имя"
                    label="Имя"
                    required
                />
                <FormInput
                    name="lastName"
                    className="text-base"
                    placeholder="E-Mail"
                    label="Фамилия"
                    required
                />
                <FormInput
                    name="email"
                    className="text-base"
                    placeholder="E-Mail"
                    label="E-Mail"
                    required
                />
                <FormInput
                    name="phone"
                    className="text-base"
                    placeholder="Телефон"
                    label="Телефон"
                    required
                />
            </div>
        </WhiteBlock>
    );
};
