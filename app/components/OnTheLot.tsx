import Image from "next/image";
import Link from "next/link";
import { cover, getHome, specs } from "../lib/homes";
import { lot, LOT_UPDATED, type LotHome } from "../lib/lot";
import { ArrowRight, HouseIcon } from "./Icons";
import Reveal from "./Reveal";

const groups = ["Triple wide", "Double wide", "Single wide"] as const;

function LotCard({ item }: { item: LotHome }) {
  const home = item.slug ? getHome(item.slug) : undefined;
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-band">
        {home ? (
          <Image
            src={cover(home)}
            alt={`The ${home.name}, available on our lot`}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-clay/40">
            <HouseIcon className="h-10 w-10" />
          </span>
        )}
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-clay shadow">
          Available on Lot
        </span>
      </div>
      <div className="p-4">
        <h4 className="display text-[22px]">{item.name}</h4>
        <p className="mt-1 text-sm text-muted">
          {item.beds} bed · {item.baths} bath · {item.size} ft
        </p>
      </div>
    </>
  );
  const cls = "group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-card";
  return home ? (
    <Link
      href={`/homes/${home.slug}`}
      aria-label={`The ${home.name}: ${specs(home)}`}
      className={`${cls} transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(20,20,20,0.35)]`}
    >
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Home-page section listing every model currently on the lot, grouped by home type. */
export default function OnTheLot() {
  return (
    <section id="on-the-lot" className="scroll-mt-24 bg-band px-4 pt-28 pb-28 sm:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end md:text-left">
        <div>
          <Reveal as="h2" className="display text-[clamp(2.6rem,5.5vw,4rem)]">
            Available on our lot
          </Reveal>
          <Reveal as="p" delay={120} className="mt-4 max-w-xl text-lg text-muted">
            {lot.length} homes you can walk through today, as of {LOT_UPDATED}. We have more models than these, so ask
            us about anything you don&apos;t see.
          </Reveal>
        </div>
        <Reveal delay={200}>
          <Link
            href="/homes"
            className="group inline-flex items-center gap-2 rounded-full border border-clay/30 bg-cream px-6 py-3 text-[15px] font-medium text-clay transition-colors hover:bg-clay hover:text-white"
          >
            Browse all floor plans
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-[1200px] space-y-14">
        {groups.map((section) => {
          const items = lot.filter((h) => h.section === section);
          return (
            <div key={section}>
              <Reveal as="h3" className="display text-[clamp(1.8rem,3vw,2.4rem)]">
                {section}s <span className="text-base text-muted">({items.length})</span>
              </Reveal>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                {items.map((h, i) => (
                  <Reveal key={h.name} delay={(i % 4) * 80}>
                    <LotCard item={h} />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
