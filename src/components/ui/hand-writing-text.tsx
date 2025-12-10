"use client";

import { motion, useAnimation } from "framer-motion";
import { ReactNode, useState } from "react";

interface HandWrittenWrapperProps {
  children: ReactNode;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

function HandWrittenWrapper({ 
  children, 
  className, 
  strokeColor = "hsl(var(--secondary))",
  fillColor = "hsl(45, 65%, 92%)" // Light yellow default
}: HandWrittenWrapperProps) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Closed path that follows the stroke exactly
  const shapePath = `M 185 15 
     C 200 35, 195 50, 100 52
     C 20 52, 5 42, 5 30
     C 5 18, 30 8, 100 8
     C 170 8, 185 20, 190 28
     C 192 32, 190 38, 185 42
     C 175 50, 140 52, 100 52
     C 60 52, 25 45, 12 35
     C 5 28, 5 22, 12 15
     C 25 5, 60 8, 100 8
     C 140 8, 175 12, 185 15
     Z`;

  const handleMouseEnter = () => {
    setIsHovered(true);
    controls.start({
      pathLength: [0, 1],
      opacity: 1,
      transition: {
        pathLength: { duration: 1.2, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hand-drawn circle with fill on hover */}
      <div className="absolute -inset-x-2 -inset-y-0.5 pointer-events-none">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 200 60"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <title>Hand drawn circle</title>
          {/* Fill path - drawn first so it's behind the stroke */}
          <motion.path
            d={shapePath}
            fill={fillColor}
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Stroke path - drawn on top */}
          <motion.path
            d="M 185 15 
               C 200 35, 195 50, 100 52
               C 20 52, 5 42, 5 30
               C 5 18, 30 8, 100 8
               C 170 8, 185 20, 190 28"
            strokeWidth="2"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 1, opacity: 1 }}
            animate={controls}
            fill="none"
          />
        </motion.svg>
      </div>
      
      {/* Content with hover text color transition */}
      <div className={`relative z-10 transition-colors duration-300 ${
        isHovered ? 'text-foreground' : 'text-foreground'
      }`}>
        {children}
      </div>
    </div>
  );
}

export { HandWrittenWrapper };
