import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  ChevronDown,
  Gift,
  Mail,
  Sparkles,
  BookOpen,
  Smile,
  Sun,
  Award,
  Music,
  Volume2,
  VolumeX,
} from "lucide-react";

import OpeningScreen from "./components/OpeningScreen";
import PetalsBackground from "./components/PetalsBackground";
import {
  CreamCatHoldingSunflower,
  SleepingCat,
} from "./components/CatIllustrations";
import SunflowerGarden from "./components/SunflowerGarden";
import ConfettiExplosion from "./components/ConfettiExplosion";

// Interfaces for structured data
interface ThankCard {
  id: number;
  title: string;
  message: string;
  icon: string;
}

interface CharacterCard {
  id: number;
  title: string;
  description: string;
  detail: string;
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [openThanks, setOpenThanks] = useState<number | null>(null);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [openTrantrong, setOpenTrantrong] = useState<number[]>([]);
  const [giftOpened, setGiftOpened] = useState(false);
  const [audioPlay, setAudioPlay] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  // References for scrolling indicators or section triggers
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  // Interactive topics data for Sections
  const playlist = [
    "/music/phuongthuy.mp3",
    "/music/hoangdung.mp3",
    "/music/toidaidot.mp3",
    "/music/xuanthi.mp3",
  ];
  const thankCards: ThankCard[] = [
    {
      id: 1,
      title: "Cảm ơn vì những kỷ niệm",
      message:
        "Cảm ơn em đã cùng anh đi qua một chặng đường vô tư của tuổi trẻ. Những hồi ức vui tươi, trong trẻo, không vướng bận lo toan ngày đó vẫn luôn là mảnh ký ức đẹp nằm yên trong ngăn kéo thanh xuân.",
      icon: "🎈",
    },
    {
      id: 2,
      title: "Cảm ơn những khoảng thời gian đã từng",
      message:
        "Cảm ơn em đã chia sẻ cùng anh, những cuộc trò chuyện dài không đầu không cuối. Khoảng thời gian tuy giản đơn nhưng vô cùng đáng quý mà ta có được bên nhau.",
      icon: "✨",
    },
    {
      id: 3,
      title: "Cảm ơn những điều em đã làm cho anh",
      message:
        "Cảm ơn em vì sự chu đáo, những sự động viên thầm lặng và cách em lắng nghe mỗi lần anh vụng dại hay lạc lối. Những điều cho đến nay anh mới thấy quý trọng.",
      icon: "🧁",
    },
    {
      id: 4,
      title: "Cảm ơn vì những bài học quý giá",
      message:
        "Quãng thời gian bên em đã dạy anh hiểu sâu hơn về tình yêu, sự kiên nhẫn và biết đặt mình vào cảm xúc của người khác. Sự trưởng thành của anh hôm nay có một phần được xây đắp từ những bài học thời ấy.",
      icon: "🌱",
    },
    {
      id: 5,
      title: "Cảm ơn vì em đã từng xuất hiện",
      message:
        "Dù đích đến sau cùng của chúng ta là những lựa chọn khác biệt, anh vẫn thầm cảm ơn số phận vì đã cho anh cơ hội được đồng hành và thương yêu một người con gái đáng quý như em.",
      icon: "🤝",
    },
  ];

  const characterCards: CharacterCard[] = [
    {
      id: 1,
      title: "Giọng nói của em",
      description: "Dễ thương",
      detail:
        "Anh nhiều lúc cũng không biết rằng mình có đang thực sự nhớ được giọng của em không, nhưng trong kí ức của anh lúc nào cũng là một điều đặt biệt.",
    },
    {
      id: 2,
      title: "Nụ cười của em",
      description: "Nhẹ nhàng ấm áp",
      detail:
        "Anh vẫn nhớ nụ cười rạng rỡ của em ngày nào. Nó mang đầy năng lượng tích cực, trong sáng và chân thành vô cùng, anh hy vọng em của tháng ngày sau lúc nào cũng có thể tươi cười.",
    },
    {
      id: 3,
      title: "Mái tóc của em",
      description: "Như in mùi hương trong đầu anh",
      detail:
        "Anh cũng không biết em sẽ có đọc dòng này hay không, thú thật anh dùng nhiều loại lắm chẳng có cái mùi nào giống vậy, chắc vì vậy nên nó mới đặc biệt với anh.",
    },
    {
      id: 4,
      title: "Cách em quan tâm anh",
      description: "Mong anh trưởng thành hơn",
      detail:
        "Nhiều lần cãi vã nhung em không rời đi, ngày này tháng nọ, anh mong em hiểu ngày tháng ấy anh còn non nớt, anh luôn mong em vui Phương Thùy.",
    },
    {
      id: 5,
      title: "Những cá tính rất riêng",
      description: "Phương Thùy duy nhất ",
      detail:
        "Đôi lúc em thế này nhưng đôi lúc em lại có chút bướng bỉnh đáng yêu tạo nên một cá tính đặc trưng, khiến em luôn là người đặc biệt nhất.",
    },
  ];

