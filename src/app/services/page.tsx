"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AnimatedText from "@/components/ui/AnimatedText";
import MagneticButton from "@/components/ui/MagneticButton";
import { SERVICES } from "@/lib/constants";


export default function ServicesPage() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".service-detail");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              delay: i * 0.05,
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-10 md:pt-32 md:pb-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">What We Offer</p>
          <AnimatedText
            text="Our Services"
            as="h1"
            className="font-display text-3xl sm:text-5xl md:text-7xl text-cream"
            splitBy="chars"
          />
          <p className="text-cream/50 mt-6 max-w-2xl mx-auto">
            Six services, one studio. We handle everything from the first brief to the final file — so you&apos;re not coordinating between a photographer, a videographer, and a separate editor.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 bg-dark">
        <div ref={cardsRef} className="max-w-7xl mx-auto px-6 space-y-24">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`service-detail grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={700}
                    height={500}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-accent/40 font-display text-4xl md:text-7xl">0{i + 1}</span>
                <h2 className="font-display text-3xl md:text-4xl text-cream mt-2 mb-4">
                  {service.title}
                </h2>
                <p className="text-cream/60 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 text-cream/60 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    Consultation & planning
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    Professional execution
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    Post-production & delivery
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-dark-light">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">How We Work</p>
            <AnimatedText
              text="Our Process"
              as="h2"
              className="font-display text-2xl sm:text-4xl md:text-5xl text-cream"
              splitBy="words"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "A 30-minute call to understand your goals, audience, and references before we commit to anything." },
              { step: "02", title: "Planning", description: "We build a detailed brief, pull reference images, confirm locations, and plan every detail before shoot day." },
              { step: "03", title: "Production", description: "The shoot itself — structured and efficient, with enough room to capture the unexpected." },
              { step: "04", title: "Delivery", description: "Color grading, retouching, and your final gallery or film — delivered on the date we agreed." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="font-display text-3xl md:text-5xl text-accent/20">{item.step}</span>
                <h3 className="font-display text-xl text-cream mt-2 mb-2">{item.title}</h3>
                <p className="text-cream/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-dark text-center">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedText
            text="Let's Discuss Your Project"
            as="h2"
            className="font-display text-2xl sm:text-4xl md:text-5xl text-cream mb-6"
            splitBy="words"
          />
          <p className="text-cream/50 mb-10">
            Tell us your project type, timeline, and budget. We&apos;ll respond within 24 hours with our availability and a rough outline of what we&apos;d propose.
          </p>
          <MagneticButton href="/contact">Get a Custom Quote</MagneticButton>
        </div>
      </section>
    </>
  );
}
