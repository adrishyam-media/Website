"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import AnimatedText from "@/components/ui/AnimatedText";
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from "@/lib/constants";


export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".gallery-item");
      if (items) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [activeCategory]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      {/* Hero Banner */}
      <section className="pt-24 pb-10 md:pt-32 md:pb-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">Our Work</p>
          <AnimatedText
            text="Portfolio"
            as="h1"
            className="font-display text-3xl sm:text-5xl md:text-7xl text-cream"
            splitBy="chars"
          />
          <p className="text-cream/50 mt-6 max-w-xl mx-auto">
            Ten years of commercial campaigns, wedding films, portraits, and editorial work — selected from 500+ projects.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-dark-light">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
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

          {/* Masonry-like Grid */}
          <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="gallery-item break-inside-avoid group cursor-pointer relative overflow-hidden"
                onClick={() => setLightbox(index)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-accent text-xs uppercase tracking-widest mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-display text-lg text-cream">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-dark/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream/60 hover:text-cream text-3xl z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            &times;
          </button>

          <button
            className="absolute left-4 md:left-8 text-cream/60 hover:text-cream text-4xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((prev) => (prev! > 0 ? prev! - 1 : filtered.length - 1));
            }}
            aria-label="Previous"
          >
            &#8249;
          </button>

          <Image
            src={filtered[lightbox].image}
            alt={filtered[lightbox].title}
            width={1200}
            height={900}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 md:right-8 text-cream/60 hover:text-cream text-4xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((prev) => (prev! < filtered.length - 1 ? prev! + 1 : 0));
            }}
            aria-label="Next"
          >
            &#8250;
          </button>

          <div className="absolute bottom-6 text-center">
            <p className="text-accent text-xs uppercase tracking-widest mb-1">
              {filtered[lightbox].category}
            </p>
            <p className="font-display text-xl text-cream">{filtered[lightbox].title}</p>
          </div>
        </div>
      )}
    </>
  );
}
