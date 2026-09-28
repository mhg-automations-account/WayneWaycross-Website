"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Adds `is-visible` once the element scrolls into view. */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  variant = "reveal",
  children,
  id,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  variant?: "reveal" | "reveal-window";
  children: ReactNode;
  id?: string;
}) {
  const [ref, visible] = useInView<HTMLElement>(0.15);
  return (
    <Tag
      ref={ref}
      id={id}
      className={`${variant} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
