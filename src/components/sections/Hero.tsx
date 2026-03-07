"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AnimatedText from "@/components/ui/AnimatedText";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 10, duration: 1.5, repeat: -1, yoyo: true, ease: "power2.inOut", delay: 2 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark"
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/30 to-dark" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <p className="text-accent uppercase tracking-[0.4em] text-sm mb-6 animate-fade-in">
          Bengaluru · Photography & Film
        </p>

        <AnimatedText
          text="Premium Photography & Film for Brands and Weddings That Demand the Best"
          as="h1"
          className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.1] mb-8"
          splitBy="words"
        />

        <AnimatedText
          text="Commercial campaigns, wedding films, and brand imagery — crafted in Bengaluru and delivered worldwide."
          as="p"
          className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto mb-12"
          delay={0.5}
          splitBy="words"
        />

        <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
          <MagneticButton href="/portfolio">Explore Our Portfolio</MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-cream/60 uppercase tracking-widest text-xs">Scroll</span>
        <div className="w-[1px] h-8 bg-cream/20" />
      </div>
    </section>
  );
}
