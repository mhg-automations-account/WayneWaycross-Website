import Link from "next/link";
import { clearance, specs } from "../lib/homes";
import { usd } from "../lib/site";
import HomeCard from "./HomeCard";
import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

/** Clearance homes marked down on the dealership's Specials list. */
export default function Specials() {
  return (
    <section id="specials" className="scroll-mt-24 bg-band px-4 pt-28 pb-32 sm:px-6">
      <div className="text-center">
        <Reveal as="h2" className="display text-[clamp(2.6rem,5.5vw,4rem)]">
          Quality homes at special pricing
        </Reveal>
        <Reveal as="p" delay={120} className="mt-4 text-lg text-muted">
          Available for a limited time. Call for current specials.
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-[880px] gap-6 sm:grid-cols-2">
        {clearance.map((h, i) => (
          <Reveal key={h.slug} delay={200 + i * 120}>
            <HomeCard home={h} sizes="(min-width: 640px) 430px, 100vw" />
            <p className="sr-only">
              {h.name}: {specs(h)}, marked down {usd(h.markdown!)}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-10 flex justify-center">
        <Link
          href="/specials"
          className="group inline-flex items-center gap-2 rounded-full border border-clay/30 bg-cream px-6 py-3 text-[15px] font-medium text-clay transition-colors hover:bg-clay hover:text-white"
        >
          See all specials
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
