import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

function MagneticButton({ children }) {
  const buttonRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [0, 50], [0, -5]);
  const rotateY = useTransform(x, [0, 50], [0, 5]);

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    x.set(offsetX / 5);
    y.set(offsetY / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, rotateX, rotateY }}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg cursor-pointer select-none transition-all hover:bg-blue-500"
    >
      {children}
    </motion.button>
  );
}

export default MagneticButton;