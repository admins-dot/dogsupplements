"use client";

import { motion, Variants, useAnimation } from "framer-motion";
import { ReactNode } from "react";

interface HandWrittenWrapperProps {
  children: ReactNode;
  className?: string;
  strokeColor?: string;
}

function HandWrittenWrapper({ children, className, strokeColor = "text-secondary" }: HandWrittenWrapperProps) {
  const controls = useAnimation();

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  };

  const handleMouseEnter = () => {
    controls.set("hidden");
    controls.start("visible");
  };

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      <div className="absolute -inset-x-3 -inset-y-1 pointer-events-none">
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
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export { HandWrittenWrapper };
