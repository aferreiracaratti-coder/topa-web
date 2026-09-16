"use client";

import { type ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SiteMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scope = root.current;
    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intro = scope.querySelector<HTMLElement>(
      ".topa-video-hero, .reservation-cta, .hero, .page-hero, .first-action-section",
    );

    if (intro) {
      const introContent = intro.querySelector<HTMLElement>(".container");
      if (introContent) {
        gsap.fromTo(
          introContent,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.62, ease: "power2.out" },
        );
      }

      const introMedia = intro.querySelector<HTMLElement>(".topa-video-hero-media");
      if (introMedia) {
        gsap.fromTo(
          introMedia,
          { scale: 1.06 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: intro,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }

    const sections = Array.from(scope.querySelectorAll<HTMLElement>("section")).filter(
      (section) => !section.closest(".rental-motion-root"),
    );

    sections.forEach((section) => {
      if (section === intro) return;
      const content = section.querySelector<HTMLElement>(":scope > .container");
      if (!content) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top 86%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            content,
            { opacity: 0.38, y: 24 },
            { opacity: 1, y: 0, duration: 0.56, ease: "power2.out", overwrite: "auto" },
          );
        },
      });
    });
  }, { scope: root });

  return <div ref={root} className="site-motion-root">{children}</div>;
}
