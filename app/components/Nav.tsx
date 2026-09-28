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

/** Wide floating bar over the hero that eases into a compact pill once the hero is scrolled past. */
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
      className={`fixed inset-x-0 z-50 transition-all ${ease} ${compact ? "top-3 px-4" : "top-3 px-4 sm:top-5 sm:px-8 lg:px-[4.5vw]"}`}
    >
      <nav
        className={`mx-auto flex items-center justify-between border transition-all ${ease} ${
          compact
            ? "max-w-[820px] rounded-2xl border-[#ece4dc] bg-[#faf7f4]/90 py-2 pr-2 pl-3 shadow-[0_6px_30px_-12px_rgba(90,50,30,0.25)] backdrop-blur-xl"
            : "max-w-[1500px] rounded-2xl border-white/70 bg-[#faf6f2]/75 py-2.5 pr-2.5 pl-4 shadow-[0_8px_30px_-16px_rgba(90,50,30,0.3)] backdrop-blur-md sm:py-3.5 sm:pr-4 sm:pl-7"
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
