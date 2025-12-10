"use client";

import { motion, Variants, useAnimation } from "framer-motion";
import { ReactNode, useState } from "react";

interface HandWrittenWrapperProps {
  children: ReactNode;
  className?: string;
  strokeColor?: string;
  hoverFillColor?: string;
}

function HandWrittenWrapper({ 
  children, 
  className, 
  strokeColor = "text-secondary",
  hoverFillColor = "primary"
}: HandWrittenWrapperProps) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.2, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    controls.set("hidden");
    controls.start("visible");
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
      {/* Hover fill background */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-300 ease-out ${
          isHovered ? `bg-${hoverFillColor} scale-100 opacity-100` : 'scale-95 opacity-0'
        }`}
        style={{ 
          backgroundColor: isHovered ? `hsl(var(--${hoverFillColor}))` : 'transparent'
        }}
      />
      
      {/* Hand-drawn circle */}
      <div className="absolute -inset-x-2 -inset-y-0.5 pointer-events-none">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 200 60"
          initial="visible"
          animate={controls}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <title>Hand drawn circle</title>
          <motion.path
            d="M 185 15 
               C 200 35, 195 50, 100 52
               C 20 52, 5 42, 5 30
               C 5 18, 30 8, 100 8
               C 170 8, 185 20, 190 28"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className={strokeColor}
          />
        </motion.svg>
      </div>
      
      {/* Content with hover text color transition */}
      <div className={`relative z-10 transition-colors duration-300 ${
        isHovered ? 'text-primary-foreground' : ''
      }`}>
        {children}
      </div>
    </div>
  );
}

export { HandWrittenWrapper };
