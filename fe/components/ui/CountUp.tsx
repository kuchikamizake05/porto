import { useInView } from 'motion/react';
import { useCallback, useEffect, useEffectEvent, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onUpdate?: (value: number) => void;
  onEnd?: () => void;
}

const getDecimalPlaces = (num: number): number => {
  const str = num.toString();
  if (str.includes('.')) {
    const decimals = str.split('.')[1];
    if (parseInt(decimals) !== 0) {
      return decimals.length;
    }
  }
  return 0;
};

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onUpdate,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const handleStart = useEffectEvent(() => onStart?.());
  const handleUpdate = useEffectEvent((value: number) => onUpdate?.(value));
  const handleEnd = useEffectEvent(() => onEnd?.());

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView && startWhen) {
      handleStart();

      let intervalId: number | undefined;
      const timeoutId = window.setTimeout(() => {
        const start = direction === 'down' ? to : from;
        const end = direction === 'down' ? from : to;
        const totalSteps = Math.max(1, Math.abs(Math.round(end - start)));
        const stepDirection = end >= start ? 1 : -1;
        const stepMs = (duration * 1000) / totalSteps;
        let current = Math.round(start);

        if (ref.current) {
          ref.current.textContent = formatValue(current);
        }

        handleUpdate(current);

        intervalId = window.setInterval(() => {
          current += stepDirection;

          const isDone = stepDirection > 0 ? current >= end : current <= end;
          const nextValue = isDone ? end : current;

          if (ref.current) {
            ref.current.textContent = formatValue(nextValue);
          }

          handleUpdate(nextValue);

          if (isDone) {
            window.clearInterval(intervalId);

            handleEnd();
          }
        }, stepMs);
      }, delay * 1000);

      return () => {
        window.clearTimeout(timeoutId);
        if (intervalId) {
          window.clearInterval(intervalId);
        }
      };
    }
  }, [isInView, startWhen, direction, from, to, delay, duration, formatValue]);

  return <span className={className} ref={ref} />;
}
