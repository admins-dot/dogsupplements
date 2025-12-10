"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface HandWrittenWrapperProps {
  children: ReactNode;
  className?: string;
}

function HandWrittenWrapper({ children, className }: HandWrittenWrapperProps) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="absolute inset-0 -inset-x-4 -inset-y-2">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 200 80"
          initial="hidden"
          animate="visible"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <title>Hand drawn circle</title>
          <motion.path
            d="M 180 20 
               C 210 50, 190 70, 100 72
               C 30 72, 10 60, 10 40
               C 10 20, 40 8, 100 8
               C 160 8, 180 25, 180 30"
            fill="none"
            strokeWidth="2.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className="text-secondary"
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
