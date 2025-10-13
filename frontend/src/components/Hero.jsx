import Logo from "../assets/logos/logo_white.svg";
import Top_left from "../assets/patterns/top_left.svg";
import Bottom_right from "../assets/patterns/bottom_right.svg";
import Down_arrow from "../assets/icons/down_arrow.svg";
import "../styles/components/hero.css";

export default function Hero() {
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
                <p className="hero__subtitle">home of the artists</p>
            </div>
        </section>
    );
}
