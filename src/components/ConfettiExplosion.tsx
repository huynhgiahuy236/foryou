import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface ConfettiItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: "petal" | "paw" | "circle" | "sparkle";
  rotate: number;
  delay: number;
  drift: number;
  duration: number;
}

const SHAPES: ("petal" | "paw" | "circle" | "sparkle")[] = ["petal", "circle", "sparkle", "petal"];

const PALETTE = [
  "#C97A2B", // Accent
  "#FFBF3F", // Golden
  "#FFA8B6", // Rosy pink
  "#FCEBD4", // Cream cat color
  "#FFDFA8", // Glow
];

export default function ConfettiExplosion() {
  const [items, setItems] = useState<ConfettiItem[]>([]);

  useEffect(() => {
    // Generate 60 explosion particles centered from the middle
    const particles = Array.from({ length: 65 }).map((_, i) => {
      // Angle of dispersion (all directions)
      const angle = Math.random() * Math.PI * 2;
      // Power / distance multiplier
      const force = 60 + Math.random() * 140; 
      
      return {
        id: i,
        // Relative coordinates from middle (0,0)
        x: Math.cos(angle) * force,
        y: Math.sin(angle) * force - 50, // slightly upwards offset
        size: 8 + Math.random() * 12,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        rotate: Math.random() * 360,
        delay: Math.random() * 0.15,
        drift: -50 + Math.random() * 100, // sway drifting
        duration: 2.2 + Math.random() * 1.5,
      };
    });

    setItems(particles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: [0, item.x, item.x + item.drift],
            y: [0, item.y, item.y + 200], // Fall down after explosion
            scale: [0, 1, 1, 0.4, 0],
            opacity: [1, 1, 1, 0.8, 0],
            rotate: [0, item.rotate, item.rotate * 1.8],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: "easeOut",
          }}
          className="absolute"
          style={{
            width: item.size,
            height: item.size,
          }}
        >
          {item.shape === "petal" && (
            <div
              className="w-full h-full"
              style={{
                background: item.color,
                borderRadius: "0% 100% 30% 100% / 0% 100% 30% 100%",
                transform: "rotate(45deg)",
              }}
            />
          )}

          {item.shape === "circle" && (
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />
          )}

          {item.shape === "sparkle" && (
            <svg viewBox="0 0 24 24" fill={item.color} className="w-full h-full">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
          )}

          {item.shape === "paw" && (
            <svg viewBox="0 0 24 24" fill={item.color} className="w-full h-full opacity-90">
              {/* Simple cat paw path representation */}
              <circle cx="12" cy="14" r="5" />
              <circle cx="7" cy="8" r="2.5" />
              <circle cx="12" cy="6" r="2.5" />
              <circle cx="17" cy="8" r="2.5" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
