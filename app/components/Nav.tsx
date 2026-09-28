"use client";

import { useEffect, useState } from "react";
import { site } from "../lib/site";
import { Logo } from "./Icons";

const links = [
  { href: "#homes", label: "Homes" },
  { href: "#showcase", label: "Showcase" },
  { href: "#financing", label: "Financing" },
];

const ease = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

/** Full-width bar over the hero that eases into a floating pill once the hero is scrolled past. */
export default function Nav() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const threshold = (hero?.offsetHeight ?? window.innerHeight) - 90;
      setCompact(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all ${ease} ${compact ? "top-3 px-4 sm:top-4" : "top-0 px-0"}`}
    >
      <nav
        className={`mx-auto flex items-center justify-between border transition-all ${ease} ${
          compact
            ? "max-w-[760px] rounded-2xl border-white/60 bg-[#faf6f2]/80 py-2 pr-2 pl-3 shadow-[0_6px_30px_-12px_rgba(90,50,30,0.25)] backdrop-blur-xl"
            : "max-w-[100vw] rounded-none border-transparent border-b-white/30 bg-[#faf6f2]/15 py-4 pr-4 pl-5 shadow-none backdrop-blur-sm sm:pr-8 sm:pl-10"
        }`}
      >
        <a href="#top" aria-label={`${site.fullName} home`}>
          <Logo />
        </a>
        <ul
          className={`hidden items-center text-[15px] font-medium text-ink/85 transition-all md:flex ${ease} ${
            compact ? "gap-8" : "gap-12"
          }`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-clay">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={site.phoneHref}
          className="rounded-full bg-clay px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay-dark"
        >
          <span className="sm:hidden">Call us</span>
          <span className="hidden sm:inline">Call {site.phone}</span>
        </a>
      </nav>
    </header>
  );
}
