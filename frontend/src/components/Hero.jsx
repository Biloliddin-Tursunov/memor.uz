import Logo from "../assets/logos/logo_white.svg";
import Top_left from "../assets/patterns/top_left.svg";
import Bottom_right from "../assets/patterns/bottom_right.svg";
import "../styles/components/hero.css";
import ScrollIcon from "./ScrollIcon";
import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section id="home" className="hero">
            {/* burchak naqshlar */}
            <img
                src={Top_left}
                alt=""
                className="ptr hero__corner hero__corner--tl"
            />
            <img
                src={Bottom_right}
                alt=""
                className="ptr hero__corner hero__corner--br"
            />

            {/* markaz */}
            <div className="hero__center">
                <img src={Logo} alt="Me'mor" className="hero__logo" />
                <h1 className="hero__title">ME'MOR</h1>
                <p className="hero__subtitle">{t("Slogan")}</p>
            </div>

            <ScrollIcon target={"#links"} />
        </section>
    );
}
