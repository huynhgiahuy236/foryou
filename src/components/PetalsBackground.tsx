import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  sway: number;
}

export default function PetalsBackground() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate static metadata for active petals
    const newPetals = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage left
      delay: Math.random() * 8, // staggered delays
      duration: 10 + Math.random() * 15, // seconds to fall
      size: 8 + Math.random() * 14, // size in px
      rotate: Math.random() * 360, // starting rotate
      sway: 30 + Math.random() * 60, // sway distance
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal-falling"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
            // Rounded shapes like actual petals
            background: "linear-gradient(135deg, #FFE494 20%, #C97A2B 100%)",
            borderRadius: "0% 100% 30% 100% / 0% 100% 30% 100%",
            boxShadow: "0px 2px 5px rgba(201, 122, 43, 0.15)",
            transform: `rotate(${petal.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
