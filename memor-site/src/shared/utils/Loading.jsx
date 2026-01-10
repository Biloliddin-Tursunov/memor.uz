import React, { useEffect, useState } from "react";
import Logo from "../../assets/logos/logo_white.svg";

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
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-cover
                bg-[linear-gradient(164deg,rgba(107,107,107,0.3)_0%,rgba(0,0,0,0)_100%)]
                transition-opacity duration-[1200ms] ease-in-out
                ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
            <img
                src={Logo}
                alt="Me'mor logo"
                className={`w-[200px] h-auto opacity-90 transition-transform duration-[1200ms] ease-in-out
                    ${fadeOut ? "scale-95" : "scale-100"}`}
            />
        </div>
    );
}