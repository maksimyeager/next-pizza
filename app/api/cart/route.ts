import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart, updateCartTotalAmount } from "@/lib";
import { CreateCartItemValues } from "@/services/dto/cart.dto";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({
                totalAmount: 0,
                items: [],
            });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    },
                ],
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        productVariation: {
                            include: {
                                product: true,
                            },
                        },
                        ingredients: true,
                    },
                },
            },
        });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log("[CART_GET] Server error", error);
        return NextResponse.json(
            { message: "Не удалось получить корзину" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get("cartToken")?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productVariationId: data.productVariationId,
                ingredients: { every: { id: { in: data.ingredients } } },
            },
        });

        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productVariationId: data.productVariationId,
                    quantity: 1,
                    ingredients: {
                        connect: data.ingredients?.map((id) => ({ id })),
                    },
                },
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token);

        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set("cartToken", token);
        return resp;
    } catch (error) {
        console.log("[CART_POST] Server error", error);
        return NextResponse.json(
            { message: "Не удалось создать корзину" },
            { status: 500 }
        );
    }
}
