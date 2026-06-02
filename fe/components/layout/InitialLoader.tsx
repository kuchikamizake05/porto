"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import CountUp from "@/components/ui/CountUp";

const INTRO_DELAY_MS = 300;
const COUNT_DURATION = 1.4;
const ALMOST_READY_DELAY_MS = 900;
const EXIT_HOLD_MS = 180;
const EXIT_DURATION_MS = 420;
const LOADER_SEEN_KEY = "portfolio-initial-loader-seen";

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(LOADER_SEEN_KEY) !== "true";
  });
  const [showContent, setShowContent] = useState(false);
  const [isAlmostReady, setIsAlmostReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const introDelay = shouldReduceMotion ? 100 : INTRO_DELAY_MS;
    const timeout = window.setTimeout(() => setShowContent(true), introDelay);

    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!showContent) return;

    const almostReadyTimeout = window.setTimeout(
      () => setIsAlmostReady(true),
      shouldReduceMotion ? 520 : ALMOST_READY_DELAY_MS
    );

    return () => window.clearTimeout(almostReadyTimeout);
  }, [shouldReduceMotion, showContent]);

  const startExit = useCallback(() => {
    window.setTimeout(() => {
      window.setTimeout(
        () => {
          window.sessionStorage.setItem(LOADER_SEEN_KEY, "true");
          setIsVisible(false);
        },
        shouldReduceMotion ? 180 : EXIT_DURATION_MS
      );
    }, shouldReduceMotion ? 140 : EXIT_HOLD_MS);
  }, [shouldReduceMotion]);

  const updateProgress = useCallback((value: number) => {
    setProgress(Math.max(0, Math.min(100, value)));
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{
            y: shouldReduceMotion ? 0 : "-100%",
            opacity: shouldReduceMotion ? 0 : 1,
          }}
          transition={{ duration: shouldReduceMotion ? 0.22 : EXIT_DURATION_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center overflow-hidden bg-[#080b12] text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(96,165,250,0.10),transparent_28%),radial-gradient(circle_at_50%_62%,rgba(16,185,129,0.045),transparent_24%),linear-gradient(180deg,#080b12_0%,#101112_54%,#080b12_100%)]" />

          {showContent && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex w-full max-w-[260px] flex-col items-center px-6 text-center sm:max-w-[280px]"
            >
              <div className="flex w-full flex-col items-center">
                <p className="w-full text-center font-sans text-[11px] font-semibold uppercase tracking-[0.42em] text-blue-50/85 sm:text-xs">
                  Faaid Sakhaa
                </p>
                <div className="mt-4 h-px w-20 bg-blue-300/20" />
              </div>

              <div className="mt-10 flex w-full justify-center">
                <motion.div
                  animate={shouldReduceMotion ? undefined : { opacity: [0.92, 1] }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="inline-flex items-end justify-center tabular-nums text-zinc-100"
                >
                  <CountUp
                    from={0}
                    to={100}
                    separator=","
                    direction="up"
                    duration={shouldReduceMotion ? 0.9 : COUNT_DURATION}
                    className="count-up-text text-[4.15rem] font-medium leading-[0.82] tracking-[-0.08em] text-blue-50/95 sm:text-[4.75rem]"
                    delay={0}
                    startWhen={showContent}
                    onUpdate={updateProgress}
                    onEnd={startExit}
                  />
                  <span className="mb-1 ml-2 text-2xl font-semibold leading-none text-blue-200/60 sm:text-3xl">
                    %
                  </span>
                </motion.div>
              </div>

              <div className="mt-10 h-px w-full overflow-hidden bg-blue-100/15">
                <motion.div
                  className="h-full origin-left bg-zinc-50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{
                    duration: 0.08,
                    ease: "linear",
                  }}
                />
              </div>

              <motion.p
                animate={{ opacity: isAlmostReady ? 0.58 : 0.36 }}
                transition={{ duration: 0.25 }}
                className="mt-9 w-full text-center font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-100/45 sm:text-xs"
              >
                {isAlmostReady ? "Almost Ready..." : "Loading Assets..."}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
