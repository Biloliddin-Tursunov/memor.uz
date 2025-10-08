import { Link } from "react-router-dom";
import Down_arrow from "../assets/icons/down_arrow.svg";
import Center_strip from "../assets/patterns/center_strip.svg";

export default function Links() {
    const items = [
        { href: "/knowledge", label: "Knowledge" },
        { href: "/action", label: "Action" },
        { href: "/creation", label: "Creation" },
    ];

    return (
        <section
            id="links"
            className="min-h-svh flex flex-col overflow-hidden font-futura"
        >
            {/* 1) markazdagi cardlar – alohida blok */}
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-wrap justify-center gap-[clamp(16px,3vw,32px)] px-[clamp(16px,4vw,40px)] max-w-[110rem]">
                    {items.map(({ href, label }) => (
                        <Link
                            key={href}
                            to={href}
                            className="
                flex items-center justify-center
                rounded-[58px] border border-white/10 bg-[#D9D9D9]/15 hover:border-white/20 transition
                aspect-[347/236]
                w-[clamp(220px,26vw,347px)]
              "
                        >
                            <span className="font-[MajorMonoMemor] tracking-[0.2em] text-[clamp(16px,2vw,30px)] text-center">
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 2) naqsh – layout bilan o‘rtada */}
            <div className="flex justify-center py-[clamp(24px,6vh,48px)]">
                <img
                    src={Center_strip}
                    alt=""
                    aria-hidden="true"
                    className="block w-[clamp(900px,90vw,1200px)] h-auto pointer-events-none select-none opacity-70"
                />
            </div>

            {/* 3) down button – bo'lim pastida, positionsiz */}
            <div className="flex justify-center pb-[clamp(20px,6vh,64px)]">
                <a href="#members" aria-label="Scroll down">
                    <img
                        src={Down_arrow}
                        alt=""
                        className="block w-[clamp(56px,8vw,100px)] h-auto"
                        aria-hidden="true"
                    />
                </a>
            </div>
        </section>
    );
}
