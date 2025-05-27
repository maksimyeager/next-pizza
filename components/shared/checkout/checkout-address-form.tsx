import React from "react";
import { FormInput, FormTextarea, WhiteBlock } from "..";

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <FormInput
                    name="address"
                    className="text-base"
                    placeholder="Введите адрес"
                    label="Адрес"
                    required
                />

                <FormTextarea
                    name="comment"
                    className="text-base"
                    placeholder="Комментарий к заказу"
                    label="Комментарий"
                />
            </div>
        </WhiteBlock>
    );
};
