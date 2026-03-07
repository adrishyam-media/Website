"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ParallaxImage from "@/components/ui/ParallaxImage";
import AnimatedText from "@/components/ui/AnimatedText";
import MagneticButton from "@/components/ui/MagneticButton";


export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const counters = statsRef.current?.querySelectorAll(".stat-number");
      counters?.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0", 10);
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = Math.round(obj.value).toString();
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <ParallaxImage
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop"
            alt="Photographer at work"
            className="aspect-[4/5] rounded-sm"
            width={800}
            height={1000}
          />

          {/* Content */}
          <div>
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">About the Studio</p>

            <AnimatedText
              text="A Decade of Work. 500 Projects. Zero Shortcuts."
              as="h2"
              className="font-display text-2xl sm:text-4xl md:text-5xl text-cream leading-tight mb-6"
              splitBy="words"
            />

            <div className="space-y-4 text-cream/60 leading-relaxed mb-8">
              <p>
                Adrishyam Media was founded in Bengaluru in 2015 by a group of photographers
                and filmmakers who were tired of creative compromises. Today, we&apos;re a team of
                three — a lead photographer, a creative director, and a cinematographer — working
                together on every project from brief to final delivery.
              </p>
              <p>
                We shoot commercial campaigns, brand imagery, wedding films, and portrait sessions.
                Every project gets a detailed brief, a pre-shoot planning call, and a delivery
                timeline you can hold us to.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: 10, suffix: "+", label: "Years Experience" },
                { value: 500, suffix: "+", label: "Projects Completed" },
                { value: 200, suffix: "+", label: "Happy Clients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="stat-number font-display text-3xl md:text-4xl text-accent"
                      data-target={stat.value}
                    >
                      0
                    </span>
                    <span className="font-display text-2xl text-accent">{stat.suffix}</span>
                  </div>
                  <p className="text-cream/60 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <MagneticButton href="/about">Meet the Team</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