  const handleToggleTrantrong = (id: number) => {
    if (openTrantrong.includes(id)) {
      setOpenTrantrong(openTrantrong.filter((item: any) => item !== id));
    } else {
      setOpenTrantrong([...openTrantrong, id]);
    }
  };
  // 1. Hàm chuyển bài (chỉ cập nhật State)
  const handleNextSong = () => {
    // Logic modulo % đảm bảo nó luôn quay vòng từ bài cuối về bài đầu
    setCurrentSong((prev: any) => (prev + 1) % playlist.length);
  };
  // 2. useEffect để đảm bảo nhạc luôn tự chạy khi đổi bài
  // Thay thế useEffect hiện tại của bạn bằng đoạn này:
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Đảm bảo âm thanh luôn được phát khi bài hát thay đổi
    const playAudio = async () => {
      try {
        await audio.play();
        setAudioPlay(true);
      } catch (err) {
        console.log("Cần tương tác để phát nhạc:", err);
        setAudioPlay(false);
      }
    };

    playAudio();
  }, [currentSong]); // Chỉ chạy khi bài hát thay đổi
  return (
    <div className="relative min-h-screen bg-[#F6EFE4] text-[#2A1C14] flex flex-col items-center overflow-x-hidden w-full select-none selection:bg-[#FFDFA8] no-scrollbar">
      <audio
        ref={audioRef}
        src={playlist[currentSong]}
        onEnded={handleNextSong} // Tự chuyển khi hết bài
        key={currentSong} // BÍ QUYẾT: Dùng key để React tạo lại thẻ audio khi đổi bài
      />
      {/* 1. Opening Experience Overlay */}
      <AnimatePresence>
        {!started && (
          <OpeningScreen
            onComplete={() => {
              setStarted(true);

              setTimeout(() => {
                if (audioRef.current) {
                  audioRef.current.volume = 0.25;
                  audioRef.current.play();
                }
              }, 100);
            }}
          />
        )}
      </AnimatePresence>

      {/* Visual Overlay Elements from Natural Tones Theme */}
      {started && (
        <>
          <div className="fixed bottom-10 right-5 z-[9999] flex gap-2">
            <button
              onClick={handleNextSong} // Sử dụng lại logic chuyển bài
              className="bg-black/20 backdrop-blur px-3 py-2 rounded-full shadow-lg text-xs font-mono"
            >
              <i class="fa-solid fa-forward text-white"></i>
            </button>

            <button
              onClick={() => {
                if (!audioRef.current) return;
                if (audioRef.current.paused) {
                  audioRef.current.play().then(() => setAudioPlay(true));
                } else {
                  audioRef.current.pause();
                  setAudioPlay(false);
                }
              }}
              className="bg-black/20 backdrop-blur px-2 py-2 rounded-full shadow-lg"
            >
              {audioPlay ? (
                <i class="fa-solid fa-pause text-white"></i>
              ) : (
                <i class="fa-solid fa-play text-white"></i>
              )}
            </button>
          </div>
          <div className="fixed top-24 right-[-40px] w-56 h-56 border border-[#C97A2B] border-dashed rounded-full opacity-10 animate-pulse pointer-events-none z-0" />
          <div className="fixed bottom-32 left-[-15px] text-5xl opacity-10 select-none pointer-events-none z-0">
            🌻
          </div>
          <div className="fixed top-40 right-[-10px] text-5xl opacity-10 select-none pointer-events-none z-0">
            🌻
          </div>
          <div className="fixed bottom-10 right-4 text-xs opacity-5 grayscale pointer-events-none z-0">
            🐱💤
          </div>
        </>
      )}

      {/* Floating Flowers in background */}
      {started && <PetalsBackground />}

      {/* Main Container when started */}
      {started && (
        <div className="w-full max-w-md mx-auto flex flex-col min-h-screen relative z-20 pb-12 font-sans px-4">
          {/* Header Cozy Info Badge — Natural Tones Nav */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full flex items-center justify-between pt-6 pb-4 border-b border-[#E8DFD3] px-2 mb-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🌻</span>
              <span className="font-semibold tracking-[0.16em] text-xs uppercase opacity-80 text-[#2A1C14]">
                15.06.2004 — Phương Thùy
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-widest opacity-60 text-[#8A6D52]">
              TUỔI 22 • 2026
            </div>
          </motion.div>

          {/* ---------- SECTION 1: HERO ---------- */}
          <section className="py-12 flex flex-col justify-center items-center text-center relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-4"
            >
              <CreamCatHoldingSunflower />
            </motion.div>

            {/* Glowing Accent Ring behind Title */}
            <div className="absolute top-[180px] w-28 h-28 rounded-full bg-[#FFDFA8]/30 filter blur-2xl -z-10 animate-soft-pulse" />

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl font-serif text-[#2A1C14] leading-tight italic font-semibold tracking-wide"
            >
              Chúc mừng <br />
              <span className="text-[#C97A2B]">sinh nhật</span>
            </motion.h2>

            <motion.h3
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg font-cute text-[#2A1C14]/90 font-medium mt-2 mb-6"
            >
              Phương Thùy 🌻
            </motion.h3>

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative p-8 bg-[#FFF9F2] rounded-[40px] border border-[#E8DFD3] shadow-xs max-w-xs mx-auto overflow-hidden"
            >
              <p className="text-sm text-[#8A6D52] leading-relaxed italic relative z-10">
                &ldquo;Anh không biết bây giờ cuộc sống của em thế nào. Nhưng
                hôm nay, anh vẫn muốn gửi đến em vài điều lành.&rdquo;
              </p>
              <div className="absolute bottom-[-15px] right-[-15px] text-5xl opacity-[0.06] select-none pointer-events-none">
                🐱
              </div>
            </motion.div>

            {/* Hint to scroll down */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ delay: 1.5, duration: 2.5, repeat: Infinity }}
              className="mt-12 flex flex-col items-center gap-1"
            >
              <span className="text-[10px] text-[#8A6D52] uppercase font-mono tracking-widest">
                Cuộn để đọc tiếp
              </span>
              <ChevronDown className="w-4 h-4 text-[#C97A2B] animate-bounce" />
            </motion.div>
          </section>

          {/* ---------- SECTION 2: CÓ VÀI ĐIỀU ANH MUỐN NÓI ---------- */}
          <section className="py-10 border-t border-[#E8DFD3]">
            <div className="bg-[#FFF9F2] border border-[#E8DFD3] rounded-[40px] p-8 shadow-xs text-left relative overflow-hidden">
              {/* Corner decorative sunflower petal */}
              <div className="absolute top-[-10px] right-[-10px] w-12 h-12 bg-[#FFDFA8]/30 rounded-full filter blur-md" />

              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 rounded-xl bg-[#F6EFE4] text-xs">✍️</span>
                <h3 className="text-base font-serif font-semibold text-[#2A1C14] tracking-wide">
                  Có vài điều anh muốn nói
                </h3>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-[#2A1C14]/90 leading-relaxed font-light">
                <p>
                  Ấy vậy mà cũng đã một thời gian dài trôi qua từ lần cuối chúng
                  ta trò chuyện hay đồng hành cùng nhau. Thời gian trôi nhanh
                  thật em nhỉ.
                </p>
                <p>
                  Trang web nhỏ này xuất hiện một cách lặng lẽ vào ngày sinh
                  nhật em, không phải để níu kéo, không phải một lời thú nhận
                  hay muốn khơi lại chút bối rối nào cả. Nó chỉ đơn giản như là
                  một góc nhỏ tĩnh lặng chứa đựng những chân thành mà anh chưa
                  từng có dịp bộc bạch một cách tử tế nhất.
                </p>
                <p>
                  Khi ta đủ trưởng thành để nhìn nhận lại mọi thứ bằng con mắt
                  bao dung, anh nhận ra những người tốt lành ngày ấy ta từng gặp
                  trong đời luôn xứng đáng với sự trân trọng trọn vẹn nhất. Và
                  em là một người như vậy.
                </p>
              </div>
            </div>
          </section>

          {/* ---------- SECTION 3: NHỮNG ĐIỀU ANH MUỐN CẢM ƠN ---------- */}
          <section className="py-10 border-t border-[#E8DFD3]">
            <div className="text-center mb-6">
              <span className="text-xs text-[#8A6D52] uppercase tracking-widest font-mono font-medium block mb-1">
                Lời tri ân sâu sắc
              </span>
              <h3 className="text-xl font-serif font-bold text-[#C97A2B]">
                Những điều anh muốn cảm ơn
              </h3>
            </div>

            <div className="space-y-3">
              {thankCards.map((card) => {
                const isOpen = openThanks === card.id;
                return (
                  <div
                    key={card.id}
                    className="bg-[#FFF9F2] border border-[#E8DFD3] rounded-3xl overflow-hidden transition-all duration-300 shadow-xs hover:border-[#C97A2B]/30"
                  >
                    <button
                      id={`btn-thank-${card.id}`}
                      onClick={() => setOpenThanks(isOpen ? null : card.id)}
                      className="w-full p-4 flex items-center justify-between text-left cursor-pointer active:bg-[#F6EFE4]/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{card.icon}</span>
                        <span className="text-sm font-medium text-[#2A1C14] font-serif">
                          {card.title}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#C97A2B]"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="border-t border-[#E8DFD3] bg-[#FFF9F2]/50"
                        >
                          <div className="p-4 text-xs md:text-sm text-[#8A6D52] leading-relaxed font-light">
                            {card.message}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ---------- SECTION 4: NHỮNG ĐIỀU ANH MUỐN XIN LỖI ---------- */}
          <section className="pb-10 pt-25 border-t border-[#E8DFD3] text-center">
            <div className="mb-6">
              <span className="text-xs text-[#8A6D52] uppercase tracking-widest font-mono font-medium block mb-1">
                Góc thư thầm kín
              </span>
              <h3 className="text-xl font-serif font-bold text-[#C97A2B]">
                Những điều anh muốn xin lỗi
              </h3>
            </div>

            <div className="relative flex flex-col items-center">
              {/* Envelope Container */}
              <div className="relative w-full max-w-[300px] h-[210px] flex items-center justify-center mt-4">
                {/* Letter Sliding out */}
                <AnimatePresence>
                  {envelopeOpen && (
                    <motion.div
                      initial={{ y: 0, scale: 0.9, opacity: 0 }}
                      animate={{ y: -110, scale: 1, opacity: 1 }}
                      exit={{ y: 0, scale: 0.9, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      className="absolute w-[280px] bg-[#FFF9F2] rounded-3xl border border-[#E8DFD3] p-5 shadow-2xl z-10 text-left text-xs text-[#2A1C14]"
                    >
                      <div className="w-full flex justify-between items-center border-b border-[#E8DFD3] pb-1.5 mb-2.5">
                        <span className="font-serif font-semibold text-[#C97A2B] text-[11px]">
                          Nợ em một lời xin lỗi
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C97A2B]" />
                      </div>

                      <div className="space-y-2 leading-relaxed font-light text-[#8A6D52] pr-1 overflow-y-auto max-h-[320px] no-scrollbar">
                        <p className="font-serif font-bold text-[#2A1C14]">
                          Thùy thương mến,
                        </p>
                        <p>
                          Đi qua những ngày non trẻ, anh của hiện tại không
                          chính chắn là bao nhưng lúc anh nhìn lại quá khứ anh
                          nghĩ đôi lần anh còn nợ em :
                        </p>
                        <p>
                          • <b>Lần anh vô tâm:</b> Đã có những thời điểm anh quá
                          bận tâm với đến mình mà quên đi em những ngày em khó
                          khăn, những ngày quan trọng đáng lẽ anh nên ở đó hoăc
                          đơn giản là anh nên dành đôi ba lời chút và hỏi thăm
                          cho em.
                        </p>
                        <p>
                          • <b>Anh không thấu hiểu:</b> Em biết rõ suốt chặng
                          đường mình đi anh chỉ như đứa con nít tập lớn, thiếu
                          kiên nhẫn và chính chắn đã ngăn cản anh cảm nhận rõ
                          ràng nhất nỗi mệt mỏi hay tủi thân mà em chịu đựng.
                        </p>
                        <p>
                          • <b>Làm em rơi nước mắt:</b> Vô ý hay hữu ý, anh rất
                          tiếc vì từng khiến tâm trạng rực rỡ của em bị che lấp
                          bởi những nỗi ấm ức không đáng có.
                        </p>
                        <p>
                          • <b>Những điều đáng lẽ:</b> Lẽ ra anh nên bao dung
                          hơn, nhường nhịn hơn và chia sẻ chân thành thay vì
                          bướng bỉnh tranh cãi ngày đó, xin lỗi những lần ta lướt qua nhau mà anh lại rụt rè, anh của về sau có thể xem đây là một bài học đắt giá cho anh.
                        </p>
                        <p className="italic text-[11px] text-[#C97A2B] mt-2 mb-50">
                          Lời xin lỗi này không cầu xin bất kỳ sự tha thứ hay
                          thay đổi nào, nó mong em hay đúng hơn và cả bản thân
                          anh có thể trút bỏ được sự bận lòng nếu có.
                        </p>
                        <p></p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Back / Body of envelope */}
                <div
                  onClick={() => setEnvelopeOpen(!envelopeOpen)}
                  className="absolute inset-0 bg-[#E8DCcb] rounded-[28px] border border-[#E8DFD3] shadow-md flex flex-col justify-between p-4 cursor-pointer z-20 group hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start">
                    <Mail className="w-6 h-6 text-[#C97A2B]/80" />
                    <span className="text-[10px] font-mono text-[#8A6D52] bg-[#F6EFE4] px-2 py-0.5 rounded-full border border-[#E8DFD3]">
                      {envelopeOpen ? "CHẠM ĐỂ ĐÓNG ✉️" : "CHẠM ĐỂ MỞ ✉️"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto pt-3">
                    <p className="text-xs font-serif font-semibold text-[#2A1C14] opacity-80">
                      Gửi Phương Thùy
                    </p>
                    <p className="text-[9px] text-[#8A6D52] tracking-wider mt-1 opacity-70">
                      Một bức thư chưa từng gửi
                    </p>
                  </div>

                  {/* Stamp detail */}
                  <div className="absolute right-4 bottom-4 w-9 h-9 bg-[#FFF9F2] border border-[#E8DFD3] p-0.5 rounded-md flex items-center justify-center rotate-6 shadow-xs group-hover:rotate-12 transition-transform">
                    <div className="w-full h-full border border-dashed border-[#C97A2B]/30 flex items-center justify-center text-[10px]">
                      🌻
                    </div>
                  </div>
                </div>
              </div>

              {/* Guide phrase */}
              <p className="text-xs text-[#8A6D52] mt-6 italic">
                {envelopeOpen
                  ? "Em có thể lăn nhẹ để đọc trọn nội dung trong thư..."
                  : "Chạm lên phong bì để hé lộ những điều anh mang theo lỗi lầm ngày cũ."}
              </p>
            </div>
          </section>

          {/* ---------- SECTION 5: NHỮNG ĐIỀU ANH VẪN NHỚ ---------- */}
          {/* <section className="py-10 border-t border-[#E8DFD3]">
            <div className="text-center mb-6">
              <span className="text-xs text-[#8A6D52] uppercase tracking-widest font-mono font-medium block mb-1">
                Thời gian trôi, ký ức ở lại
              </span>
              <h3 className="text-xl font-serif font-bold text-[#E8DFD3] bg-[#2A1C14] inline-block px-4 py-1.5 rounded-full">
                Những điều anh vẫn nhớ
              </h3>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ rotate: 1, scale: 1.02 }}
                className="bg-[#FFF9F2] p-5 pb-6 border border-[#E8DFD3] shadow-sm rounded-3xl rotate-[-1.5deg] max-w-[280px] mx-auto"
              >
                <div className="aspect-[4/3] w-full bg-[#F6EFE4] rounded-2xl mb-3.5 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FFDFA8]/20 to-transparent" />
                  <span className="text-3xl animate-pulse">💬</span>
                </div>
                <h4 className="text-xs font-mono text-[#8A6D52] uppercase tracking-wide mb-1">
                  Ký ức thường nhật
                </h4>
                <p className="text-sm font-serif font-medium text-[#2A1C14]">
                  Những cuộc trò chuyện bình dị nhất
                </p>
                <p className="text-[11px] text-[#8A6D52] mt-1 leading-relaxed font-light">
                  Những chủ đề không đầu không đuôi, kể nhau nghe dăm ba chuyện
                  vụn vặt bên đường nhưng rộn rã tiếng cười vô lo.
                </p>
              </motion.div>

             
              <motion.div
                whileHover={{ rotate: -1, scale: 1.02 }}
                className="bg-[#2A1C14] text-[#F6EFE4] p-6 pb-8 border border-[#2A1C14] shadow-md rounded-[36px] rotate-[1.5deg] max-w-[280px] mx-auto relative overflow-hidden"
              >
                <div className="absolute top-[-10px] right-[-10px] w-20 h-20 bg-[#FFDFA8]/10 rounded-full filter blur-xl" />
                <div className="aspect-[4/3] w-full bg-[#1C1109] rounded-2xl mb-4 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C97A2B]/20 to-transparent" />
                  <span className="text-3xl">☕</span>
                </div>
                <h4 className="text-xs font-mono text-[#FFDFA8] uppercase tracking-widest mb-1.5 opacity-80">
                  Hẹn gặp vô tư
                </h4>
                <p className="text-sm font-serif font-medium text-[#FFF9F2] italic">
                  &ldquo;Đôi khi anh vẫn nhớ những ngày rất bình thường.&rdquo;
                </p>
                <p className="text-[11px] text-[#FFF9F2]/70 mt-2 leading-relaxed font-light">
                  Những buổi chiều dạo mát, đón đưa nhau sau giờ học, giờ làm mà
                  chẳng mưu cầu gì khác ngoài sự bình yên lân cận.
                </p>
              </motion.div>

             
              <motion.div
                whileHover={{ rotate: 1.5, scale: 1.02 }}
                className="bg-[#FFF9F2] p-5 pb-6 border border-[#E8DFD3] shadow-sm rounded-3xl rotate-[-0.5deg] max-w-[280px] mx-auto"
              >
                <div className="aspect-[4/3] w-full bg-[#F6EFE4] rounded-2xl mb-3.5 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FFDFA8]/20 to-transparent" />
                  <span className="text-3xl animate-bounce">🍃</span>
                </div>
                <h4 className="text-xs font-mono text-[#8A6D52] uppercase tracking-wide mb-1">
                  Lặng lẽ sát bên
                </h4>
                <p className="text-sm font-serif font-medium text-[#2A1C14]">
                  Chỉ im lặng là đủ đầy
                </p>
                <p className="text-[11px] text-[#8A6D52] mt-1 leading-relaxed font-light">
                  Những lúc hai đứa ngồi cạnh nhau mà không cần lên tiếng, không
                  chút gượng gạo, vẫn thấy thời gian trôi đi thật nhẹ nhõm.
                </p>
              </motion.div>
            </div>
          </section> */}

          {/* ---------- SECTION 6: NHỮNG ĐIỀU ANH LUÔN TRÂN TRỌNG ---------- */}
          <section className="py-10 border-t border-[#E8DFD3]">
            <div className="text-center mb-6">
              <span className="text-xs text-[#8A6D52] uppercase tracking-widest font-mono font-medium block mb-1">
                Lưu giữ 
              </span>
              <h3 className="text-xl font-serif font-bold text-[#C97A2B]">
                Những điều anh luôn trân trọng ở em
              </h3>
              <p className="text-[11px] text-[#8A6D52] mt-1 italic">
                Chạm vào từng đóa hoa để xem chi tiết
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 max-w-[290px] mx-auto">
              {characterCards.map((card) => {
                const isOpen = openTrantrong.includes(card.id);
                return (
                  <motion.div
                    key={card.id}
                    layout
                    onClick={() => handleToggleTrantrong(card.id)}
                    className="bg-[#FFF9F2] border border-[#E8DFD3] rounded-3xl p-5 cursor-pointer shadow-xs select-none transition-all hover:border-[#C97A2B]/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🌻</span>
                        <div>
                          <h4 className="text-xs md:text-sm font-serif font-bold text-[#2A1C14]">
                            {card.title}
                          </h4>
                          <p className="text-[10px] text-[#8A6D52] font-light">
                            {card.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-[#C97A2B] font-mono">
                        {isOpen ? "Thu gọn" : "Chi tiết"}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-3 border-t border-[#E8DFD3] pt-2.5"
                        >
                          <p className="text-xs text-[#8A6D52] leading-relaxed font-light">
                            {card.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ---------- SECTION 7: SUNFLOWER GARDEN ---------- */}
          <section className="py-10 border-t border-[#E8DFD3]">
            <div className="text-center mb-6">
              <span className="text-xs text-[#8A6D52] uppercase tracking-widest font-mono font-medium block mb-1">
                Gửi vào ngàn dặm gió
              </span>
              <h3 className="text-xl font-serif font-bold text-[#C97A2B]">
                Vườn hoa của Thùy
              </h3>
              <p className="text-xs text-[#8A6D52] mt-1 max-w-[280px] mx-auto font-light leading-relaxed">
                Mỗi đóa hoa nở rực rỡ ở đây ẩn chứa một lời chúc lành anh đã
                gieo trồng tặng em. Hãy thử mở hết xem sao nhé!
              </p>
            </div>

            <SunflowerGarden />
          </section>

          {/* ---------- SECTION 8: ĐIỀU ANH MONG CHO EM ---------- */}
          <section className="py-10 border-t border-[#E8DFD3]">
            <div className="bg-[#FFF9F2] border border-[#E8DFD3] rounded-[40px] p-8 shadow-xs text-left">
              <div className="flex justify-center mb-4">
                <Sun
                  className="w-8 h-8 text-[#C97A2B] animate-spin"
                  style={{ animationDuration: "15s" }}
                />
              </div>

              <h3 className="text-center text-lg font-serif font-bold text-[#C97A2B] mb-1">
                Điều anh mong cho em
              </h3>
              <p className="text-center text-[11px] text-[#8A6D52] uppercase font-mono tracking-wider mb-6">
                Chân thành hướng về tương lai em
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="p-1.5 rounded-xl bg-[#F6EFE4] text-xs">
                    🧡
                  </span>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-[#2A1C14]">
                      Mong em luôn bình an
                    </h4>
                    <p className="text-xs text-[#8A6D52] mt-0.5 leading-relaxed font-light">
                      Mong cuộc đời có giông bão thế nào thì em luôn tìm thấy
                      nơi nương náu an lành nhất, trái tim không lo sầu sụp đổ.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-1.5 rounded-xl bg-[#F6EFE4] text-xs">
                    🌱
                  </span>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-[#2A1C14]">
                      Mong em gặp người tử tế
                    </h4>
                    <p className="text-xs text-[#8A6D52] mt-0.5 leading-relaxed font-light">
                      Cầu mong những người xuất hiện bên đời em sau này sẽ biết
                      kiên nhẫn, thấu hiểu, chân quý tấm lòng và yêu thương em
                      thật tâm.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-1.5 rounded-xl bg-[#F6EFE4] text-xs">
                    ☀️
                  </span>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-[#2A1C14]">
                      Mong gánh nặng vơi bớt
                    </h4>
                    <p className="text-xs text-[#8A6D52] mt-0.5 leading-relaxed font-light">
                      Hy vọng guồng quay cơm áo hay những trăn trở cuộc sống sẽ
                      đối xử thật dịu hiền và ưu ái cho từng sự cố gắng của em.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-1.5 rounded-xl bg-[#F6EFE4] text-xs">
                    🌻
                  </span>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-[#2A1C14]">
                      Luôn giữ trọn nụ cười
                    </h4>
                    <p className="text-xs text-[#8A6D52] mt-0.5 leading-relaxed font-light">
                      Dù đời có xoay vần ra sao, mong Thùy của anh vẫn đủ sức
                      giữ lại nụ cười rạng rỡ và sự lạc quan xinh xẻo vô ngần.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- SECTION 9: MỘT MÓN QUÀ NHỎ ---------- */}
          <section className="py-12 border-t border-[#E8DFD3] text-center relative">
            <span className="text-xs text-[#8A6D52] uppercase tracking-widest font-mono font-medium block mb-1">
              Khép lại hành trình nhỏ
            </span>
            <h3 className="text-xl font-serif font-bold text-[#C97A2B]">
              Có một món quà nhỏ
            </h3>
            <p className="text-xs text-[#8A6D52] mt-1 mb-8 max-w-[280px] mx-auto font-light leading-relaxed">
              Hãy bấm vào chiếc hộp phép mầm dưới đây để bừng nở đóa hướng dương
              sinh nhật riêng của chính em nhé.
            </p>

            <div className="relative flex flex-col items-center justify-center min-h-[220px]">
              {/* Sparkle particles popped of Confetti on open */}
              {giftOpened && <ConfettiExplosion />}

              <AnimatePresence mode="wait">
                {!giftOpened ? (
                  <motion.div
                    key="gift-closed"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setGiftOpened(true)}
                    className="flex flex-col items-center justify-center cursor-pointer select-none"
                  >
                    {/* Pulsing visual glow background */}
                    <div className="absolute w-24 h-24 rounded-full bg-[#FFDFA8] opacity-30 filter blur-xl animate-soft-pulse -z-10" />

                    <motion.div
                      animate={{
                        y: [-4, 4, -4],
                        rotate: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-6xl filter drop-shadow-lg mb-5"
                    >
                      🎁
                    </motion.div>

                    <button
                      id="btn-open-gift"
                      className="bg-gradient-to-r from-[#C97A2B] to-[#E6933C] text-[#FFF9F2] text-xs font-semibold px-6 py-2.5 rounded-full shadow-md tracking-wider cursor-pointer"
                    >
                      MỞ QUÀ 🎁
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="gift-opened-revealed"
                    initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                    className="bg-[#FFF9F2] rounded-[40px] p-8 border border-[#E8DFD3] max-w-[290px] w-full shadow-2xl relative overflow-hidden"
                  >
                    {/* Top glow */}
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#FFBF3F]/20 rounded-full filter blur-xl" />
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#C97A2B]/15 rounded-full filter blur-xl" />

                    <div className="text-xl mb-2">🎉</div>
                    <div className="text-[#8A6D52] text-[10px] uppercase font-mono tracking-widest mb-1">
                      Món Quà Thanh Xuân
                    </div>

                    <h4 className="text-lg font-serif font-bold text-[#C97A2B]">
                      Chúc mừng sinh nhật
                    </h4>
                    <p className="text-base font-cute font-bold text-[#2A1C14] mt-0.5">
                      Phương Thùy
                    </p>
                    <p className="text-xs text-[#8A6D52] font-mono mt-0.5">
                      15.06.2004
                    </p>

                    {/* Divider line */}
                    <div className="w-16 h-0.5 bg-[#E8DFD3] mx-auto my-3" />

                    <p className="text-xs font-serif text-[#2A1C14] leading-relaxed italic px-2">
                      &ldquo;Cảm ơn vì đã từng là một phần rất đẹp trong thanh
                      xuân của anh.&rdquo;
                    </p>

                    <motion.button
                      id="btn-replay-gift"
                      onClick={() => setGiftOpened(false)}
                      className="mt-4 text-[10px] text-[#C97A2B] hover:underline cursor-pointer opacity-70"
                    >
                      Bấm để gói lại quà 🔄
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* ---------- FINAL SECTION — Natural Tones Theme Contrast box ---------- */}
          <section className="mt-12 mb-6 py-12 bg-[#2A1C14] rounded-[40px] border border-[#2A1C14] shadow-inner text-center text-[#F6EFE4] relative overflow-hidden px-6">
            {/* Soft dark starry elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C97A2B_1px,transparent_1px)] bg-[size:10px_10px]" />

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-4"
            >
              <SleepingCat />
            </motion.div>

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="max-w-[270px] mx-auto text-left"
            >
              <div className="text-center mb-6">
                <span className="text-[20px]">🌻</span>
                <p className="text-[10px] font-mono tracking-widest text-[#FFDFA8] uppercase mt-1">
                  Lời kết từ một người cũ
                </p>
              </div>

              <div className="space-y-4 text-xs tracking-wide leading-relaxed font-light text-[#F6EFE4]/90">
                <p>
                  Anh nghĩ ai rồi cũng sẽ có những con đường riêng của chính
                  mình.
                </p>
                <p>
                  Có những người may mắn cùng đi với nhau rất lâu, cũng có tiếng
                  vấp ngã rồi đi cùng nhau một đoạn ngắn ngủi.
                </p>
                <p>
                  Dù thuộc trường hợp nào đi chăng nữa, anh vẫn luôn biết ơn sâu
                  sắc vì em đã từng xuất hiện kiêu hãnh trong những năm tháng
                  tươi đẹp nhất của cuộc đời anh.
                </p>
                <p>
                  Hôm nay là sinh nhật em, chúc em thật nhiều sức khỏe, bình yên
                  trong mọi hành trình tiếp theo, và luôn tràn ngập hạnh phúc
                  bên những sự lựa chọn của bản thân.
                </p>
              </div>

              <div className="mt-8 border-t border-[#FFDFA8]/25 pt-4 text-center">
                <p className="text-xs font-serif text-[#FFDFA8] font-bold">
                  Chúc mừng sinh nhật em, Phương Thùy.
                </p>
                <p className="text-[10px] text-[#FFDFA8]/60 font-mono mt-1">
                  Tháng Sáu, 2026.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Sincere Footer copyright notation */}
          <footer className="text-center pt-6 text-[10px] text-[#8A6D52]/60 font-light select-none">
            Thiết kế chân thành dành riêng cho ngày 15/06 🌟
          </footer>
        </div>
      )}
    </div>
  );
}
