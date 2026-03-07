"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.body.style.cursor = "";
      return;
    }

    document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animate);
    };

    const onMouseEnterHoverable = () => {
      cursor.classList.add("scale-[2.5]");
      cursor.classList.add("border-accent");
    };

    const onMouseLeaveHoverable = () => {
      cursor.classList.remove("scale-[2.5]");
      cursor.classList.remove("border-accent");
    };

    document.addEventListener("mousemove", onMouseMove);
    const rafId = requestAnimationFrame(animate);

    const hoverables = document.querySelectorAll("a, button, [data-cursor-hover]");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterHoverable);
      el.addEventListener("mouseleave", onMouseLeaveHoverable);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHoverable);
        el.removeEventListener("mouseleave", onMouseLeaveHoverable);
      });
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border border-cream/40 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hidden md:block mix-blend-difference"
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 bg-cream rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
