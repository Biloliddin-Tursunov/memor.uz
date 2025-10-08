import Logo from "../assets/logos/logo_white.svg";
import Top_left from "../assets/patterns/top_left.svg";
import Bottom_right from "../assets/patterns/bottom_right.svg";
import Down_arrow from "../assets/icons/down_arrow.svg";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-svh grid place-items-center overflow-hidden"
        >
            {/* burchak naqshlar – screen ichida qoladi */}
            <img
                src={Top_left}
                alt=""
                className="ptr absolute top-0 left-0 w-[clamp(200px,22vw,320px)] opacity-70"
            />
            <img
                src={Bottom_right}
                alt=""
                className="ptr absolute bottom-0 right-0 w-[clamp(200px,22vw,320px)] opacity-70"
            />

            {/* markaz */}
            <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
                <img
                    src={Logo}
                    alt="Me'mor"
                    className="w-[clamp(120px,18vw,164px)]"
                />
                <h1 className="font-[Lucida] text-[clamp(36px,6.2vw,56px)] text-[#D7D7D7]">
                    ME'MOR
                </h1>
                <p className="font-[MajorMonoMemor] text-[clamp(12px,2.2vw,16px)] text-memMuted text-[#D7D7D7]">
                    home of the artists
                </p>
            </div>

            {/* pastga ko'rsatkich */}
            <a
                href="#links"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl opacity-80 hover:opacity-100 transition"
            >
                <img
                    src={Down_arrow}
                    alt="dowm arrow button"
                    className="w-[100px]"
                />
            </a>
        </section>
    );
}
