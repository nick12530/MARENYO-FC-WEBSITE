import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string | number; // e.g. "40,000+", "100%", "14", "120+"
  duration?: number; // ms
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1800,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Parse raw value into numeric target and formatting suffix/prefix
  const valueStr = String(value);
  const numericMatch = valueStr.match(/[\d,]+/);
  const rawNumStr = numericMatch ? numericMatch[0].replace(/,/g, '') : '0';
  const targetNum = parseInt(rawNumStr, 10) || 0;

  const prefix = valueStr.substring(0, valueStr.indexOf(numericMatch?.[0] || ''));
  const suffix = valueStr.substring(
    (valueStr.indexOf(numericMatch?.[0] || '') + (numericMatch?.[0]?.length || 0))
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease out cubic formula for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetNum);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(targetNum);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, targetNum, duration]);

  const formattedNum = count.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {hasAnimated ? formattedNum : '0'}
      {suffix}
    </span>
  );
};
