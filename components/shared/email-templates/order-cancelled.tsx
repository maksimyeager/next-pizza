import React from "react";

interface Props {
    orderId: number;
}

export const OrderCancelledTemplate: React.FC<Props> = ({ orderId }) => {
    return (
        <div>
            <h1>Ваш заказ отменён 😕</h1>

            <p>К сожалению, оплата заказа #{orderId} не была завершена.</p>
        </div>
    );
};
