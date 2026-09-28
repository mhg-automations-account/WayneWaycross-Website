import { site } from "../lib/site";
import { Logo } from "./Icons";

const links = [
  { href: "#homes", label: "Homes" },
  { href: "#showcase", label: "Showcase" },
  { href: "#financing", label: "Financing" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4">
      <nav className="mx-auto flex max-w-[760px] items-center justify-between rounded-2xl border border-white/60 bg-[#faf6f2]/80 py-2 pr-2 pl-3 shadow-[0_6px_30px_-12px_rgba(90,50,30,0.25)] backdrop-blur-xl">
        <a href="#top" aria-label={`${site.fullName} home`}>
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 text-[15px] font-medium text-ink/85 md:flex">
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
