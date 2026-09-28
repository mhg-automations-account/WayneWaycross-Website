"use client";

import { useEffect, useRef } from "react";
import { site } from "../lib/site";
import { ArrowRight } from "./Icons";
import Scene from "./Scene";

/** Full-bleed hero with a slow parallax background and lagging headline. */
export default function Hero() {
  const bg = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight * 1.2);
        if (bg.current) bg.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.00012})`;
        if (content.current) {
          content.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
          content.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div ref={bg} className="absolute inset-0 origin-top will-change-transform">
        <Scene className="h-full w-full" />
      </div>
      {/* Wash into the page colour */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-b from-transparent via-cream/60 to-cream" />

      <div
        ref={content}
        className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-[14vh] text-center will-change-transform"
      >
        <h1 className="display hero-in text-[clamp(3.2rem,9vw,6.5rem)] text-ink">
          Come Home to Crestview
        </h1>
        <p className="hero-in mt-4 max-w-md text-lg text-ink/85 [animation-delay:150ms]">
          Quality mobile homes, honest prices and a family that stands behind every sale.
        </p>
        <div className="hero-in mt-7 flex flex-col gap-3 [animation-delay:300ms] sm:flex-row">
          <a
            href="#homes"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-clay px-9 py-4 text-[17px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(162,79,59,0.6)] transition-colors hover:bg-clay-dark"
          >
            Browse our homes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center rounded-full bg-[#fbf7f3]/90 px-12 py-4 text-[17px] font-medium text-ink backdrop-blur transition-colors hover:bg-white"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
