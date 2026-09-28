import { site } from "../lib/site";
import Reveal from "./Reveal";
import { ArrowRight, HouseIcon, Logo } from "./Icons";

export function CallToAction() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-32 text-center">
      <Reveal className="flex justify-center text-clay">
        <HouseIcon className="h-14 w-14" />
      </Reveal>
      <Reveal as="h2" delay={120} className="display mx-auto mt-6 max-w-2xl text-[clamp(2.6rem,5.5vw,4rem)]">
        Ready to find your way home?
      </Reveal>
      <Reveal as="p" delay={260} className="mt-6 text-lg text-muted">
        Visit our lot in {site.city}{" "}or give us a call. We&rsquo;d love to meet your family.
      </Reveal>
      <Reveal delay={400} className="mt-8 flex justify-center">
        <a
          href={site.phoneHref}
          className="group inline-flex items-center gap-2.5 rounded-full bg-clay px-8 py-3.5 text-[17px] font-medium text-white transition-colors hover:bg-clay-dark"
        >
          Call {site.phone}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const links = [
    { href: "#homes", label: "Homes" },
    { href: "#financing", label: "Financing" },
    { href: site.phoneHref, label: "Contact" },
    { href: site.facebook, label: "Facebook" },
  ];
  return (
    <footer className="border-t border-line bg-band px-6 py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 md:flex-row">
        <Logo />
        <ul className="flex flex-wrap justify-center gap-7 text-sm text-muted">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.fullName}
        </p>
      </div>
    </footer>
  );
}
