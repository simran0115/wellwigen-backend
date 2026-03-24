import React, { useEffect, useRef } from "react";

function ParticleEffect({ count = 15 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-2 h-2 bg-blue-400 rounded-full opacity-70 animate-float";
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      particle.style.animationDuration = `${2 + Math.random() * 3}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => container.removeChild(p));
    };
  }, [count]);

  return <div ref={containerRef} className="absolute inset-0 -z-20 overflow-hidden"></div>;
}

export default ParticleEffect;