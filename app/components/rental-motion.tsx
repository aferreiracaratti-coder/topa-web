"use client";

import { type ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function RentalMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scope = root.current;
    if (!scope) return;

    const heroCopy = scope.querySelector("[data-rental-hero-copy]");
    const heroMedia = scope.querySelector("[data-rental-hero-media]");
    const heroImage = scope.querySelector("[data-rental-hero-media] img");
    const cards = gsap.utils.toArray<HTMLElement>("[data-rental-card]", scope);
    const journey = gsap.utils.toArray<HTMLElement>("[data-rental-journey]", scope);

    gsap.fromTo(heroCopy, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" });
    gsap.fromTo(heroMedia, { autoAlpha: 0, y: 42, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, delay: 0.1, ease: "power3.out" });

    gsap.fromTo(heroImage, { scale: 1.08 }, {
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: heroMedia, start: "top 82%", end: "bottom top", scrub: true },
    });

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 86%",
        once: true,
        onEnter: () => {
          gsap.fromTo(card, { opacity: 0.35, y: 42, scale: 0.985 }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.64,
            delay: index * 0.04,
            ease: "power3.out",
          });
        },
      });
    });

    journey.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.fromTo(card, { opacity: 0.4, y: 28 }, {
          opacity: 1,
          y: -index * 6,
          duration: 0.58,
          ease: "power2.out",
        }),
      });
    });
  }, { scope: root });

  return <div ref={root} className="rental-motion-root">{children}</div>;
}
