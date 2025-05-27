import { CartItemDTO } from "@/services/dto/cart.dto";
import React from "react";

interface Props {
    orderId: number;
    items: CartItemDTO[];
}

export const OrderCancelledTemplate: React.FC<Props> = ({ orderId, items }) => {
    return (
        <div>
            <h1>Ваш заказ отменён 😕</h1>

            <p>
                К сожалению, оплата заказа #{orderId} не была завершена. Ниже
                список товаров из отменённого заказа:
            </p>

            <hr />

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.productVariation.product.name} |{" "}
                        {item.productVariation.price} ₽ x {item.quantity} шт. ={" "}
                        {item.productVariation.price * item.quantity} ₽
                    </li>
                ))}
            </ul>

            <p className="mt-4">
                Если вы столкнулись с проблемой или хотите повторить заказ,
                пожалуйста, свяжитесь с нашей поддержкой.
            </p>
        </div>
    );
};
