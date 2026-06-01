"use client"

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ElementType,
} from "react"
import {
  useAnimate,
  type AnimationOptions,
  type ValueAnimationTransition,
} from "motion/react"

import { cn } from "@/lib/utils"

const HAS_SEGMENTER = typeof Intl !== "undefined" && "Segmenter" in Intl

const splitIntoCharacters = (text: string): string[] => {
  if (HAS_SEGMENTER) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
    return Array.from(segmenter.segment(text), ({ segment }) => segment)
  }
  return Array.from(text)
}

const extractTextFromChildren = (children: React.ReactNode): string => {
  if (children == null) return ""
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  }

  if (React.isValidElement(children)) {
    const props = children.props as Record<string, unknown>
    const childText = props.children as React.ReactNode
    if (childText != null) {
      return extractTextFromChildren(childText)
    }
  }

  return ""
}

const ROTATION_MAP = {
  top: "rotateX(90deg)",
  right: "rotateY(90deg)",
  bottom: "rotateX(-90deg)",
  left: "rotateY(-90deg)",
} as const

const SECOND_FACE_TRANSFORMS = {
  top: "rotateX(-90deg) translateZ(0.5lh)",
  right:
    "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)",
  bottom: "rotateX(90deg) translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)",
} as const

const FRONT_FACE_TRANSFORMS = {
  top: "translateZ(0.5lh)",
  bottom: "translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(-90deg) translateX(50%) rotateY(90deg)",
} as const

const CONTAINER_TRANSFORMS = {
  top: "translateZ(-0.5lh)",
  bottom: "translateZ(-0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
} as const

const DEFAULT_TRANSITION: ValueAnimationTransition = {
  type: "spring",
  damping: 30,
  stiffness: 300,
}

interface Text3DFlipProps {
  children: React.ReactNode
  as?: ElementType
  className?: string
  textClassName?: string | string[]
  flipTextClassName?: string | string[]
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number | "random"
  transition?: ValueAnimationTransition | AnimationOptions
  rotateDirection?: "top" | "right" | "bottom" | "left"
  autoPlay?: boolean
}

const Text3DFlip = ({
  children,
  as,
  className,
  textClassName,
  flipTextClassName,
  staggerDuration = 0.05,
  staggerFrom = "first",
  transition = DEFAULT_TRANSITION,
  rotateDirection = "right",
  autoPlay = true,
  ...props
}: Text3DFlipProps) => {
  const isAnimatingRef = useRef(false)
  const isMountedRef = useRef(false)
  const [scope, animate] = useAnimate()

  const ElementTag = (as || "p") as any

  const rotationTransform = ROTATION_MAP[rotateDirection]

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      isAnimatingRef.current = false
    }
  }, [])

  const text = useMemo(() => {
    try {
      return extractTextFromChildren(children)
    } catch {
      return ""
    }
  }, [children])

  const characters = useMemo(() => {
    const words = text.split(" ")
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1,
    }))
  }, [text])

  const charOffsets = useMemo(() => {
    const offsets = [0]
    for (const word of characters) {
      offsets.push(offsets.at(-1)! + word.characters.length)
    }
    return offsets
  }, [characters])

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      if (staggerFrom === "first") return index * staggerDuration
      if (staggerFrom === "last")
        return (totalChars - 1 - index) * staggerDuration
      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2)
        return Math.abs(center - index) * staggerDuration
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * totalChars)
        return Math.abs(randomIndex - index) * staggerDuration
      }
      return Math.abs(staggerFrom - index) * staggerDuration
    },
    [staggerFrom, staggerDuration]
  )

  const handleHoverStart = useCallback(async () => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    try {
      const totalChars = characters.reduce(
        (sum, word) => sum + word.characters.length,
        0
      )

      const delays = Array.from({ length: totalChars }, (_, i) =>
        getStaggerDelay(i, totalChars)
      )

      // 1. Flip smoothly to the 3D secondary face
      await animate(
        ".text-3d-flip-char",
        { transform: rotationTransform },
        {
          ...transition,
          delay: (i: number) => delays[i],
        }
      )

      if (!isMountedRef.current) return

      // 2. Snap instantly back to original container transform (preserving 3D depth)
      await animate(
        ".text-3d-flip-char",
        { transform: CONTAINER_TRANSFORMS[rotateDirection] },
        { duration: 0 }
      )
    } finally {
      if (isMountedRef.current) {
        isAnimatingRef.current = false
      }
    }
  }, [characters, transition, getStaggerDelay, rotationTransform, rotateDirection, animate])

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      handleHoverStart()
    }, 6000) // Flip automatically every 6 seconds

    const timeout = setTimeout(() => {
      handleHoverStart()
    }, 2000) // Initial flip after 2 seconds

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [autoPlay, handleHoverStart])

  return (
    <ElementTag
      className={cn("relative flex flex-wrap", className)}
      onMouseEnter={handleHoverStart}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{text}</span>

      {characters.map((wordObj, wordIndex) => (
        <span key={wordIndex} className="inline-flex">
          {wordObj.characters.map((char, charIndex) => {
            const currentTextClass = Array.isArray(textClassName)
              ? textClassName[wordIndex % textClassName.length]
              : textClassName;
            const currentFlipTextClass = Array.isArray(flipTextClassName)
              ? flipTextClassName[wordIndex % flipTextClassName.length]
              : flipTextClassName;

            return (
              <CharBox
                key={charOffsets[wordIndex] + charIndex}
                char={char}
                textClassName={currentTextClass}
                flipTextClassName={currentFlipTextClass}
                rotateDirection={rotateDirection}
              />
            )
          })}
          {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
        </span>
      ))}
    </ElementTag>
  )
}

interface CharBoxProps {
  char: string
  textClassName?: string
  flipTextClassName?: string
  rotateDirection: "top" | "right" | "bottom" | "left"
}

const CharBox = memo(
  ({
    char,
    textClassName,
    flipTextClassName,
    rotateDirection,
  }: CharBoxProps) => (
    <span
      className="text-3d-flip-char inline transform-3d"
      style={{ transform: CONTAINER_TRANSFORMS[rotateDirection] }}
    >
      <span
        className={cn("relative h-[1lh] backface-hidden", textClassName)}
        style={{ transform: FRONT_FACE_TRANSFORMS[rotateDirection] }}
      >
        {char}
      </span>
      <span
        className={cn(
          "absolute top-0 left-0 h-[1lh] backface-hidden",
          flipTextClassName
        )}
        style={{ transform: SECOND_FACE_TRANSFORMS[rotateDirection] }}
      >
        {char}
      </span>
    </span>
  )
)

CharBox.displayName = "CharBox"
Text3DFlip.displayName = "Text3DFlip"

export default Text3DFlip
