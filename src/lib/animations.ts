import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function fadeInUp(
  element: string | Element | Element[],
  options?: { delay?: number; duration?: number; y?: number; stagger?: number }
) {
  const { delay = 0, duration = 1, y = 60, stagger = 0 } = options || {};
  return gsap.fromTo(
    element,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: "power3.out",
    }
  );
}

export function fadeInUpScrollTrigger(
  element: string | Element | Element[],
  trigger?: string | Element,
  options?: { delay?: number; duration?: number; y?: number; stagger?: number; start?: string }
) {
  const { delay = 0, duration = 1, y = 60, stagger = 0.1, start = "top 85%" } = options || {};
  return gsap.fromTo(
    element,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger || element as string | Element,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function parallaxScroll(
  element: string | Element,
  speed: number = 0.3,
  trigger?: string | Element
) {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || element as string | Element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function countUp(
  element: Element,
  endValue: number,
  duration: number = 2
) {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

export function staggerReveal(
  elements: string | Element | Element[],
  trigger: string | Element,
  options?: { stagger?: number; duration?: number; y?: number }
) {
  const { stagger = 0.15, duration = 0.8, y = 40 } = options || {};
  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function scaleIn(
  element: string | Element | Element[],
  trigger?: string | Element
) {
  return gsap.fromTo(
    element,
    { scale: 0.9, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger || element as string | Element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}
