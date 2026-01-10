import Logo from "../../assets/logos/logo_white.svg";
import Top_left from "../../assets/patterns/top_left.svg";
import Bottom_right from "../../assets/patterns/bottom_right.svg";
import ScrollIcon from "./ScrollIcon";
import { useTranslation } from "react-i18next";
import StarBackground from "./StarBackground";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section
            id="home"
            className="relative min-h-screen min-h-[100svh] grid place-items-center overflow-hidden"
        >
            {/* burchak naqshlar */}
            <img
                src={Top_left}
                alt=""
                className="pointer-events-none select-none absolute top-0 left-0 z-[5] opacity-70 w-[clamp(200px,22vw,320px)]"
            />
            <img
                src={Bottom_right}
                alt=""
                className="pointer-events-none select-none absolute right-0 bottom-0 z-[5] opacity-70 w-[clamp(200px,22vw,320px)]"
            />

            {/* markaz */}
            <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-[12px] text-center px-6">
                <img
                    src={Logo}
                    alt="Me'mor"
                    className="block w-[clamp(120px,18vw,164px)]"
                />
                <h1 className="m-0 text-[#d7d7d7] leading-[1.1] tracking-[0.02em] font-['Lucida','Lucida_Sans','Lucida_Grande',system-ui,sans-serif] text-[clamp(36px,6.2vw,56px)]">
                    ME'MOR
                </h1>
                <p className="m-0 opacity-95 text-[#d7d7d7] whitespace-pre-line uppercase font-['MajorMonoMemor',ui-monospace,SFMono-Regular,Menlo,monospace] text-[clamp(12px,2.2vw,16px)]">
                    {t("Slogan")}
                </p>
            </div>

            <ScrollIcon target={"#links"} />
            <StarBackground />
        </section>
    );
}