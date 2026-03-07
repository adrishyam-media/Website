"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "@/components/ui/Logo";

export default function Loader() {
  const [show, setShow] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("visited")) {
      setShow(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setShow(false);
        sessionStorage.setItem("visited", "true");
      },
    });

    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.value)}`;
        }
      },
    })
      .to(brandRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.5)
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.3,
      });
  }, []);

  if (!show) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9998] bg-dark flex flex-col items-center justify-center"
    >
      <div ref={brandRef} className="text-center opacity-0 translate-y-4">
        <Logo large />
      </div>
      <div className="absolute bottom-12 right-12">
        <span ref={counterRef} className="font-display text-8xl text-cream/10">
          0
        </span>
      </div>
    </div>
  );
}
