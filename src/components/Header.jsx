import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  MessageCircle,
  BarChart2,
  Menu,
  X,
} from "lucide-react";

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", icon: <LayoutDashboard size={18} /> },
    { name: "How it Works", icon: <Calendar size={18} /> },
    { name: "About Us", icon: <ClipboardList size={18} /> },
    { name: "Contact Us", icon: <MessageCircle size={18} /> },
    { name: "Statistics", icon: <BarChart2 size={18} /> },
  ];

  return (
    <header className="fixed w-full z-50 flex justify-center mt-4">
      <div className="w-[95%] max-w-7xl bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-3 shadow-lg">

        <div className="flex justify-between items-center">

          {/* LOGO */}
          <div className="flex items-center gap-2 text-white font-semibold text-lg">
            <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-lg font-bold">
              W
            </div>
            WellWigen <span className="text-blue-400">Fitness</span>
          </div>

          {/* NAV BAR */}
          <div className="hidden md:flex relative items-center bg-white/5 p-1 rounded-xl border border-white/10">

            {/* SLIDING PILL */}
            <div
              className="absolute top-1 bottom-1 bg-blue-500 rounded-lg transition-all duration-300"
              style={{
                width: `${100 / navLinks.length}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />

            {/* BUTTONS */}
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => setActiveIndex(index)}
                className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${
                  activeIndex === index
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.icon}
                {link.name}
              </button>
            ))}
          </div>

          {/* RIGHT PROFILE */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-white text-xl">🔔</div>
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-4 space-y-3">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => {
                  setActiveIndex(index);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 w-full text-left py-2 ${
                  activeIndex === index
                    ? "text-blue-400"
                    : "text-gray-300"
                }`}
              >
                {link.icon}
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;