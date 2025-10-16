import Hero from "../components/Hero";
import Links from "../components/Links";
import TeamSection from "../components/TeamSection";

export default function Home() {
    return (
        <div className="main">
            <Hero />
            <Links />
            <TeamSection />
        </div>
    );
}
