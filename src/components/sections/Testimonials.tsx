"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/ui/AnimatedText";
import { TESTIMONIALS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!quoteRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-dark-light overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">Testimonials</p>
        <AnimatedText
          text="What Our Clients Say"
          as="h2"
          className="font-display text-4xl md:text-5xl text-cream mb-16"
          splitBy="words"
        />

        <div ref={quoteRef} className="min-h-[200px]">
          <div className="font-display text-6xl text-accent/20 mb-4">&ldquo;</div>
          <p className="text-cream/80 text-lg md:text-xl leading-relaxed italic max-w-3xl mx-auto mb-8">
            {TESTIMONIALS[active].quote}
          </p>
          <p className="text-cream font-medium">{TESTIMONIALS[active].name}</p>
          <p className="text-accent text-sm uppercase tracking-widest mt-1">
            {TESTIMONIALS[active].project}
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex items-center justify-center w-11 h-11"
              aria-label={`Testimonial ${i + 1}`}
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === active ? "bg-accent w-8" : "bg-cream/20 hover:bg-cream/40 w-2"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
