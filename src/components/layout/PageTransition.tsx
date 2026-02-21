"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.set(overlayRef.current, { scaleY: 1 })
        .to(overlayRef.current, {
          scaleY: 0,
          duration: 0.6,
          ease: "power4.inOut",
          transformOrigin: "top",
        })
        .fromTo(
          containerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-dark pointer-events-none origin-top"
        style={{ transform: "scaleY(0)" }}
      />
      <div ref={containerRef}>{children}</div>
    </>
  );
}
