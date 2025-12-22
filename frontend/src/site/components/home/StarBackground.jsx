import React, { useEffect, useRef } from "react";

/**
 * StarBackground komponenti
 * Buni istalgan "relative" positionga ega bo'lgan div ichiga qo'ysangiz,
 * u o'sha divning orqa foni bo'lib joylashadi.
 */
const StarBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        // O'zgaruvchilar
        let width, height, centerX, centerY;
        let stars = [];

        // Sozlamalar (Nafis uslub)
        const starCount = 500;
        const baseSpeed = 0.002;

        // O'lchamlarni o'rnatish
        const resize = () => {
            // Parent element o'lchamlarini olamiz
            const parent = canvas.parentElement;
            if (parent) {
                width = parent.clientWidth;
                height = parent.clientHeight;
                canvas.width = width;
                canvas.height = height;
                centerX = width / 2;
                centerY = height / 2;
            }
        };

        // Yulduz klassi
        class Star {
            constructor() {
                this.reset();
                this.angle = Math.random() * Math.PI * 2;
            }

            reset() {
                this.radius = Math.random() * (Math.max(width, height) / 0.7);
                this.angle = Math.random() * Math.PI * 2;

                // Juda kichik va nafis o'lchamlar
                this.size = Math.random() * 1.0 + 0.5; // 0.5px dan 1.5px gacha

                this.speed = Math.random() * 0.001 + baseSpeed;

                // Rang: Toza oq, turli shaffoflikda
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.angle += this.speed;

                // Koordinatalar
                this.x = centerX + Math.cos(this.angle) * this.radius;
                this.y = centerY + Math.sin(this.angle) * this.radius;

                // Dumining boshlanish nuqtasi (burchagi)
                const tailLength = 0.05 + this.speed * 40;
                this.tailAngleStart = this.angle - tailLength;
            }

            draw() {
                // 1. DUMINI CHIZISH (Ingichka va silliq gradient)
                const tailEndX =
                    centerX + Math.cos(this.tailAngleStart) * this.radius;
                const tailEndY =
                    centerY + Math.sin(this.tailAngleStart) * this.radius;

                const gradient = ctx.createLinearGradient(
                    tailEndX,
                    tailEndY,
                    this.x,
                    this.y
                );
                gradient.addColorStop(0, "rgba(255, 255, 255, 0)"); // Dum uchi ko'rinmas
                gradient.addColorStop(
                    1,
                    `rgba(255, 255, 255, ${this.opacity})`
                ); // Yulduzga ulangan qismi

                ctx.beginPath();
                ctx.arc(
                    centerX,
                    centerY,
                    this.radius,
                    this.tailAngleStart,
                    this.angle
                );
                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.size * 0.8;
                ctx.stroke();

                // 2. YULDUZ O'ZI
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.2})`;
                ctx.fill();
            }
        }

        const initStars = () => {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star());
            }
        };

        const animate = () => {
            // Ekranni tozalash
            ctx.clearRect(0, 0, width, height);

            stars.forEach((star) => {
                star.update();
                star.draw();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        // Ishga tushirish
        resize();
        initStars();
        animate();

        // Oyna o'lchami o'zgarganda qayta hisoblash
        window.addEventListener("resize", () => {
            resize();
            initStars();
        });

        // Tozalash (ComponentUnmount)
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0, // Barcha kontentdan orqada
                background:
                    "radial-gradient(circle at center, #1b2735 0%, #090a0f 100%)", // Koinot rangi
                overflow: "hidden",
            }}>
            <canvas ref={canvasRef} style={{ display: "block" }} />
        </div>
    );
};
export default StarBackground;
