"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function TypingAnimation({
  text,
  className = "",
  delay = 0,
  duration = 0.1,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [i, setI] = useState(0);

  const [cursorIndex, setCursorIndex] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [cursorLeft, setCursorLeft] = useState(0);

  useEffect(() => {
    if (i < text.length) {
      const interval = duration * 1000 * 2.0; // Slightly faster for better flow
      
      const timeout = setTimeout(() => {
        // 1. Move cursor to the NEXT character's position
        setCursorIndex(i + 1);
        
        // 2. Delay the appearance of the character slightly
        setTimeout(() => {
          setDisplayedText(text.substring(0, i + 1));
          setI(i + 1);
        }, interval * 0.4);
      }, interval);

      return () => clearTimeout(timeout);
    }
  }, [i, text, duration]);

  useEffect(() => {
    if (measureRef.current) {
      setCursorLeft(measureRef.current.offsetWidth + 24);
    }
  }, [cursorIndex]);

  const isComplete = i >= text.length;

  return (
    <div className={`${className} relative inline-block whitespace-nowrap`}>
      {/* Ghost text for layout stability */}
      <span className="invisible">{text}</span>
      
      {/* Absolute measurement text (includes the 'leading' character but hidden) */}
      <span ref={measureRef} className="absolute left-0 top-0 invisible">
        {text.substring(0, cursorIndex)}
      </span>

      {/* Actual visible text */}
      <span className="absolute left-0 top-0">
        {displayedText}
      </span>
      
      {/* The Underline/Cursor */}
      <motion.span
        initial={false}
        animate={isComplete 
          ? { 
              width: "100%",
              left: 0,
              bottom: "-6px",
              height: "2px",
              opacity: 1,
              backgroundColor: "#3b82f6",
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
            } 
          : { 
              width: "2px",
              height: "1em",
              left: cursorLeft,
              bottom: "0px",
              opacity: [1, 0, 1],
            }
        }
        transition={isComplete 
          ? { 
              width: { duration: 1.5, ease: "easeInOut", delay: 0.2 },
              left: { duration: 0.3, ease: "easeOut" },
              opacity: { duration: 0.5 }
            } 
          : {
              opacity: { duration: 0.8, repeat: Infinity, ease: "linear" },
              left: { type: "spring", stiffness: 100, damping: 15 } // Smooth cursor glide
            }
        }
        className="absolute bg-blue-500 rounded-full"
      />
    </div>
  );
}
