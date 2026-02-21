"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/ui/AnimatedText";
import ParallaxImage from "@/components/ui/ParallaxImage";
import MagneticButton from "@/components/ui/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MILESTONES = [
  { year: "2015", title: "The Beginning", description: "Founded in a small studio in downtown LA with a passion for visual storytelling." },
  { year: "2017", title: "First Major Campaign", description: "Landed our first national brand campaign, putting us on the map in the commercial world." },
  { year: "2019", title: "Studio Expansion", description: "Moved into our current 5,000 sq ft studio space with dedicated shooting areas and editing suites." },
  { year: "2021", title: "Video Division", description: "Launched our dedicated video production division, expanding into cinematic content." },
  { year: "2023", title: "International Work", description: "Started working with international clients, shooting in over 15 countries across 4 continents." },
  { year: "2025", title: "Award Recognition", description: "Received multiple industry awards for excellence in photography and visual storytelling." },
];

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Timeline items
      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      if (items) {
        gsap.fromTo(
          items,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Stats
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
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">About Us</p>
              <AnimatedText
                text="The People Behind the Lens"
                as="h1"
                className="font-display text-5xl md:text-6xl text-cream leading-tight mb-6"
                splitBy="words"
              />
              <div className="space-y-4 text-cream/60 leading-relaxed">
                <p>
                  We are a collective of passionate photographers, videographers, and creative
                  directors united by a singular belief: that every moment, every person, every brand
                  has a story worth telling beautifully.
                </p>
                <p>
                  Our studio was born from a simple idea — that great imagery isn&apos;t just about technical
                  perfection, but about capturing the authentic emotion and energy that makes each
                  subject unique.
                </p>
                <p>
                  From intimate portrait sessions to large-scale commercial productions, we bring the
                  same level of dedication, creativity, and attention to detail to every project.
                </p>
              </div>
            </div>

            <ParallaxImage
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=1000&fit=crop"
              alt="Studio portrait"
              className="aspect-[4/5] rounded-sm"
              width={800}
              height={1000}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-dark-light">
        <div ref={statsRef} className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 10, suffix: "+", label: "Years in Business" },
            { value: 500, suffix: "+", label: "Projects Delivered" },
            { value: 200, suffix: "+", label: "Happy Clients" },
            { value: 15, suffix: "", label: "Countries Visited" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="flex items-baseline justify-center gap-1">
                <span className="stat-number font-display text-5xl text-accent" data-target={stat.value}>
                  0
                </span>
                {stat.suffix && <span className="font-display text-3xl text-accent">{stat.suffix}</span>}
              </div>
              <p className="text-cream/60 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">The Team</p>
            <AnimatedText
              text="Meet Our Creatives"
              as="h2"
              className="font-display text-4xl md:text-5xl text-cream"
              splitBy="words"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Rivera",
                role: "Lead Photographer & Founder",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=face",
              },
              {
                name: "Maya Chen",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=700&fit=crop&crop=face",
              },
              {
                name: "Jordan Blake",
                role: "Cinematographer",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop&crop=face",
              },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-[3/4] overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={600}
                    height={700}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-xl text-cream">{member.name}</h3>
                <p className="text-accent text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-dark-light">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">Our Journey</p>
            <AnimatedText
              text="Milestones"
              as="h2"
              className="font-display text-4xl md:text-5xl text-cream"
              splitBy="words"
            />
          </div>

          <div ref={timelineRef} className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10" />

            {MILESTONES.map((milestone, i) => (
              <div
                key={milestone.year}
                className={`timeline-item relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-16 md:pl-0`}>
                  <span className="font-display text-3xl text-accent">{milestone.year}</span>
                  <h3 className="font-display text-xl text-cream mt-1">{milestone.title}</h3>
                  <p className="text-cream/50 text-sm mt-2">{milestone.description}</p>
                </div>
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 mt-2" />
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-dark text-center">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedText
            text="Ready to Work Together?"
            as="h2"
            className="font-display text-4xl md:text-5xl text-cream mb-6"
            splitBy="words"
          />
          <p className="text-cream/50 mb-10">
            We&apos;d love to hear about your project. Let&apos;s create something beautiful.
          </p>
          <MagneticButton href="/contact">Start a Conversation</MagneticButton>
        </div>
      </section>
    </>
  );
}
