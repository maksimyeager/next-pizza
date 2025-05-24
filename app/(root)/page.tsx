import {
    Container,
    Filters,
    ProductsGroupList,
    Title,
    TopBar,
} from "@/components/shared";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";
import { Suspense } from "react";

export default async function Home({
    searchParams,
}: {
    searchParams: GetSearchParams;
}) {
    const categories = await findPizzas(searchParams);

    return (
        <>
            <Container className="mt-10">
                <Title text="Все Пиццы" size="lg" className="font-extrabold" />
            </Container>
            <TopBar
                categories={categories.filter(
                    (category) => category.products.length > 0
                )}
            />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/* Фильтрация */}
                    <div className="w-[250px]">
                        <Suspense>
                            <Filters />
                        </Suspense>
                    </div>

                    {/* Список Продуктов */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                (category) =>
                                    category.products.length > 0 && (
                                        <ProductsGroupList
                                            key={category.id}
                                            categoryId={category.id}
                                            title={category.name}
                                            products={category.products}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
