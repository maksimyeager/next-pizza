import { PaymentCallbackData } from "@/@types/yookassa";
import { OrderSuccessTemplate, OrderCancelledTemplate } from "@/components";
import { sendEmail } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { CartItemDTO } from "@/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ReactNode } from "react";

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as PaymentCallbackData;

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id),
            },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" });
        }

        const isSucceeded = body.object.status === "succeeded";

        const jsx = isSucceeded ? OrderSuccessTemplate : "";

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: isSucceeded
                    ? OrderStatus.SUCCEEDED
                    : OrderStatus.CANCELLED,
            },
        });

        const items = JSON.parse(order.items as string) as CartItemDTO[];

        if (isSucceeded) {
            await sendEmail(
                order.email,
                "Next Pizza / Ваш заказ успешно оформлен 🎉",
                OrderSuccessTemplate({
                    orderId: order.id,
                    items: items,
                })
            );
        } else {
            await sendEmail(
                order.email,
                "Next Pizza / Ваш заказ успешно оформлен 🎉",
                OrderCancelledTemplate({
                    orderId: order.id,
                    items: items,
                })
            );
        }
    } catch (error) {
        console.error("[Checkout Callback] Error:", error);
        return NextResponse.json({ error: "Server error" });
    }
}
