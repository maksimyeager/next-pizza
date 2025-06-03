import type { Metadata } from "next";
import { Container, Header } from "@/components/shared";

export const metadata: Metadata = {
    title: "Next Pizza | Корзина",
};

export default function CheckoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Container>
                <Header
                    hasCart={false}
                    hasSearch={false}
                    className="border-b-gray-200"
                />
                {children}
            </Container>
        </main>
    );
}
