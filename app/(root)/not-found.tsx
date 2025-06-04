import { InfoBlock } from "@/components/shared";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <InfoBlock
                title="Страница не найдена"
                text="Упс! Мы не смогли найти такую страницу"
                imageUrl="/assets/images/not-found.png"
            />
        </div>
    );
}
