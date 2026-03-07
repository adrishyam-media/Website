"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import AnimatedText from "@/components/ui/AnimatedText";
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from "@/lib/constants";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".portfolio-item");
      if (items) {
        gsap.fromTo(
          items,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section className="py-16 md:py-32 bg-dark-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">Portfolio</p>
          <AnimatedText
            text="Selected Works"
            as="h2"
            className="font-display text-2xl sm:text-4xl md:text-6xl text-cream"
            splitBy="words"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat
                  ? "border-accent text-accent bg-accent/10"
                  : "border-white/10 text-cream/50 hover:border-accent/50 hover:text-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
        >
          {filtered.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="portfolio-item group relative overflow-hidden aspect-[4/5] bg-dark-card"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={item.width}
                height={item.height}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-accent text-xs uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <h3 className="font-display text-xl text-cream">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-accent uppercase tracking-widest text-sm border-b border-accent/30 pb-1 hover:border-accent transition-colors duration-300"
          >
            View All Projects <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
