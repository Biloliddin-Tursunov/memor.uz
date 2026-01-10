import Hero from "../components/home/Hero";
import Links from "../components/home/Links";
import TeamSection from "../components/home/TeamSection";

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
