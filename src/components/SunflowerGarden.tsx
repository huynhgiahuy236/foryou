import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Heart } from "lucide-react";

interface Wish {
  id: number;
  text: string;
}

const WISHES: Wish[] = [
  { id: 1, text: "Mong em luôn khỏe mạnh và tràn đầy sức sống mỗi ngày." },
  { id: 2, text: "Mong em luôn giữ được nụ cười vô tư, rạng rỡ nhất." },
  { id: 3, text: "Mong cuộc đời sẽ luôn đối xử dịu dàng và tử tế với em." },
  { id: 4, text: "Mong em luôn được yêu thương chân thành bởi những người xung quanh." },
  { id: 5, text: "Mong tất cả những ước mơ, dự định của em sớm thành hiện thực." },
  { id: 6, text: "Mong mỗi sáng thức dậy em luôn tràn ngập niềm vui và năng lượng." },
  { id: 7, text: "Mong tâm hồn em có được sự bình yên, nhẹ nhõm sau những mệt mỏi." },
  { id: 8, text: "Mong em gặp thật nhiều may mắn và những bất ngờ ngọt ngào." },
  { id: 9, text: "Mong con đường em đang tự tin bước đi luôn ngập tràn ánh nắng." },
  { id: 10, text: "Mong em luôn có những người bạn tốt và chân thành đồng hành." },
  { id: 11, text: "Mong công việc và học tập của em luôn diễn ra suôn sẻ, thuận lợi." },
  { id: 12, text: "Mong em tìm thấy niềm vui và hạnh phúc từ những điều bé nhỏ nhất." },
  { id: 13, text: "Mong em luôn tự tin, kiên định và vững vàng trước mọi giông bão." },
  { id: 14, text: "Mong thế giới này ngập tràn những điều tốt đẹp chào đón em." },
  { id: 15, text: "Mong tâm trạng em luôn luôn ấm áp và tỏa sáng rực rỡ như hoa hướng dương." },
  { id: 16, text: "Mong những người em gặp đều là người tốt và yêu mến em hết lòng." },
  { id: 17, text: "Mong em luôn khỏe khoắn, bình yên trong từng hơi thở, cuộc sống." },
  { id: 18, text: "Mong thanh xuân của em luôn lưu giữ những hồi ức say đắm và hạnh phúc." },
  { id: 19, text: "Mong em dù trưởng thành đến đâu cũng luôn giữ lại phần ngây ngô, đáng yêu." },
  { id: 20, text: "Mong em có một tuổi mới thật trọn vẹn, hạnh phúc và bình an." },
];

