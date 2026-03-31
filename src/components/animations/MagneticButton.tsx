"use client";

import { useRef, useCallback, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
}: MagneticButtonProps) {
  const btnRef   = useRef<HTMLButtonElement>(null);
  const rafRef   = useRef<number>(0);
  const posRef   = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12;
    posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12;
    if (btnRef.current) {
      btnRef.current.style.transform =
        `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    targetRef.current = {
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    };
  }, [strength]);

  const handleMouseEnter = useCallback(() => {
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    targetRef.current = { x: 0, y: 0 };
    // Spring back to zero
    const springBack = () => {
      posRef.current.x *= 0.8;
      posRef.current.y *= 0.8;
      if (btnRef.current) {
        btnRef.current.style.transform =
          `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      if (Math.abs(posRef.current.x) > 0.1 || Math.abs(posRef.current.y) > 0.1) {
        requestAnimationFrame(springBack);
      } else if (btnRef.current) {
        btnRef.current.style.transform = "translate(0px, 0px)";
      }
    };
    requestAnimationFrame(springBack);
  }, []);

  return (
    <button
      ref={btnRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ willChange: "transform" }}
    >
      {children}
    </button>
  );
}
