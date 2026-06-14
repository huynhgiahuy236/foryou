import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Sparkles } from "lucide-react";

interface OpeningScreenProps {
  onComplete: () => void;
}

export default function OpeningScreen({ onComplete }: OpeningScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence of animations
    const timers = [
      setTimeout(() => setStep(1), 1200), // Show 15.06.2004
      setTimeout(() => setStep(2), 2800), // Show "Hôm nay là một ngày đặc biệt."
      setTimeout(() => setStep(3), 4400), // Show "Vì đây là ngày em xuất hiện..."
      setTimeout(() => setStep(4), 6000), // Show "Bắt đầu 🌻" button
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Generate some cozy random background stars
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    size: Math.random() * 2 + 1,
  }));

  return (
    <div className="fixed inset-0 bg-[#0F0A06] overflow-hidden flex flex-col items-center justify-between py-16 px-6 z-50 text-flat select-none font-sans">
      {/* Starry Background */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-[#FFDFA8]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header date of birth */}
      <div className="w-full text-center mt-6">
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[#FFDFA8]/60 text-sm font-mono tracking-[0.3em]"
          >
            15.06.2004
          </motion.div>
        )}
      </div>

      {/* Main visual - Blooming Sunflower */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        <div className="w-48 h-48 relative flex items-center justify-center">
          {/* Stem growing */}
          <motion.svg
            width="40"
            height="140"
            viewBox="0 0 40 140"
            className="absolute bottom-[-20px] left-1/2 -translate-x-1/2"
            initial="hidden"
            animate="visible"
          >
            {/* Stem path */}
            <motion.path
              d="M20,140 Q15,80 20,20"
              fill="transparent"
              stroke="#5D7546"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
            />
            {/* Soft leaf left */}
            <motion.path
              d="M17,90 Q-5,70 18,65 Z"
              fill="#5D7546"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ originX: "17px", originY: "90px" }}
            />
            {/* Soft leaf right */}
            <motion.path
              d="M19,60 Q40,45 20,40 Z"
              fill="#5D7546"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              style={{ originX: "19px", originY: "60px" }}
            />
          </motion.svg>

          {/* Sunflower flower head */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={step >= 1 ? { scale: 1, opacity: 1, rotate: 0 } : {}}
            transition={{ delay: 0.5, type: "spring", stiffness: 40, damping: 12 }}
            className="w-32 h-32 absolute top-0 flex items-center justify-center select-none"
          >
            {/* Outer Petals group rotating slowly */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="absolute w-6 h-14 bg-gradient-to-b from-[#C97A2B] to-[#FFBF3F] rounded-full opacity-90 shadow-md"
                  style={{
                    transform: `rotate(${index * 30}deg) translateY(-28px)`,
                    transformOrigin: "center center",
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  }}
                />
              ))}
              {/* Secondary layer of inner petals for thickness */}
              {[...Array(12)].map((_, index) => (
                <div
                  key={`inner-${index}`}
                  className="absolute w-4 h-11 bg-gradient-to-b from-[#FF8E26] to-[#FFE259] rounded-full opacity-95"
                  style={{
                    transform: `rotate(${index * 30 + 15}deg) translateY(-22px)`,
                    transformOrigin: "center center",
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  }}
                />
              ))}
            </motion.div>

            {/* Glowing Seed Center */}
            <motion.div
              className="absolute w-16 h-16 rounded-full bg-[#2A1C14] border-4 border-[#C97A2B] overflow-hidden flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Seed texture patterns */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C97A2B_20%,transparent_20%)] bg-[size:6px_6px]" />
              <div className="absolute w-10 h-10 rounded-full border border-dashed border-[#C97A2B]/40" />
            </motion.div>

            {/* Glowing Aura */}
            <div className="absolute inset-0 rounded-full bg-[#FFDFA8] filter blur-xl opacity-20 -z-10 animate-soft-pulse" />
          </motion.div>
        </div>

        {/* Narratives */}
        <div className="mt-8 text-center px-4 max-w-sm min-h-[140px] flex flex-col justify-center gap-4">
          {step >= 2 && (
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-[#FFF9F2] text-xl font-serif tracking-wide leading-relaxed"
            >
              &ldquo;Hôm nay là một ngày đặc biệt.&rdquo;
            </motion.h1>
          )}

          {step >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-[#FFDFA8] text-sm md:text-base font-sans font-light tracking-wide leading-relaxed italic"
            >
              &ldquo;Vì đây là ngày em xuất hiện trên thế giới này.&rdquo;
            </motion.p>
          )}
        </div>
      </div>

      {/* Button footer */}
      <div className="w-full max-w-xs flex justify-center mb-8 h-16">
        {step >= 4 && (
          <motion.button
            id="btn-start"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={onComplete}
            className="bg-gradient-to-r from-[#C97A2B] to-[#E6933C] text-[#FFF9F2] px-10 py-4.5 rounded-full font-cute font-semibold shadow-xl border border-[#FFDFA8]/30 flex items-center gap-2 cursor-pointer transition-shadow hover:shadow-[#C97A2B]/30 hover:shadow-2xl text-base tracking-wide"
          >
            Bắt đầu <span className="text-lg animate-bounce duration-1000">🌻</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