export default function SunflowerGarden() {
  const [openedWishes, setOpenedWishes] = useState<number[]>([]);
  const [activeWishIndex, setActiveWishIndex] = useState<number | null>(null);

  const handleFlowerClick = (id: number) => {
    if (!openedWishes.includes(id)) {
      setOpenedWishes((prev) => [...prev, id]);
    }
    setActiveWishIndex(id);
  };

  const activeWish = WISHES.find((w) => w.id === activeWishIndex);

  return (
    <div className="w-full text-[#2A1C14] font-sans px-2">
      {/* Garden Stats Banner */}
      <div className="text-center mb-8 bg-[#FFF9F2] p-4 rounded-2xl border border-[#C97A2B]/10 shadow-sm max-w-sm mx-auto">
        <div className="text-xs text-[#8A6D52] uppercase font-semibold tracking-wider flex items-center justify-center gap-1.5 mb-1">
          <Heart className="w-3.5 h-3.5 text-[#C97A2B] fill-[#C97A2B]" /> Vườn hoa sinh nhật
        </div>
        <p className="text-sm font-medium text-[#2A1C14]">
          Đã gieo trồng <span className="text-[#C97A2B] font-bold text-base">20</span> đóa hướng dương chứa đựng 20 lời chúc lành dành cho em.
        </p>
        <div className="mt-3 bg-[#F6EFE4] h-2 rounded-full overflow-hidden w-full relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C97A2B] to-[#FFBF3F]"
            animate={{ width: `${(openedWishes.length / WISHES.length) * 100}%` }}
            transition={{ type: "spring", damping: 15, stiffness: 80 }}
          />
        </div>
        <div className="text-[11px] text-[#8A6D52] mt-1.5 font-mono">
          Số đóa hoa em đã mở: <span className="text-[#C97A2B] font-semibold">{openedWishes.length}</span>/20 🌻
        </div>
      </div>

      {/* Grid of 20 Sunflowers */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-w-md mx-auto py-2">
        {WISHES.map((wish, index) => {
          const isOpen = openedWishes.includes(wish.id);
          const isActive = activeWishIndex === wish.id;

          return (
            <motion.div
              key={wish.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => handleFlowerClick(wish.id)}
              className="flex flex-col items-center justify-center cursor-pointer relative"
            >
              {/* Flower container */}
              <div className="w-16 h-18 relative flex flex-col items-center justify-center pt-2">
                {/* Floating sparkle if unread */}
                {!isOpen && (
                  <motion.div
                    className="absolute top-1 right-2 text-[#C97A2B]"
                    animate={{ scale: [0.7, 1.2, 0.7], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.15 }}
                  >
                    <Sparkles className="w-3 h-3 fill-current" />
                  </motion.div>
                )}

                {/* Sunflower shape */}
                <div className="relative w-11 h-11 flex items-center justify-center">
                  {/* Stem of each flower */}
                  <div className="absolute top-9 bottom-0 w-0.5 bg-[#5D7546] left-1/2 -translate-x-1/2 -z-10" style={{ height: "18px" }} />
                  {/* Tiny green leaves */}
                  {index % 2 === 0 && (
                    <div className="absolute bottom-[-6px] left-[17px] w-2.5 h-1.5 bg-[#5D7546] rounded-full rotate-[-25deg] origin-left -z-10" />
                  )}
                  {index % 2 !== 0 && (
                    <div className="absolute bottom-[-10px] right-[17px] w-2.5 h-1.5 bg-[#5D7546] rounded-full rotate-[25deg] origin-right -z-10" />
                  )}

                  {/* Rotatable petals container */}
                  <motion.div
                    animate={isOpen ? { rotate: [0, 360] } : {}}
                    transition={isOpen ? { duration: 12, repeat: Infinity, ease: "linear" } : {}}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {[...Array(8)].map((_, pi) => (
                      <div
                        key={pi}
                        className="absolute w-2.5 h-5.5 rounded-full"
                        style={{
                          transform: `rotate(${pi * 45}deg) translateY(-8px)`,
                          background: isOpen
                            ? "linear-gradient(to top, #C97A2B, #FFC145)"
                            : "linear-gradient(to top, #826346, #BFA78E)",
                          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                        }}
                      />
                    ))}
                    {/* Inner secondary shorter petal circle */}
                    {[...Array(6)].map((_, pi) => (
                      <div
                        key={`inner-${pi}`}
                        className="absolute w-1.5 h-3.5 rounded-full opacity-90"
                        style={{
                          transform: `rotate(${pi * 60 + 15}deg) translateY(-6px)`,
                          background: isOpen ? "#FFEA85" : "#D4C7BA",
                          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Seed Center */}
                  <div
                    className="absolute w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-inner border border-stone-800/10"
                    style={{
                      backgroundColor: isOpen ? "#382315" : "#54463A",
                    }}
                  >
                    <span className="text-[9px] font-semibold text-[#FFF9F2] leading-none font-mono select-none">
                      {wish.id}
                    </span>
                  </div>
                </div>

                {/* Opened indicator dot */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#C97A2B] mt-5"
                  />
                )}
                {!isOpen && <div className="w-1.5 h-1.5 rounded-full bg-transparent mt-5" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Wish Details overlay view */}
      <AnimatePresence>
        {activeWishIndex !== null && activeWish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-xs select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="bg-[#FFF9F2] shadow-2xl rounded-3xl p-6 max-w-sm w-full border border-[#C97A2B]/20 relative overflow-hidden"
            >
              {/* Cute yellow top aura */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#C97A2B] to-[#FFDFA8]" />

              {/* Header illustration */}
              <div className="flex justify-center mb-4 mt-2">
                <div className="w-14 h-14 rounded-full bg-[#FFDFA8]/40 border border-[#C97A2B]/20 flex items-center justify-center text-xl text-[#C97A2B] font-cute font-bold animate-soft-pulse">
                  🌻 #{activeWish.id}
                </div>
              </div>

              {/* Wish content text */}
              <div className="text-center px-2">
                <p className="text-[#8A6D52] text-[11px] tracking-widest uppercase font-mono mb-2">Lời chúc lành của đóa hoa</p>
                <div className="text-[#2A1C14] text-base font-serif font-medium leading-relaxed my-3 italic">
                  &ldquo;{activeWish.text}&rdquo;
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-center">
                <button
                  id="btn-close-wish"
                  onClick={() => setActiveWishIndex(null)}
                  className="bg-[#C97A2B] text-[#FFF9F2] px-6 py-2 rounded-full text-xs font-semibold cursor-pointer tracking-wider hover:bg-[#A9631B] hover:shadow-lg hover:shadow-[#C97A2B]/20 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" /> Khép lại đóa hoa
                </button>
              </div>

              {/* Sparkle background effects */}
              <div className="absolute top-8 left-6 opacity-20 text-[#C97A2B]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="absolute bottom-10 right-8 opacity-20 text-[#C97A2B]">
                <Sparkles className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
