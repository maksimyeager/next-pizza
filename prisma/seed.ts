import { prisma } from "./prisma-client";
import { hashSync } from "bcryptjs";
import { categories, ingredients, products } from "./constants";
import { Prisma } from "@prisma/client";

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductVariation = ({
    productId,
    size,
    pizzaType,
}: {
    productId: number;
    size?: 20 | 30 | 40;
    pizzaType?: 1 | 2;
}) => {
    return {
        productId,
        price: randomNumber(190, 600),
        size,
        pizzaType,
    } as Prisma.ProductVariationUncheckedCreateInput;
};

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: "Тестовый Пользователь",
                email: "user@example.com",
                password: hashSync("12345678", 10),
                verified: new Date(),
                role: "USER",
            },
            {
                fullName: "Тестовый Админ",
                email: "admin@example.com",
                password: hashSync("123456", 10),
                verified: new Date(),
                role: "ADMIN",
            },
        ],
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: "Пепперони",
            imageUrl:
                "https://media.dodostatic.net/image/r:584x584/11ee7d610a62d78598406363a9a8ad65.avif",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: "Сырная",
            imageUrl:
                "https://media.dodostatic.net/image/r:584x584/11ee7d610d2925109ab2e1c92cc5383c.avif",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: "Чоризо фреш",
            imageUrl:
                "https://media.dodostatic.net/image/r:584x584/11ee7d61706d472f9a5d71eb94149304.avif",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 20),
            },
        },
    });

    await prisma.productVariation.createMany({
        data: [
            // Пицца Пепперони
            generateProductVariation({
                productId: pizza1.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductVariation({
                productId: pizza1.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductVariation({
                productId: pizza1.id,
                pizzaType: 2,
                size: 40,
            }),

            // Пицца Сырная
            generateProductVariation({
                productId: pizza2.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductVariation({
                productId: pizza2.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductVariation({
                productId: pizza2.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductVariation({
                productId: pizza2.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductVariation({
                productId: pizza2.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductVariation({
                productId: pizza2.id,
                pizzaType: 2,
                size: 40,
            }),

            // Пицца Чоризо фреш
            generateProductVariation({
                productId: pizza3.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductVariation({
                productId: pizza3.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductVariation({
                productId: pizza3.id,
                pizzaType: 2,
                size: 40,
            }),

            // Остальные продукты
            generateProductVariation({ productId: 1 }),
            generateProductVariation({ productId: 2 }),
            generateProductVariation({ productId: 3 }),
            generateProductVariation({ productId: 4 }),
            generateProductVariation({ productId: 5 }),
            generateProductVariation({ productId: 6 }),
            generateProductVariation({ productId: 7 }),
            generateProductVariation({ productId: 8 }),
            generateProductVariation({ productId: 9 }),
            generateProductVariation({ productId: 10 }),
            generateProductVariation({ productId: 11 }),
            generateProductVariation({ productId: 12 }),
            generateProductVariation({ productId: 13 }),
            generateProductVariation({ productId: 14 }),
            generateProductVariation({ productId: 15 }),
            generateProductVariation({ productId: 16 }),
            generateProductVariation({ productId: 17 }),
        ],
    });

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: "111111",
            },
            {
                userId: 2,
                totalAmount: 0,
                token: "222222",
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            productVariationId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
            },
        },
    });
    await prisma.cartItem.create({
        data: {
            productVariationId: 2,
            cartId: 1,
            quantity: 3,
            ingredients: {
                connect: [{ id: 4 }, { id: 5 }],
            },
        },
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (error) {
        console.error(error);
    }
}

main().then(async () => {
    await prisma.$disconnect().catch(async (error) => {
        console.error(error);
        prisma.$disconnect();
        process.exit(1);
    });
});
