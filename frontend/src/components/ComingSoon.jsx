import { useNavigate } from "react-router-dom";
import Logo from "../assets/logos/logo_white.svg";
import TopLeft from "../assets/patterns/top_left.svg";
import BottomRight from "../assets/patterns/bottom_right.svg";

export default function ComingSoon({ title = "COMING SOON" }) {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-svh grid place-items-center overflow-hidden">
            {/* burchak naqshlar */}
            <img
                src={TopLeft}
                alt=""
                className="ptr absolute top-0 left-0 w-[clamp(200px,22vw,320px)] opacity-70"
            />
            <img
                src={BottomRight}
                alt=""
                className="ptr absolute bottom-0 right-0 w-[clamp(200px,22vw,320px)] opacity-70"
            />

            {/* markaz */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                <img
                    src={Logo}
                    alt="Me'mor"
                    className="w-[clamp(120px,18vw,164px)]"
                />
                <h1 className="font-[Lucida] text-[clamp(28px,5.5vw,48px)] text-[#D7D7D7]">
                    {title}
                </h1>

                {/* Back tugmasi */}
                <button
                    onClick={() => navigate(-1)} // orqaga qaytaradi
                    className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3
                     border border-white/15 bg-white/5 hover:bg-white/10
                     text-[#D7D7D7] font-[MajorMonoMemor] tracking-[0.2em]
                     text-[clamp(12px,1.8vw,14px)] transition"
                >
                    ← Back
                </button>
            </div>
        </section>
    );
}
