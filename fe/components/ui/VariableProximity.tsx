import {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent
} from 'react';
import { m as motion } from 'motion/react';

export type VariableProximitySegment = {
  text: string;
  className?: string;
};

function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>, disabled: boolean) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) return;

    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef, disabled]);

  return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  segments?: VariableProximitySegment[];
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    segments,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    onKeyDown,
    style,
    tabIndex,
    ...restProps
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const interpolatedSettingsRef = useRef<string[]>([]);
  const [isMobile, setIsMobile] = useState(true);

  // SSR-friendly media query to detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mousePositionRef = useMousePositionRef(containerRef, isMobile);
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const letterPositionsRef = useRef<{ centerX: number; centerY: number }[]>([]);

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented || !onClick) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  const interactionProps = onClick
    ? {
        onClick,
        onKeyDown: handleKeyDown,
        role: 'button' as const,
        tabIndex: tabIndex ?? 0
      }
    : {
        onKeyDown,
        tabIndex
      };

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  // Cache positions of letters relative to container
  const cachePositions = () => {
    if (!containerRef?.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    
    letterPositionsRef.current = letterRefs.current.map(letterRef => {
      if (!letterRef) return { centerX: 0, centerY: 0 };
      const rect = letterRef.getBoundingClientRect();
      return {
        centerX: rect.left + rect.width / 2 - containerRect.left,
        centerY: rect.top + rect.height / 2 - containerRect.top
      };
    });
  };

  // Re-cache on mount, resize, and text updates (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;

    const timer = setTimeout(cachePositions, 250);
    window.addEventListener('resize', cachePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', cachePositions);
    };
  }, [containerRef, label, segments, isMobile]);

  // Run animation only when mouse moves, completely layout-thrashing free (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;

    let frameId: number;
    const loop = () => {
      if (!containerRef?.current) {
        frameId = requestAnimationFrame(loop);
        return;
      }
      
      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
        frameId = requestAnimationFrame(loop);
        return;
      }
      
      lastPositionRef.current = { x, y };

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;

        const pos = letterPositionsRef.current[index];
        if (!pos) return;

        const distance = calculateDistance(x, y, pos.centerX, pos.centerY);

        if (distance >= radius) {
          if (letterRef.style.fontVariationSettings !== fromFontVariationSettings) {
            letterRef.style.fontVariationSettings = fromFontVariationSettings;
          }
          return;
        }

        const falloffValue = calculateFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(', ');

        interpolatedSettingsRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;
      });

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [containerRef, radius, falloff, parsedSettings, fromFontVariationSettings, isMobile]);

  // If on mobile viewport, render static simple HTML elements for maximum performance
  if (isMobile) {
    return (
      <span
        ref={ref}
        style={{
          display: 'inline',
          fontFamily: 'var(--font-geist-sans), sans-serif',
          ...style
        }}
        className={className}
        {...interactionProps}
        {...restProps}
      >
        {segments ? (
          segments.map((segment) => (
            <span key={`${segment.className || 'segment'}-${segment.text}`} className={segment.className}>
              {segment.text}
            </span>
          ))
        ) : (
          label
        )}
      </span>
    );
  }

  const words = label.split(' ');
  const segmentWords = segments?.flatMap((segment, segmentIndex) =>
    segment.text.split(' ').map((word, wordIndex, wordsArray) => ({
      text: word,
      className: segment.className,
      needsSpace:
        segmentIndex < segments.length - 1 || wordIndex < wordsArray.length - 1
    }))
  );
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      style={{
        display: 'inline',
        fontFamily: '"Roboto Flex", sans-serif',
        ...style
      }}
      className={className}
      {...interactionProps}
      {...restProps}
    >
      {(segmentWords || words.map((word, wordIndex) => ({
        text: word,
        className: undefined,
        needsSpace: wordIndex < words.length - 1
      }))).map((word) => (
        <span key={`${word.className || 'word'}-${word.text}`} className={`inline-block whitespace-nowrap ${word.className || ''}`.trim()}>
          {word.text.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {word.needsSpace && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
