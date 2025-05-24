import React from "react";
import { FormTextarea, WhiteBlock } from "..";
import { Input } from "@/components/ui";

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <Input
                    name="firstName"
                    className="text-base"
                    placeholder="Введите адрес"
                />

                <FormTextarea
                    name="comment"
                    className="text-base"
                    placeholder="Комментарий к заказу"
                />
            </div>
        </WhiteBlock>
    );
};
