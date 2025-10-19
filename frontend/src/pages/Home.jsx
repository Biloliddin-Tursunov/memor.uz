import Hero from "../components/Hero";
import Links from "../components/Links";
import TeamSection from "../components/TeamSection";

export default function Home() {
    return (
        <div>
            <main className="main">
                <Hero />
                <Links />
                <TeamSection />
            </main>
        </div>
    );
}
