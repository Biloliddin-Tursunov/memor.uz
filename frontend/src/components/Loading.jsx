import React, { useEffect, useState } from "react";
import Logo from "../assets/logos/logo_white.svg";
import "../styles/components/loading.css";

export default function Loading() {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // 2.5 soniyadan keyin chiqib ketadi
        const timer = setTimeout(() => {
            setFadeOut(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`loading-screen ${fadeOut ? "fade-out" : "fade-in"}`}>
            <img src={Logo} alt="Me'mor logo" className="loading-logo" />
        </div>
    );
}
