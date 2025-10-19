import { useEffect, useRef, useState } from "react";
import "../styles/components/equalizer.css";
import bgMusic from "../assets/tracks/bg-music.mp3";

export default function MusicPlayer() {
    const audioRef = useRef(null);
    const clickTimeoutRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [hoveredEq, setHoveredEq] = useState(false);
    const [clickedVisible, setClickedVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Boshlang'ich ovoz 0.04
        audio.volume = 0.04;
        audio.muted = false; // agar mutega qo'ysak, ko'proq autoplay ruxsat oladi

        const tryAutoplay = async () => {
            try {
                // birinchi urinish
                await audio.play();
                setIsPlaying(true);

                // Fade 0.04 -> 0.5
                let vol = 0.04;
                const fade = setInterval(() => {
                    if (vol < 0.5) {
                        vol = Math.min(0.2, +(vol + 0.02).toFixed(3));
                        audio.volume = vol;
                    } else clearInterval(fade);
                }, 200);
            } catch (err) {
                // Autoplay bloklandi: foydalanuvchi interaksiyasini kuting
                console.log("Autoplay blocked:", err);
                setAutoplayBlocked(true);
                setIsPlaying(false);
            }
        };

        tryAutoplay();

        return () => {
            if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        };
    }, []);

    // Play/pause
    const togglePlay = (e) => {
        e?.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => {
                    // agar autoplay bloklangan bo'lsa, bizga UI orqali user gesture kerak
                    setAutoplayBlocked(true);
                });
        }

        // Show controls for 2s after click
        setClickedVisible(true);
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            () => setClickedVisible(false),
            2000
        );
    };

    // Mute/unmute
    const toggleMute = (e) => {
        e?.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;
        audio.muted = !audio.muted;
        setIsMuted(audio.muted);

        setClickedVisible(true);
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            () => setClickedVisible(false),
            1500
        );
    };

    // If autoplay was blocked, this handler is called when user explicitly allows sound
    const enableAudioByUser = async (e) => {
        e?.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;

        try {
            // If previously muted for autoplay, unmute now
            audio.muted = false;
            await audio.play();
            setIsPlaying(true);
            setAutoplayBlocked(false);

            // fade from current volume (if lower) → 0.5
            let vol = audio.volume || 0.04;
            const fade = setInterval(() => {
                if (vol < 0.5) {
                    vol = Math.min(0.5, +(vol + 0.02).toFixed(3));
                    audio.volume = vol;
                } else clearInterval(fade);
            }, 200);
        } catch (err) {
            console.warn("Failed to start after user gesture:", err);
        }
    };

    const controlVisible = hoveredEq || clickedVisible;

    return (
        <div className="music-container minimal" aria-hidden={false}>
            <audio ref={audioRef} src={bgMusic} loop />

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
                    className={`eq-controls ${controlVisible ? "visible" : ""}`}
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

                    <button
                        className="eq-btn eq-btn-sound"
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute" : "Mute"}>
                        {isMuted ? (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true">
                                <path
                                    d="M9 9v6h4l3 3V6l-3 3H9z"
                                    fill="var(--mp-fore)"
                                />
                                <path
                                    d="M19 5L5 19"
                                    stroke="var(--mp-fore)"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
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
                                    d="M9 9v6h4l3 3V6l-3 3H9z"
                                    fill="var(--mp-fore)"
                                />
                                <path
                                    d="M16 8a4 4 0 0 1 0 8"
                                    stroke="var(--mp-fore)"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* If autoplay blocked — show small user-action overlay near equalizer */}
            {autoplayBlocked && (
                <div
                    className="autoplay-overlay"
                    onClick={enableAudioByUser}
                    role="button"
                    aria-label="Enable audio">
                    Click to enable audio
                </div>
            )}
        </div>
    );
}
