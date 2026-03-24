import React, { useEffect, useState } from "react";

function CircularProgress({ value = 90 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += 1;
      setProgress(start);

      if (start >= value) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [value]);

  const size = 160;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">

      <svg width={size} height={size}>

        {/* Background circle */}
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress circle */}
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />

        {/* Gradient */}
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

      </svg>

      {/* Center Number */}
      <div className="absolute text-3xl font-bold">
        {progress}
      </div>

    </div>
  );
}

export default CircularProgress;