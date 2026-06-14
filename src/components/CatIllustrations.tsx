import React from "react";
import { motion } from "motion/react";

// Cat illustrations designed cleanly as responsive SVGs with Framer Motion animations.

export function CreamCatHoldingSunflower() {
  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Shadow */}
        <ellipse cx="100" cy="180" rx="60" ry="10" fill="#EADCC9" />

        {/* Tail */}
        <motion.path
          d="M 140 160 Q 185 160 170 110"
          fill="none"
          stroke="#FCEBD4"
          strokeWidth="14"
          strokeLinecap="round"
          animate={{
            rotate: [-4, 4, -4],
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "140px", originY: "160px" }}
        />
        {/* Tail Tip Accents */}
        <motion.path
          d="M 167 115 C 172 105 182 110 172 115"
          fill="none"
          stroke="#C97A2B"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Body */}
        <ellipse cx="100" cy="140" rx="55" ry="45" fill="#FCEBD4" />
        
        {/* Feet */}
        <ellipse cx="70" cy="178" rx="14" ry="8" fill="#F3DFCE" />
        <ellipse cx="130" cy="178" rx="14" ry="8" fill="#F3DFCE" />

        {/* Back patch decoration */}
        <path d="M 60 115 Q 100 135 140 115 Q 100 160 60 115 Z" fill="#E7CDB2" opacity="0.3" />

        {/* Ears */}
        {/* Left Ear */}
        <motion.g
          animate={{ rotate: [0, -3, 0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ originX: "65px", originY: "90px" }}
        >
          <path d="M 50 90 L 70 50 L 85 82 Z" fill="#FCEBD4" strokeWidth="1" stroke="#FCEBD4" />
          <path d="M 55 86 L 68 56 L 78 80 Z" fill="#FFA8B6" />
        </motion.g>

        {/* Right Ear */}
        <motion.g
          animate={{ rotate: [0, 4, 0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          style={{ originX: "135px", originY: "90px" }}
        >
          <path d="M 150 90 L 130 50 L 115 82 Z" fill="#FCEBD4" strokeWidth="1" stroke="#FCEBD4" />
          <path d="M 145 86 L 132 56 L 122 80 Z" fill="#FFA8B6" />
        </motion.g>

        {/* Head */}
        <motion.circle
          cx="100"
          cy="105"
          r="48"
          fill="#FCEBD4"
          animate={{
            y: [-1, 1.5, -1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Stripes on forehead */}
        <path d="M 94 58 Q 100 70 100 72 Q 100 70 106 58 Z" fill="#E7CDB2" />
        <path d="M 84 62 Q 90 71 90 73 M 116 62 Q 110 71 110 73" stroke="#E7CDB2" strokeWidth="3" strokeLinecap="round" />

        {/* Cheeks */}
        <circle cx="68" cy="115" r="7" fill="#FFA5B5" opacity="0.6" />
        <circle cx="132" cy="115" r="7" fill="#FFA5B5" opacity="0.6" />

        {/* Eyes (Content, smiling curves) */}
        <path
          d="M 64 105 Q 74 100 80 106"
          fill="none"
          stroke="#412C1E"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 120 105 Q 126 100 136 106"
          fill="none"
          stroke="#412C1E"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Mouth and Nose */}
        <path d="M 97 113 Q 100 110 103 113" fill="none" stroke="#412C1E" strokeWidth="3" />
        <path d="M 94 118 Q 100 123 100 119 Q 100 123 106 118" fill="none" stroke="#412C1E" strokeWidth="2.5" strokeLinecap="round" />

        {/* Whiskers */}
        <path d="M 54 116 L 36 114 M 54 122 L 32 123" stroke="#8A6D52" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M 146 116 L 164 114 M 146 122 L 168 123" stroke="#8A6D52" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* Cat Front Paws Holding Sunflower */}
        {/* Stem of the sunflower */}
        <motion.g
          animate={{
            rotate: [-2, 2, -2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "100px", originY: "145px" }}
        >
          {/* Sunflower Stem */}
          <path d="M 100 155 Q 65 145 55 125" fill="none" stroke="#5D7546" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 52 143 Q 40 148 50 142 Z" fill="#5D7546" />

          {/* Sunflower Blossom */}
          <g transform="translate(50, 120)">
            {/* Flower background glow shadow */}
            <circle cx="0" cy="0" r="24" fill="#FFDFA8" opacity="0.3" />
            
            {/* Petals */}
            {[...Array(8)].map((_, i) => (
              <path
                key={i}
                d="M 0 -7 Q -6 -24 0 -24 Q 6 -24 0 -7"
                fill="#C97A2B"
                style={{ transform: `rotate(${i * 45}deg)` }}
                className="brightness-110"
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <path
                key={`sub-${i}`}
                d="M 0 -6 Q -4 -18 0 -18 Q 4 -18 0 -6"
                fill="#FFBF3F"
                style={{ transform: `rotate(${i * 45 + 22.5}deg)` }}
              />
            ))}
            {/* Center seed */}
            <circle cx="0" cy="0" r="10" fill="#2A1C14" stroke="#8A6D52" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="6" fill="#4B3224" />
          </g>
        </motion.g>

        {/* Real Paw Overlays */}
        <ellipse cx="80" cy="150" rx="12" ry="9" fill="#F3DFCE" />
        <ellipse cx="120" cy="150" rx="12" ry="9" fill="#F3DFCE" />
      </svg>
    </div>
  );
}

export function SleepingCat() {
  return (
    <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow that matches breathing */}
        <motion.ellipse
          cx="100"
          cy="155"
          rx="65"
          ry="12"
          fill="#1C1109"
          opacity="0.3"
          animate={{ rx: [60, 68, 60], opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sleeping Cat body grouped for slow breathing scale */}
        <motion.g
          animate={{
            scale: [0.97, 1.02, 0.97],
            y: [2, -1, 2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "100px", originY: "140px" }}
        >
          {/* Tail wrapped around */}
          <path
            d="M 145 130 C 180 135 155 160 115 155"
            fill="none"
            stroke="#FCEBD4"
            strokeWidth="15"
            strokeLinecap="round"
          />
          {/* Orange contrast patch on tail tip */}
          <path
            d="M 115 155 Q 105 153 112 150"
            fill="none"
            stroke="#C97A2B"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Curled Body */}
          <ellipse cx="100" cy="125" rx="58" ry="40" fill="#FCEBD4" />

          {/* Brown / Orange spots on back */}
          <path d="M 75 105 C 85 95 110 95 120 102 C 100 120 80 110 75 105 Z" fill="#C97A2B" opacity="0.8" />
          <path d="M 115 110 C 122 105 138 108 142 118 C 130 125 120 115 115 110 Z" fill="#8A6D52" opacity="0.6" />

          {/* Head tucked down */}
          <g transform="translate(68, 115)">
            <circle cx="0" cy="0" r="30" fill="#FCEBD4" />
            
            {/* Forehead band decoration */}
            <path d="M -8 -26 Q 0 -18 8 -26" fill="none" stroke="#C97A2B" strokeWidth="3.5" strokeLinecap="round" />

            {/* Left Ear */}
            <path d="M -24 -15 L -26 -35 L -10 -26 Z" fill="#FCEBD4" />
            <path d="M -21 -17 L -23 -31 L -12 -24 Z" fill="#FFA8B6" />

            {/* Right Ear */}
            <path d="M 6 -28 L 18 -36 L 22 -17 Z" fill="#FCEBD4" />
            <path d="M 9 -24 L 16 -31 L 18 -18 Z" fill="#FFA8B6" />

            {/* Closed eyelids with tiny lashes */}
            <path d="M -16 2 Q -10 -2 -6 2" fill="none" stroke="#412C1E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 4 2 Q 10 -2 14 2" fill="none" stroke="#412C1E" strokeWidth="2.5" strokeLinecap="round" />

            {/* Nose and sleeping smile */}
            <polygon points="-1,6 1,6 0,8" fill="#412C1E" />
            <path d="M -3 10 C -1 11 1 11 3 10" fill="none" stroke="#412C1E" strokeWidth="1.5" />

            {/* Rosy Cheeks */}
            <circle cx="-16" cy="10" r="5" fill="#FFA5B5" opacity="0.5" />
            <circle cx="12" cy="10" r="5" fill="#FFA5B5" opacity="0.5" />

            {/* Cozy snoring symbols */}
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.6, 1.1, 0.6],
                x: [-10, -25, -35],
                y: [5, -20, -40],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <text x="-15" y="-15" fill="#C97A2B" fontSize="13" fontWeight="bold" fontFamily="monospace">z</text>
            </motion.g>

            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0.6, 1, 0.6],
                x: [-5, -15, -20],
                y: [0, -15, -30],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut",
                delay: 2,
              }}
            >
              <text x="-15" y="-15" fill="#C97A2B" fontSize="9" fontWeight="bold" fontFamily="monospace">z</text>
            </motion.g>
          </g>

          {/* Soft paws tucked under */}
          <ellipse cx="60" cy="142" rx="8" ry="6" fill="#F3DFCE" />
          <ellipse cx="140" cy="142" rx="8" ry="6" fill="#F3DFCE" />
        </motion.g>
      </svg>
    </div>
  );
}
