import Ornament from "../../assets/patterns/members_section.svg";
import Biloliddin from "../../assets/avatars/biloliddin.jpg";
import Otabek from "../../assets/avatars/otabek.jpg";
import Aminaxon from "../../assets/avatars/aminaxon.jpg";
import Zuhra from "../../assets/avatars/Zuhra.png";
import Bunyod from "../../assets/avatars/Bunyod.png";
import { useTranslation } from "react-i18next";
import { LuUserPlus } from "react-icons/lu";
import { FaHandsHelping } from "react-icons/fa";

export default function TeamSection() {
    const { t } = useTranslation();

    const team = [
        { img: Otabek, name: "Otabek", role: t("Founder") },
        { img: Biloliddin, name: "Biloliddin", role: t("WebDeveloper") },
        { img: Bunyod, name: "Bunyod", role: t("Designer") },
        { img: Aminaxon, name: "Aminaxon", role: t("CreativePartner") },
        { img: Zuhra, name: "Zuhra", role: t("CreativePartner") },
    ];

    // Umumiy stillar (qayta-qayta yozmaslik uchun)
    const roundBtnClass = `
        flex items-center justify-center 
        w-[clamp(68px,8vw,102px)] h-[clamp(68px,8vw,102px)] 
        rounded-full border border-white/10 bg-white/5 cursor-pointer 
        transition-[background,transform] duration-250 ease-out
        hover:bg-white/10 hover:-translate-y-[2px]
        max-[480px]:w-[72px] max-[480px]:h-[72px]
    `;

    return (
        <section
            id="members"
            className="relative min-h-screen min-h-[100svh] overflow-hidden font-['FuturaCyr',system-ui,sans-serif]"
        >
            {/* Ornament layer */}
            <div className="absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden block">
                <img
                    src={Ornament}
                    alt=""
                    aria-hidden="true"
                    className="absolute top-[var(--ornament-top,0px)] left-1/2 -translate-x-1/2 
                               w-[100vw] h-auto max-w-none opacity-70"
                />
            </div>

            {/* Content layer */}
            <div className="relative z-10 min-h-screen min-h-[100svh] flex flex-col items-center justify-between
                            max-[768px]:justify-start max-[768px]:gap-[clamp(16px,4vh,32px)] max-[768px]:pt-[clamp(16px,6vh,48px)]">

                {/* Title */}
                <div className="pt-[clamp(24px,6vh,64px)] px-[clamp(16px,4vw,40px)] text-center mt-[140px]">
                    <h2 className="font-['Lucida','Lucida_Sans','Lucida_Grande',system-ui,sans-serif] 
                                   font-normal italic text-[clamp(22px,4vw,44px)] text-white/90 
                                   leading-[1.25] m-0 whitespace-pre-line">
                        {t("Slogan_")}
                    </h2>
                </div>

                {/* “JAMOAMIZ:” */}
                <div className="text-center mt-[clamp(8px,2vh,16px)] mb-[clamp(8px,2vh,16px)]">
                    <p className="font-['MajorMonoMemor',ui-monospace,monospace] tracking-[0.3em] 
                                  text-[clamp(14px,1.6vw,30px)] text-white/70 m-0
                                  max-[480px]:tracking-[0.2em]">
                        {t("OurTeam")}
                    </p>
                </div>

                {/* Team + Side Buttons Grid */}
                <div className="w-full px-[clamp(16px,4vw,40px)] my-[clamp(20px,5vh,48px)] 
                                max-[768px]:my-[clamp(12px,4vh,24px)]">
                    <div className="flex items-center justify-center flex-wrap gap-[clamp(10px,3vw,12px)]
                                    max-[768px]:gap-[clamp(10px,3vw,16px)]">

                        {/* LEFT BUTTON */}
                        <a href="https://t.me/memorga_bot" target="_blank" className={roundBtnClass}>
                            <span className="font-['MajorMonoMemor',ui-monospace,monospace] tracking-[0.2em] text-white/80 text-[clamp(10px,1.2vw,12px)] leading-none">
                                <FaHandsHelping size="35" opacity="70%" />
                            </span>
                        </a>

                        {/* MEMBERS */}
                        {team.map(({ img, name, role }) => (
                            <div key={name} className="group flex flex-col items-center transition-transform duration-300 ease-out hover:-translate-y-[2px]">
                                {/* Photo Container */}
                                <div className="w-[clamp(100px,10vw,120px)] h-[clamp(100px,10vw,120px)] rounded-full overflow-hidden 
                                                shadow-[0_10px_30px_rgba(0,0,0,0.35)] grayscale transition-[filter,transform] duration-500 ease-out cursor-pointer
                                                group-hover:grayscale-0 group-hover:scale-[1.03]
                                                max-[768px]:w-[clamp(100px,34vw,132px)] max-[768px]:h-[clamp(100px,34vw,132px)]">
                                    <img src={img} alt={name} className="w-full h-full object-cover" />
                                </div>
                                {/* Meta Data */}
                                <div className="mt-3 text-center transition-transform duration-300 ease-out group-hover:scale-105">
                                    <p className="text-white font-semibold text-[clamp(12px,1.4vw,16px)] m-0">{name}</p>
                                    <p className="text-white/70 text-[clamp(10px,1.2vw,14px)] m-0 mt-[2px]">{role}</p>
                                </div>
                            </div>
                        ))}

                        {/* RIGHT BUTTON */}
                        <a href="https://t.me/memorga_bot" target="_blank" className={roundBtnClass}>
                            <span className="font-['MajorMonoMemor',ui-monospace,monospace] tracking-[0.2em] text-white/80 text-[clamp(10px,1.2vw,12px)] leading-none">
                                <LuUserPlus size="35" opacity="70%" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}