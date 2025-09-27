import { useEffect, useRef } from "react";

// Star constants
const STAR_COUNT = 120;
const STAR_COLOR = "var(--text-black-900)";
const STAR_MIN_SIZE = 0.7;
const STAR_MAX_SIZE = 1.8;
const STAR_MIN_SPEED = 0.04;
const STAR_MAX_SPEED = 0.18;

const NEBULA_COUNT = 3;
const PLANET_COUNT = 1;

function randomBetween(a: number, b: number) {
    return a + Math.random() * (b - a);
}

interface Star {
    x: number;
    y: number;
    size: number;
    speed: number;
    angle: number;
    opacity: number;
}

interface Nebula {
    x: number;
    y: number;
    radius: number;
    color: string;
    opacity: number;
}

interface Planet {
    x: number;
    y: number;
    radius: number;
    colorStops: [string, string];
}

export function SpaceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const starsRef = useRef<Star[]>([]);
    const nebulaRef = useRef<Nebula[]>([]);
    const planetRef = useRef<Planet[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: randomBetween(STAR_MIN_SIZE, STAR_MAX_SIZE),
            speed: randomBetween(STAR_MIN_SPEED, STAR_MAX_SPEED),
            angle: randomBetween(0, 2 * Math.PI),
            opacity: randomBetween(0.5, 1),
        }));

        nebulaRef.current = Array.from({ length: NEBULA_COUNT }, (_, i) => ({
            x: randomBetween(canvas.width * 0.1, canvas.width * 0.9),
            y: randomBetween(canvas.height * 0.1, canvas.height * 0.7),
            radius: randomBetween(180, 320),
            color: ["#6366F1", "#8B5CF6", "#06B6D4"][i % 3],
            opacity: randomBetween(0.08, 0.18),
        }));

        planetRef.current = Array.from({ length: PLANET_COUNT }, () => ({
            x: randomBetween(canvas.width * 0.7, canvas.width * 0.95),
            y: randomBetween(canvas.height * 0.1, canvas.height * 0.3),
            radius: randomBetween(18, 32),
            colorStops: ["#e9e9e9", "#6366F1"],
        }));

        function drawGradientBackground() {
            const isDarkTheme = document.documentElement.classList.contains('dark') ||
                !document.documentElement.classList.contains('light');

            if (isDarkTheme) {
                const nebulaGrad1 = ctx.createRadialGradient(
                    canvas.width * 0.25, canvas.height * 0.25, 0,
                    canvas.width * 0.25, canvas.height * 0.25, canvas.width * 0.8
                );
                nebulaGrad1.addColorStop(0, '#1a1d3a');
                nebulaGrad1.addColorStop(1, 'transparent');
                ctx.fillStyle = nebulaGrad1;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const nebulaGrad2 = ctx.createRadialGradient(
                    canvas.width * 0.75, canvas.height * 0.75, 0,
                    canvas.width * 0.75, canvas.height * 0.75, canvas.width * 0.6
                );
                nebulaGrad2.addColorStop(0, '#2d1b3d');
                nebulaGrad2.addColorStop(1, 'transparent');
                ctx.fillStyle = nebulaGrad2;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const nebulaGrad3 = ctx.createRadialGradient(
                    canvas.width * 0.6, canvas.height * 0.2, 0,
                    canvas.width * 0.6, canvas.height * 0.2, canvas.width * 0.5
                );
                nebulaGrad3.addColorStop(0, '#1b2951');
                nebulaGrad3.addColorStop(1, 'transparent');
                ctx.fillStyle = nebulaGrad3;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const baseGradient = ctx.createRadialGradient(
                    canvas.width * 0.5, canvas.height * 0.5, 0,
                    canvas.width * 0.5, canvas.height * 0.5, Math.max(canvas.width, canvas.height) * 0.8
                );
                baseGradient.addColorStop(0, '#0f0f23');
                baseGradient.addColorStop(1, '#0a0a15');
                ctx.globalCompositeOperation = 'multiply';
                ctx.fillStyle = baseGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'source-over';
            } else {
                const lightGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                lightGradient.addColorStop(0, '#F8FAFC');
                lightGradient.addColorStop(0.3, '#E2E8F0');
                lightGradient.addColorStop(0.6, '#CBD5E1');
                lightGradient.addColorStop(1, '#F8FAFC');
                ctx.fillStyle = lightGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }

        function animate() {
            drawGradientBackground();

            // Draw nebula
            for (const nebula of nebulaRef.current) {
                const grad = ctx.createRadialGradient(
                    nebula.x,
                    nebula.y,
                    nebula.radius * 0.2,
                    nebula.x,
                    nebula.y,
                    nebula.radius
                );
                grad.addColorStop(0, nebula.color);
                grad.addColorStop(1, "transparent");
                ctx.globalAlpha = nebula.opacity;
                ctx.beginPath();
                ctx.arc(nebula.x, nebula.y, nebula.radius, 0, 2 * Math.PI);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            // Draw planets
            for (const planet of planetRef.current) {
                const grad = ctx.createRadialGradient(
                    planet.x,
                    planet.y,
                    planet.radius * 0.2,
                    planet.x,
                    planet.y,
                    planet.radius
                );
                grad.addColorStop(0, planet.colorStops[0]);
                grad.addColorStop(1, planet.colorStops[1]);
                ctx.globalAlpha = 0.7;
                ctx.beginPath();
                ctx.arc(planet.x, planet.y, planet.radius, 0, 2 * Math.PI);
                ctx.fillStyle = grad;
                ctx.shadowColor = planet.colorStops[1];
                ctx.shadowBlur = 16;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }

            // Animate and draw stars
            for (const star of starsRef.current) {
                // Move star in its direction
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                // Wrap around edges
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;
                // Twinkle
                star.opacity += randomBetween(-0.01, 0.01);
                star.opacity = Math.max(0.5, Math.min(1, star.opacity));
                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
                ctx.fillStyle = STAR_COLOR;
                ctx.shadowColor = STAR_COLOR;
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
            ctx.globalAlpha = 1;
            animationRef.current = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="space-bg"
            aria-hidden="true"
        />
    );
}