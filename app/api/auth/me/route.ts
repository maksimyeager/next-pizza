import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getServerSession();

        if (!user) {
            return NextResponse.json(
                { message: "Вы не авторизованы" },
                { status: 401 }
            );
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.user.id),
            },
            select: {
                fullName: true,
                email: true,
                password: false,
            },
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "[USER_GET] Server error" },
            { status: 500 }
        );
    }
}
