"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";


interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  splitBy?: "chars" | "words" | "lines";
}

export default function AnimatedText({
  text,
  className = "",
  as: Tag = "p",
  delay = 0,
  splitBy = "words",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const items = el.querySelectorAll(".split-item");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: splitBy === "chars" ? 0.02 : 0.08,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [text, delay, splitBy]);

  const items = splitBy === "chars" ? text.split("") : text.split(" ");

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={`overflow-hidden ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="split-item inline-block opacity-0" style={{ marginRight: splitBy === "chars" ? 0 : "0.3em" }}>
          {item === " " ? "\u00A0" : item}
        </span>
      ))}
    </Tag>
  );
}
