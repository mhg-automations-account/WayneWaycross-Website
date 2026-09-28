import Reveal from "./Reveal";
import { HouseIcon, ShieldIcon, TreeIcon } from "./Icons";

const brands = ["Live Oak Homes", "TownHomes", "Singlewide", "Doublewide", "Triplewide"];

const features = [
  {
    icon: HouseIcon,
    title: "Homes for every family",
    body: "Single, double and triple-wide floor plans from Live Oak Homes and TownHomes, ready to tour on our lot.",
  },
  {
    icon: ShieldIcon,
    title: "Built to last",
    body: "2×4 and 2×6 framing, ¾-inch floors, upgraded insulation, OSB end walls and nailed shingles.",
  },
  {
    icon: TreeIcon,
    title: "Land, handled",
    body: "Land/home packages, land clearing, well drilling, delivery and setup, all under one roof.",
  },
];

export default function Features() {
  return (
    <>
      <section className="bg-band py-14">
        <Reveal as="p" className="text-center text-xs tracking-wide text-muted">
          Proudly featuring
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-3 px-4">
          {brands.map((b) => (
            <span key={b} className="display text-xl text-ink/40">
              {b}
            </span>
          ))}
        </Reveal>
      </section>

      <section id="homes" className="scroll-mt-24 px-4 pt-28 pb-24 sm:px-6">
        <div className="mx-auto max-w-[1200px] text-center">
          <Reveal as="h2" className="display text-[clamp(2.6rem,5.5vw,4rem)]">
            A home you can grow into
          </Reveal>
          <Reveal as="p" delay={120} className="mt-4 text-lg text-muted">
            Your #1 choice for quality and savings in Northwest Florida.
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1200px] gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={200 + i * 140}>
              <article className="h-full rounded-[28px] border border-line bg-card p-8 text-left transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-[#f5f9ef] hover:shadow-[0_24px_50px_-24px_rgba(40,70,30,0.35)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush text-clay">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="display mt-7 text-[26px]">{f.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
