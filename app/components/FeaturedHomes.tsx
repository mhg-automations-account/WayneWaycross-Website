import Link from "next/link";
import { featured, homes } from "../lib/homes";
import HomeCard from "./HomeCard";
import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

export default function FeaturedHomes() {
  const [lead, ...rest] = featured;
  return (
    <section id="featured" className="scroll-mt-24 bg-band px-4 pt-28 pb-28 sm:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end md:text-left">
        <div>
          <Reveal as="h2" className="display text-[clamp(2.6rem,5.5vw,4rem)]">
            Featured homes
          </Reveal>
          <Reveal as="p" delay={120} className="mt-4 text-lg text-muted">
            A few favorites from our lot, ready to tour today.
          </Reveal>
        </div>
        <Reveal delay={200}>
          <Link
            href="/homes"
            className="group inline-flex items-center gap-2 rounded-full border border-clay/30 bg-cream px-6 py-3 text-[15px] font-medium text-clay transition-colors hover:bg-clay hover:text-white"
          >
            View all {homes.length} homes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal delay={150} className="h-full sm:col-span-2 lg:row-span-2">
          <HomeCard home={lead} large sizes="(min-width: 640px) 600px, 100vw" />
        </Reveal>
        {rest.map((h, i) => (
          <Reveal key={h.slug} delay={250 + i * 110}>
            <HomeCard home={h} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
