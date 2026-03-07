"use client";

import AnimatedText from "@/components/ui/AnimatedText";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTA() {
  return (
    <section className="py-20 md:py-40 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedText
          text="Ready to Book? Let's Talk."
          as="h2"
          className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-cream leading-tight mb-8"
          splitBy="words"
        />

        <p className="text-cream/50 text-lg max-w-xl mx-auto mb-12">
          Tell us about your project and we&apos;ll come back with a clear proposal, a timeline, and a quote. No vague estimates. No surprise costs.
        </p>

        <MagneticButton href="/contact">Start a Conversation</MagneticButton>
      </div>
    </section>
  );
}
