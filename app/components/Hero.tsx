"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "../lib/site";
import { ArrowRight } from "./Icons";

/** Full-bleed hero with a slow parallax photo and lagging headline. */
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
        <Image
          src="/hero.jpg"
          alt="Living room of a Live Oak model home at Wayne Frier Home Center of Waycross"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Wash into the page colour, keeping the headline legible over the photo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-b from-transparent via-cream/75 to-cream" />

      <div
        ref={content}
        className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-[14vh] text-center will-change-transform"
      >
        <h1 className="display hero-in text-[clamp(3.2rem,9vw,6.5rem)] text-ink">
          Wayne Frier of Waycross
        </h1>
        <p className="hero-in mt-4 max-w-md text-lg text-ink/85 [animation-delay:150ms]">
          Your trusted mobile home dealer in Waycross, GA. Quality homes, exceptional value, locally delivered.
        </p>
        <div className="hero-in mt-7 flex flex-col gap-3 [animation-delay:300ms] sm:flex-row">
          <Link
            href="/homes"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-clay px-9 py-4 text-[17px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(192,31,38,0.5)] transition-colors hover:bg-clay-dark"
          >
            Browse our homes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center rounded-full bg-cream/90 px-12 py-4 text-[17px] font-medium text-ink backdrop-blur transition-colors hover:bg-white"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
