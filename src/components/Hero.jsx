import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  BriefcaseMedical,
  Utensils,
  HeartPulse
} from "lucide-react";

const cardsData = [
  {
    step: "STEP 01",
    title: "Track your health",
    subtitle: "Wearables & real-time data sync",
    gradient: "from-[#6FA8DC] to-[#4A90E2]",
    icon: Activity
  },
  {
    step: "STEP 02",
    title: "AI analyzes your body",
    subtitle: "Advanced clinical intelligence",
    gradient: "from-[#6FCF97] to-[#27AE60]",
    icon: Brain
  },
  {
    step: "STEP 03",
    title: "Doctors & labs support",
    subtitle: "24/7 expert monitoring",
    gradient: "from-[#A78BFA] to-[#7C3AED]",
    icon: BriefcaseMedical
  },
  {
    step: "STEP 04",
    title: "Nutrition auto-adjusts",
    subtitle: "Personalized diet optimization",
    gradient: "from-[#D2A679] to-[#B08968]",
    icon: Utensils
  },
  {
    step: "STEP 05",
    title: "Continuous monitoring",
    subtitle: "Real-time adaptive tracking",
    gradient: "from-[#6FA8DC] to-[#4A90E2]",
    icon: HeartPulse
  }
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden relative">

      {/* ANIMATED BACKGROUND */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-300 rounded-full blur-[120px] opacity-40"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-120px] right-[-80px] w-[450px] h-[450px] bg-blue-200 rounded-full blur-[120px] opacity-40"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* TEXT */}
      <div className="text-center mb-20 px-6 max-w-3xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Handover Your Health <br /> to Wellwigen
        </h1>
        <p className="text-gray-600 mt-6 text-lg">
          A premium clinical ecosystem that monitors, guides,
          and adapts to your biology for total peace of mind.
        </p>
      </div>

      {/* CARDS */}
      <div className="relative w-full h-[520px] flex items-center justify-center z-10">

        {cardsData.map((card, index) => {
          const Icon = card.icon;

          let offset = index - activeIndex;

          if (offset < -Math.floor(cardsData.length / 2)) {
            offset += cardsData.length;
          }
          if (offset > Math.floor(cardsData.length / 2)) {
            offset -= cardsData.length;
          }

          const isActive = offset === 0;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                x: offset * 300,
                scale: isActive ? 1.08 : 0.88,
                opacity: isActive ? 1 : 0.5,
                zIndex: isActive ? 10 : 5
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.8, 0.25, 1]
              }}
              className={`absolute rounded-[32px] p-8 flex flex-col justify-between text-white 
              bg-gradient-to-br ${card.gradient}`}
              style={{
                width: "325px",
                height: "480px", // ✅ FINAL HEIGHT INCREASE
                boxShadow: isActive
                  ? "0 40px 100px rgba(0,0,0,0.25)"
                  : "0 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/10 rounded-[32px]"></div>

              {/* CONTENT */}
              <div className="relative z-10">
                <p className="text-xs tracking-wider text-white/80 mb-3 font-medium">
                  {card.step}
                </p>

                <h2 className="text-xl font-semibold leading-snug">
                  {card.title}
                </h2>

                <p className="text-sm text-white/90 mt-2">
                  {card.subtitle}
                </p>
              </div>

              {/* ICON */}
              <div className="relative z-10 flex justify-center items-center flex-1">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-white/20 p-4 rounded-2xl backdrop-blur-md"
                >
                  <Icon size={isActive ? 44 : 36} />
                </motion.div>
              </div>

              {/* BUTTON */}
              <div className="relative z-10 flex justify-end">
                <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-md hover:scale-110 transition">
                  →
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}