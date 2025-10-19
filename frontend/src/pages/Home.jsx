import Hero from "../components/Hero";
import Links from "../components/Links";
import MusicPlayer from "../components/MusicPlayer";
import TeamSection from "../components/TeamSection";

export default function Home() {
    return (
        <div>
            <div className="fixed left-6 bottom-6 z-50">
                <MusicPlayer />
            </div>

            <main className="main">
                <Hero />
                <Links />
                <TeamSection />
            </main>
        </div>
    );
}
