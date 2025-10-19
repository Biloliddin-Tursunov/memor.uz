import { useEffect, useRef, useState } from "react";
import "../styles/components/equalizer.css";
import bgMusic from "../assets/tracks/bg-music.mp3";
import oudIcon from "../assets/icons/oud.svg";

export default function MusicPlayer() {
    const audioRef = useRef(null);
    const clickTimeoutRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [hoveredEq, setHoveredEq] = useState(false);
    const [clickedVisible, setClickedVisible] = useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = useState(true); // dastlab overlay ko‘rinadi

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.04;
        audio.muted = false;
    }, []);

    const togglePlay = (e) => {
        e?.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) audio.pause();
        else audio.play().catch(() => setAutoplayBlocked(true));

        setIsPlaying(!isPlaying);

        setClickedVisible(true);
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            () => setClickedVisible(false),
            2000
        );
    };

    const enableAudioByUser = async (e) => {
        e?.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;

        try {
            audio.muted = false;
            await audio.play();
            setIsPlaying(true);
            setAutoplayBlocked(false);

            // Fade ovoz
            let vol = audio.volume || 0.04;
            const fade = setInterval(() => {
                if (vol < 0.5) {
                    vol = Math.min(0.5, +(vol + 0.02).toFixed(3));
                    audio.volume = vol;
                } else clearInterval(fade);
            }, 200);
        } catch (err) {
            console.warn("User gesture play failed:", err);
        }
    };

    const controlVisible = hoveredEq || clickedVisible;

    return (
        <div className="music-container minimal" aria-hidden={false}>
            <audio ref={audioRef} src={bgMusic} loop />

            {/* Equalizer faqat overlay bosilgandan keyin ko‘rinadi */}
            {!autoplayBlocked && (
                <div
                    className={`equalizer minimal ${isPlaying ? "active" : ""}`}
                    onMouseEnter={() => setHoveredEq(true)}
                    onMouseLeave={() => setHoveredEq(false)}
                    onClick={togglePlay}
                    role="button"
                    aria-pressed={isPlaying}
                    aria-label={
                        isPlaying
                            ? "Pause background music"
                            : "Play background music"
                    }>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>

                    <div
                        className={`eq-controls ${
                            controlVisible ? "visible" : ""
                        }`}
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            className="eq-btn eq-btn-play"
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true">
                                    <rect
                                        x="6"
                                        y="5"
                                        width="4"
                                        height="14"
                                        rx="1"
                                        fill="var(--mp-fore)"
                                    />
                                    <rect
                                        x="14"
                                        y="5"
                                        width="4"
                                        height="14"
                                        rx="1"
                                        fill="var(--mp-fore)"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true">
                                    <path
                                        d="M5 3v18l15-9L5 3z"
                                        fill="var(--mp-fore)"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Overlay icon - ekran burchagida */}
            {autoplayBlocked && (
                <img
                    src={oudIcon}
                    alt="Enable Audio"
                    onClick={enableAudioByUser}
                    aria-label="Enable audio"
                    className="autoplay-overlay corner"
                    role="button"
                />
            )}
        </div>
    );
}
