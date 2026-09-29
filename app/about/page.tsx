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
  title: `About ${site.fullName}: Mobile Home Dealer Since 1998`,
  description:
    "Serving the Florida Panhandle and South Alabama since 1998, Family Home Center of Crestview is the largest Live Oak Homes factory dealer in the area.",
  path: "/about",
});

const stats = [
  { value: "1998", label: "Serving Crestview since" },
  { value: "#1", label: "Live Oak Homes factory dealer in the Panhandle" },
  { value: "5★", label: "Award-winning customer service" },
];

const services = [
  {
    icon: HouseIcon,
    title: "Quality Live Oak Homes",
    body: "Manufactured homes that deliver quality, value and long-term comfort for new mobile home buyers.",
  },
  {
    icon: KeyIcon,
    title: "Financing for almost anyone",
    body: "We work with many different lenders to find a financing option that fits your family.",
  },
  {
    icon: TreeIcon,
    title: "Setup & land/home packages",
    body: "Home purchase, delivery and setup, permits, land and land improvements, all handled in one place.",
  },
  {
    icon: ShieldIcon,
    title: "Start-to-finish help",
    body: "Whatever you need when buying a manufactured or mobile home, we're with you from first visit to move-in day.",
  },
];

const covered = [
  "Need just a home",
  "Need it set up and permitted",
  "Need land or land improvements",
  "Need financing",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About Us", path: "/about" }])} />
      <Nav />
      <main>
        <section id="top" className="bg-band px-4 pt-40 pb-16 text-center sm:px-6">
          <p className="text-sm font-medium tracking-wide text-clay uppercase">About us</p>
          <h1 className="display hero-in mt-4 text-[clamp(3rem,7vw,5.5rem)]">A family-first home dealer</h1>
          <p className="hero-in mx-auto mt-5 max-w-xl text-lg text-muted [animation-delay:150ms]">
            Helping families across the Florida Panhandle and South Alabama find their way home since 1998.
          </p>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2">
            <Reveal variant="reveal-window" className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <Image
                src="https://familyhomecentercrestview.com/wp-content/uploads/2021/01/JWL_0375.jpg"
                alt="Inside a Live Oak home on the Family Home Center of Crestview lot"
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
                  We are Family Home Center of Crestview, the largest Live Oak Homes factory dealer and a trusted
                  manufactured home dealer in the panhandle of Florida.
                </p>
                <p>
                  We have the experience and knowledge needed to make the mobile home buying process smooth and easy.
                  We opened the Crestview location in 1998 to provide housing and meet the needs of customers in the
                  Florida Panhandle and South Alabama.
                </p>
                <p>
                  General manager Tim Roberson prides himself and his staff on outstanding customer service throughout
                  every sale. Our Crestview location is one of the top-selling stores and has won some of the most
                  prestigious customer service awards in the area, which lets us offer extra rebates and incentives to
                  our customers. It&rsquo;s just our way of saying thank you!
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
              What we do
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
              <p className="display text-[clamp(1.8rem,3vw,2.4rem)]">We have you covered.</p>
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
              <p className="mt-4 text-sm text-muted">See dealer for details.</p>
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
