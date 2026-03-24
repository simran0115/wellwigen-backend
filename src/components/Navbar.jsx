import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Sparkles,
  Calendar,
  Info,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Pricing", path: "/pricing", icon: <CreditCard size={18} /> },
    { name: "Services", path: "/services", icon: <Sparkles size={18} /> },
    { name: "How it Works", path: "/how-it-works", icon: <Calendar size={18} /> },
    { name: "About Us", path: "/about", icon: <Info size={18} /> },
    { name: "Contact Us", path: "/contact", icon: <MessageCircle size={18} /> },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-white"  // 👈 FIX: no more transparent
      }`}
    >
      <div className="w-[95%] max-w-7xl px-6 py-3">

        <div className="flex justify-between items-center">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-semibold text-lg cursor-pointer text-gray-900"
          >
            <div className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold">
              W
            </div>
            WellWigen <span className="text-blue-500">Fitness</span>
          </div>

          {/* NAV */}
          <div className="hidden md:flex items-center gap-2">

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <button
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3">

            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Register
            </button>
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white border rounded-xl p-4 space-y-3 shadow-lg">

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full text-left py-2 px-3 rounded-lg ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </button>
              );
            })}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="w-full py-2 rounded-lg border text-gray-700"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/register");
                  setIsOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-blue-500 text-white"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;