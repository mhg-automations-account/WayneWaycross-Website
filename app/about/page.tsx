import Image from "next/image";
import JsonLd, { breadcrumbSchema } from "../components/JsonLd";
import { CallToAction, Footer } from "../components/Closing";
import { Check, HouseIcon, KeyIcon, ShieldIcon, TreeIcon } from "../components/Icons";
import Nav from "../components/Nav";
import OurPromise from "../components/OurPromise";
import Reveal from "../components/Reveal";
import Reviews from "../components/Reviews";
import { pageMetadata } from "../lib/seo";
import { site } from "../lib/site";

export const metadata = pageMetadata({
  title: `About ${site.fullName}: Mobile Home Dealer in Waycross, GA`,
  description:
    "Wayne Frier Home Center of Waycross is the exclusive Live Oak Homes retailer in Waycross, GA, one of the largest inventories of manufactured homes in the Southeast, and homes built right here in the Waycross area.",
  path: "/about",
});

const stats = [
  { value: "1972", label: "Wayne Frier Home Center brand established in Florida" },
  { value: "1997", label: "Year our Waycross location opened" },
  { value: "30+", label: "Years our leadership has been with the Wayne Frier Group" },
];

const services = [
  {
    icon: HouseIcon,
    title: "Floor plans",
    body: "From single-wide homes to spacious double- and triple-wide options, with smart layouts and designs built to support everyday life.",
  },
  {
    icon: KeyIcon,
    title: "Custom design options",
    body: "Customize finishes such as flooring, cabinetry, lighting and colors, along with select structural options.",
  },
  {
    icon: TreeIcon,
    title: "Delivery & setup",
    body: "Built in Waycross, sold in Waycross, with thousands saved in freight. We ship to Florida, Georgia and South Carolina.",
  },
  {
    icon: ShieldIcon,
    title: "Quality you can rely on",
    body: "Live Oak Homes meet and exceed the federal HUD code, and each home is inspected by a third-party inspector.",
  },
];

const covered = [
  "Exclusive Live Oak Homes retailer in Waycross",
  "Energy Star certified homes",
  "Homes built right here in the Waycross area",
  "Honest guidance, start to finish",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About Us", path: "/about" }])} />
      <Nav />
      <main>
        <section id="top" className="bg-band px-4 pt-40 pb-16 text-center sm:px-6">
          <p className="text-sm font-medium tracking-wide text-clay uppercase">About us</p>
          <h1 className="display hero-in mt-4 text-[clamp(3rem,7vw,5.5rem)]">Homes built right here in Waycross</h1>
          <p className="hero-in mx-auto mt-5 max-w-xl text-lg text-muted [animation-delay:150ms]">
            Unmatched selection, value and price. Our goal is 100% customer satisfaction.
          </p>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2">
            <Reveal variant="reveal-window" className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <Image
                src="/homes/arlington/0.jpg"
                alt="Inside a Live Oak home at Wayne Frier Home Center of Waycross"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </Reveal>
            <div>
              <Reveal as="h2" className="display text-[clamp(2.4rem,4.5vw,3.5rem)]">
                Who we are
              </Reveal>
              <Reveal delay={100} className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  The Wayne Frier Home Center brand was established in Florida in 1972, and our Waycross location
                  opened in 1997. Our leadership brings more than 30 years of affiliation with the Wayne Frier Group
                  and has served customers at this location since 2002.
                </p>
                <p>
                  As an exclusive Live Oak Homes dealership, {site.fullName} offers one of the largest inventories of
                  manufactured homes in the Southeast. Our homes are built right here in the Waycross area, helping
                  local customers save thousands of dollars in freight costs. Built in Waycross and sold in
                  Waycross, that local connection delivers real value.
                </p>
                <p>
                  Having the manufacturing facilities nearby also benefits our customers when it comes to service and
                  support. Our experienced sales team, including members with more than 18 years in the industry, is
                  here to answer questions, explain options, and help you find the right home for your needs and
                  budget.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal as="dl" delay={150} className="mx-auto mt-20 grid max-w-[1200px] gap-5 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-3xl border border-line bg-card px-6 py-8 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="display text-5xl text-clay">{s.value}</dd>
                <dd className="mt-2 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </Reveal>
        </section>

        <section className="bg-band px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-[1200px]">
            <Reveal as="h2" className="display text-center text-[clamp(2.4rem,4.5vw,3.5rem)]">
              What we offer
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 90} className="rounded-3xl border border-line bg-cream p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-blush text-clay">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-medium text-ink">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} className="mt-14 text-center">
              <p className="display text-[clamp(1.8rem,3vw,2.4rem)]">Why Wayne Frier of Waycross</p>
              <ul className="mt-6 flex flex-wrap justify-center gap-3">
                {covered.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-ink/85"
                  >
                    <Check className="h-4 w-4 text-clay" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <OurPromise />
        <Reviews />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
