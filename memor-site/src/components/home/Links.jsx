import { useNavigate } from "react-router-dom";
import Center_strip from "../../assets/patterns/center_strip.svg";
import { useTranslation } from "react-i18next";

export default function Links() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Matnlar stilini ("text" ichidagi html) shu yerda to'g'irlaymiz
    // CSSdagi .links__card-text ul va li qoidalari
    const listClass = "list-disc pl-[1.2em] my-[0.4em]";
    const liClass = "mb-[0.5em] text-[rgba(240,240,240,0.88)]";

    const items = [
        {
            href: "/knowledge",
            title: t("KNOWLEDGE"),
            text: (
                <ul className={listClass}>
                    <li className={liClass}>{t("Articles")}</li>
                    <li className={liClass}>{t("Videos")}</li>
                    <li className={liClass}>{t("Books")}</li>
                    <li className={liClass}>{t("Courses")}</li>
                </ul>
            ),
        },
        {
            href: "/action",
            title: t("ACTION"),
            text: (
                <ul className={listClass}>
                    <li className={liClass}>{t("Events")}</li>
                    <li className={liClass}>{t("Artists")}</li>
                    <li className={liClass}>{t("Projects")}</li>
                    <li className={liClass}>{t("Store")}</li>
                </ul>
            ),
        },
        {
            href: "/creation",
            title: t("CREATION"),
            text: (
                <ul className={listClass}>
                    <li className={liClass}>{t("Design")}</li>
                    <li className={liClass}>{t("Artworks")}</li>
                    <li className={liClass}>{t("Ornaments")}</li>
                </ul>
            ),
        },
    ];

    return (
        <section
            id="links"
            className="min-h-screen min-h-[100vh] flex flex-col justify-between items-center text-center text-[#f2f2f2] 
                       p-[clamp(24px,2vw,60px)] font-['FuturaCyr',system-ui,sans-serif]"
        >
            {/* HEADING */}
            <h2 className="font-['Lucida',system-ui,sans-serif] font-bold tracking-[0.03em] text-[#eaeaea] 
                           text-[clamp(22px,4.2vw,42px)]">
                {t("Explore")}
            </h2>

            {/* CARDS CONTAINER (GRID) */}
            {/* Bu yerda CSSdagi media querylarni aniq takrorlaymiz */}
            <div className="w-full grid justify-items-stretch items-stretch gap-[clamp(20px,3vw,36px)]
                            auto-rows-[1fr]
                            
                            /* Mobile (max-width: 600px) - Default */
                            grid-cols-1 max-w-[92vw] gap-[16px]

                            /* Tablet (min-width: 601px) va (max-width: 1100px) */
                            min-[601px]:grid-cols-[repeat(2,minmax(260px,1fr))] 
                            min-[601px]:max-w-[min(100%,1000px)]
                            min-[601px]:gap-[clamp(20px,3vw,36px)]

                            /* Desktop (min-width: 1101px) */
                            min-[1101px]:grid-cols-[repeat(3,minmax(280px,1fr))] 
                            min-[1101px]:max-w-[1300px]"
            >
                {items.map(({ href, title, text }) => (
                    <div
                        key={href}
                        onClick={() => navigate(href)}
                        className="group w-full h-full p-[clamp(16px,2vw,22px)] rounded-[40px] 
                                   bg-[rgba(255,255,255,0.06)] border-[2px] border-[rgba(255,255,255,0.15)]
                                   flex flex-col gap-[clamp(10px,2vh,16px)] cursor-pointer 
                                   transition-[transform,border-color,background] duration-[250ms] ease-linear
                                   hover:-translate-y-[4px] hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.09)]"
                    >
                        <h3 className="m-0 text-[#f5f5f5] font-extrabold tracking-[0.05em] 
                                       font-['MajorMonoMemor',system-ui,sans-serif] text-[clamp(18px,2.4vw,26px)]">
                            {title}
                        </h3>

                        <div className="flex-1 text-left leading-[1.6] 
                                        font-['MajorMonoMemor',system-ui,sans-serif] 
                                        text-[clamp(14px,1.6vw,16px)] text-[rgba(240,240,240,0.88)]">
                            {text}
                        </div>
                    </div>
                ))}
            </div>

            {/* STRIP PATTERN */}
            <div className="flex justify-center py-[clamp(16px,4vh,32px)]">
                <img
                    src={Center_strip}
                    alt=""
                    aria-hidden="true"
                    className="w-[clamp(680px,78vw,1100px)] max-w-full h-auto opacity-85 pointer-events-none select-none"
                />
            </div>
        </section>
    );
}