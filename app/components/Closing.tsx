import Image from "next/image";
import Link from "next/link";
import { site } from "../lib/site";
import Reveal from "./Reveal";
import { ArrowRight, Check, Logo, PhoneIcon } from "./Icons";
import QuoteForm from "./QuoteForm";

export function CallToAction() {
  const trust = ["Exclusive Live Oak Homes retailer", "Energy Star certified homes", "Local delivery & setup"];
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-4 py-24 md:py-32">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#141414]/80" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-white">
          <Reveal as="h2" className="display text-[clamp(2.8rem,6vw,4.75rem)]">
            Ready to find your way home?
          </Reveal>
          <Reveal as="p" delay={120} className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
            Tell us a little about what you&rsquo;re looking for and we&rsquo;ll put together a free
            quote. Or visit our lot in {site.city}{" "}&mdash; we&rsquo;d love to meet your family.
          </Reveal>
          <Reveal delay={240} className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/homes"
              className="group inline-flex items-center gap-2.5 rounded-full bg-clay px-8 py-4 text-[17px] font-medium text-white transition-colors hover:bg-clay-dark"
            >
              Browse Homes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/50 bg-white/15 px-8 py-4 text-[17px] font-medium text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              <PhoneIcon className="h-5 w-5" />
              Call {site.phone}
            </a>
          </Reveal>
          <Reveal as="ul" delay={360} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-white/90">
            {trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gold text-gold">
                  <Check className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal
          delay={200}
          className="rounded-[28px] border border-white/15 bg-white/[0.06] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-10"
        >
          <h3 className="display text-[clamp(1.8rem,3vw,2.4rem)] text-white">Get a Free Quote</h3>
          <div className="mt-7">
            <QuoteForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const links = [
    { href: "/homes", label: "Homes" },
    { href: "/specials", label: "Specials" },
    { href: "/upgrades", label: "Upgrades" },
    { href: "/about", label: "About Us" },
  ];
  const { street, city, region, postalCode } = site.address;
  const hours = site.hoursText.map(([d, t]) => `${d} ${t}`).join(" · ");
  return (
    <footer className="border-t border-line bg-band px-6 py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 md:flex-row">
        <Logo className="h-12" />
        <ul className="flex flex-wrap justify-center gap-7 text-sm text-muted">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="transition-colors hover:text-ink">
              Contact
            </Link>
          </li>
          <li>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              Facebook
            </a>
          </li>
        </ul>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.fullName}
        </p>
      </div>
      <address className="mx-auto mt-6 flex max-w-[1200px] flex-col items-center gap-1 border-t border-line pt-6 text-center text-sm text-muted not-italic md:flex-row md:justify-center md:gap-6">
        <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
          {street}, {city}, {region} {postalCode}
        </a>
        <a href={site.phoneHref} className="transition-colors hover:text-ink">
          {site.phone}
        </a>
        <span>{hours}</span>
      </address>
    </footer>
  );
}
