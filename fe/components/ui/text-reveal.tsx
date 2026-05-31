"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

const WORDS_PER_STEP = 4;
const LOCK_LINE_RATIO = 0.5;
const LOCK_ZONE = 10;
const WHEEL_STEP_THRESHOLD = 70;
const TOUCH_STEP_THRESHOLD = 44;

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");
  const totalSteps = Math.ceil(words.length / WORDS_PER_STEP);
  const stepSize = 1 / totalSteps;

  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const isLockedRef = useRef(false);
  const justUnlockedRef = useRef(false);
  const lockedScrollYRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const lastElementCenterRef = useRef<number | null>(null);
  const wheelDeltaRef = useRef(0);
  const touchDeltaRef = useRef(0);

  const setProgressValue = (value: number) => {
    const next = Math.max(0, Math.min(1, value));
    progressRef.current = next;
    setProgress(next);
  };

  const moveOneStep = (direction: 1 | -1) => {
    const currentStep = Math.round(progressRef.current / stepSize);
    setProgressValue((currentStep + direction) * stepSize);
  };

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const lockAtCurrentPosition = (
      elementCenter: number,
      lockLine: number,
      direction: 1 | -1,
    ) => {
      const targetScrollY = Math.round(window.scrollY + elementCenter - lockLine);
      lockedScrollYRef.current = targetScrollY;
      isLockedRef.current = true;

      const step =
        direction === 1
          ? Math.floor(progressRef.current / stepSize)
          : Math.ceil(progressRef.current / stepSize);

      setProgressValue(step * stepSize);
      window.scrollTo({ top: targetScrollY, behavior: "instant" });
      lastElementCenterRef.current = lockLine;
    };

    const handleScroll = () => {
      if (isLockedRef.current) {
        if (lockedScrollYRef.current !== null) {
          window.scrollTo({ top: lockedScrollYRef.current, behavior: "instant" });
        }
        return;
      }

      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const lockLine = window.innerHeight * LOCK_LINE_RATIO;
      const elementCenter = rect.top + rect.height / 2;
      const scrollingDown = window.scrollY >= lastScrollYRef.current;
      const direction = scrollingDown ? 1 : -1;
      const previousCenter = lastElementCenterRef.current;
      const isInLockZone = Math.abs(elementCenter - lockLine) <= LOCK_ZONE;
      const crossedFromTop =
        scrollingDown &&
        previousCenter !== null &&
        previousCenter > lockLine &&
        elementCenter <= lockLine;
      const crossedFromBottom =
        !scrollingDown &&
        previousCenter !== null &&
        previousCenter < lockLine &&
        elementCenter >= lockLine;

      lastScrollYRef.current = window.scrollY;

      if (justUnlockedRef.current) {
        lastElementCenterRef.current = elementCenter;
        if (!isInLockZone) {
          justUnlockedRef.current = false;
        }
        return;
      }

      const shouldLockDown =
        scrollingDown &&
        progressRef.current < 1 &&
        (isInLockZone || crossedFromTop);
      const shouldLockUp =
        !scrollingDown &&
        progressRef.current > 0 &&
        (isInLockZone || crossedFromBottom);

      if (shouldLockDown || shouldLockUp) {
        lockAtCurrentPosition(elementCenter, lockLine, direction);
        return;
      }

      lastElementCenterRef.current = elementCenter;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [stepSize]);

  useEffect(() => {
    const unlock = () => {
      isLockedRef.current = false;
      justUnlockedRef.current = true;
      lockedScrollYRef.current = null;
      wheelDeltaRef.current = 0;
      touchDeltaRef.current = 0;
    };

    const handleLockedDelta = (
      rawDelta: number,
      threshold: number,
      deltaRef: React.MutableRefObject<number>,
    ) => {
      const direction = rawDelta > 0 ? 1 : -1;

      if (direction === 1 && progressRef.current >= 1) {
        unlock();
        return false;
      }

      if (direction === -1 && progressRef.current <= 0) {
        unlock();
        return false;
      }

      deltaRef.current += rawDelta;

      if (Math.abs(deltaRef.current) >= threshold) {
        moveOneStep(deltaRef.current > 0 ? 1 : -1);
        deltaRef.current = 0;
      }

      return true;
    };

    const lockBeforeNativeScroll = (rawDelta: number) => {
      if (isLockedRef.current || justUnlockedRef.current) return false;
      if (!sectionRef.current || rawDelta === 0) return false;

      const rect = sectionRef.current.getBoundingClientRect();
      const lockLine = window.innerHeight * LOCK_LINE_RATIO;
      const elementCenter = rect.top + rect.height / 2;
      const predictedCenter = elementCenter - rawDelta;
      const direction = rawDelta > 0 ? 1 : -1;
      const isInLockZone = Math.abs(elementCenter - lockLine) <= LOCK_ZONE;
      const willCrossFromTop =
        direction === 1 &&
        elementCenter > lockLine &&
        predictedCenter <= lockLine;
      const willCrossFromBottom =
        direction === -1 &&
        elementCenter < lockLine &&
        predictedCenter >= lockLine;
      const shouldLockDown =
        direction === 1 &&
        progressRef.current < 1 &&
        (isInLockZone || willCrossFromTop);
      const shouldLockUp =
        direction === -1 &&
        progressRef.current > 0 &&
        (isInLockZone || willCrossFromBottom);

      if (!shouldLockDown && !shouldLockUp) return false;

      const targetScrollY = Math.round(window.scrollY + elementCenter - lockLine);
      const step =
        direction === 1
          ? Math.floor(progressRef.current / stepSize)
          : Math.ceil(progressRef.current / stepSize);

      setProgressValue(step * stepSize);
      lockedScrollYRef.current = targetScrollY;
      isLockedRef.current = true;
      lastElementCenterRef.current = lockLine;
      window.scrollTo({ top: targetScrollY, behavior: "instant" });

      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isLockedRef.current && lockBeforeNativeScroll(event.deltaY)) {
        event.preventDefault();
        return;
      }

      if (!isLockedRef.current) return;

      const shouldPrevent = handleLockedDelta(
        event.deltaY,
        WHEEL_STEP_THRESHOLD,
        wheelDeltaRef,
      );

      if (!shouldPrevent) return;

      event.preventDefault();
      if (lockedScrollYRef.current !== null) {
        window.scrollTo({ top: lockedScrollYRef.current, behavior: "instant" });
      }
    };

    let touchStart = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStart = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStart;
      const delta = touchStart - currentY;
      touchStart = currentY;

      if (!isLockedRef.current && lockBeforeNativeScroll(delta)) {
        event.preventDefault();
        return;
      }

      if (!isLockedRef.current) return;

      const shouldPrevent = handleLockedDelta(
        delta,
        TOUCH_STEP_THRESHOLD,
        touchDeltaRef,
      );

      if (!shouldPrevent) return;

      event.preventDefault();
      if (lockedScrollYRef.current !== null) {
        window.scrollTo({ top: lockedScrollYRef.current, behavior: "instant" });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [stepSize]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "relative z-0 flex min-h-[25vh] items-center justify-center bg-transparent py-8",
        className,
      )}
    >
      <span className="mx-auto flex max-w-4xl flex-wrap justify-center px-4 text-center text-2xl font-light leading-relaxed text-white/20 md:text-3xl">
        {words.map((word, index) => {
          const stepIndex = Math.floor(index / WORDS_PER_STEP);
          const start = stepIndex / totalSteps;
          const end = (stepIndex + 0.8) / totalSteps;
          let wordOpacity = 0;

          if (progress >= end) {
            wordOpacity = 1;
          } else if (progress > start) {
            wordOpacity = (progress - start) / (end - start);
          }

          return (
            <span key={`${word}-${index}`} className="relative mx-1 inline-block">
              <span className="absolute select-none opacity-30">{word}</span>
              <span
                className="relative z-10 text-white transition-opacity duration-75"
                style={{ opacity: wordOpacity }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </div>
  );
};
