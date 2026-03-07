"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = buttonRef.current;
      if (!el) return;

      const isTouchDevice = "ontouchstart" in window;
      if (isTouchDevice) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.4s ease-out";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  }, []);

  const baseClass = `group relative inline-flex items-center gap-2 px-8 py-4 border border-accent text-accent uppercase tracking-widest text-sm hover:bg-accent hover:text-dark transition-colors duration-500 ${className}`;

  if (href) {
    return (
      <Link
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        &rarr;
      </span>
    </button>
  );
}
