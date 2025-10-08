// src/components/TeamSection.jsx
import Ornament from "../assets/patterns/members_section.svg"; // bitta .svg
import Biloliddin from "../assets/avatars/biloliddin.jpg";
import Otabek from "../assets/avatars/otabek.jpg";
import Aminaxon from "../assets/avatars/aminaxon.jpg";

export default function TeamSection() {
    const team = [
        {
            img: Biloliddin,
            name: "Biloliddin Tursunov",
            role: "Software Engineer",
        },
        { img: Otabek, name: "Otabek Isoev", role: "Designer" },
        {
            img: Aminaxon,
            name: "Aminaxon Yahyoxonova",
            role: "Creative Partner",
        },
    ];

    return (
        <section
            id="members"
            className="relative min-h-svh overflow-hidden bg-memor-gradient font-futura"
        >
            {/* ===== ORNAMENT LAYER (absolute, z-index past) ===== */}
            <div
                className="
          pointer-events-none select-none
          absolute inset-0 
          flex items-start justify-center
        "
                /* top pos-ni sen moslashtirasan: top-[..] bilan o‘zgartir */
                style={{ top: "0px" }}
            >
                <img
                    src={Ornament}
                    alt=""
                    className="
            block max-w-none
            w-[clamp(1200px,95vw,2200px)]
            opacity-70
          "
                />
            </div>

            {/* ===== CONTENT LAYER (z-10) ===== */}
            <div className="relative z-10 min-h-svh flex flex-col items-center justify-between">
                {/* title */}
                <div className="pt-[clamp(24px,6vh,64px)] px-[clamp(16px,4vw,40px)] text-center">
                    {/* <h2 className="text-white/90 font-serif italic text-[clamp(22px,4vw,44px)]">
                        Dunyoni go‘zallashtirish uchun!
                    </h2> */}
                </div>

                {/* “JAMOAMIZ:” */}
                <div className="text-center mt-[clamp(8px,2vh,16px)]">
                    <p className="font-[MajorMonoMemor] tracking-[0.3em] text-[clamp(14px,1.6vw,30px)] text-white/70">
                        Jamoamiz:
                    </p>
                </div>

                {/* team + side buttons (layout) */}
                <div className="w-full px-[clamp(16px,4vw,40px)] my-[clamp(20px,5vh,48px)]">
                    <div className="flex items-center justify-center gap-[clamp(12px,3vw,32px)] flex-wrap">
                        {/* DONAT (Major, matnli, doira) */}
                        <button
                            className="flex items-center justify-center rounded-full bg-white/5 border border-white/10
                         w-[clamp(64px,8vw,96px)] h-[clamp(64px,8vw,96px)]
                         hover:bg-white/10 transition"
                            title="Donat"
                        >
                            <span className="font-[MajorMonoMemor] tracking-[0.2em] text-white/80 text-[clamp(10px,1.2vw,12px)]">
                                Donat
                            </span>
                        </button>

                        {/* 3 profiles (grayscale) */}
                        {team.map(({ img, name, role }) => (
                            <div
                                key={name}
                                className="flex flex-col items-center group transition"
                            >
                                <div
                                    className="
        rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        w-[clamp(120px,14vw,220px)] h-[clamp(120px,14vw,220px)]
        filter grayscale group-hover:grayscale-0
        transition duration-500 ease-out cursor-pointer
      "
                                >
                                    <img
                                        src={img}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="mt-3 text-center transition duration-300 group-hover:scale-105">
                                    <p className="text-white font-medium text-[clamp(12px,1.4vw,16px)]">
                                        {name}
                                    </p>
                                    <p className="text-white/70 text-[clamp(10px,1.2vw,14px)]">
                                        {role}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* QO‘SHILISH (Major, matnli, doira) */}
                        <button
                            className="flex items-center justify-center rounded-full bg-white/5 border border-white/10
                         w-[clamp(64px,8vw,96px)] h-[clamp(64px,8vw,96px)]
                         hover:bg-white/10 transition"
                            title="Qo‘shilish"
                        >
                            <span className="font-[MajorMonoMemor] tracking-[0.2em] text-white/80 text-[clamp(10px,1.2vw,12px)]">
                                Join
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
