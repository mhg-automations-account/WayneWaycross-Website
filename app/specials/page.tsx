import { CallToAction, Footer } from "../components/Closing";
import HomeCard from "../components/HomeCard";
import JsonLd, { breadcrumbSchema } from "../components/JsonLd";
import Nav from "../components/Nav";
import { clearance, specs } from "../lib/homes";
import { pageMetadata } from "../lib/seo";
import { site, usd } from "../lib/site";

export const metadata = pageMetadata({
  title: `Mobile Home Specials & Clearance Homes | ${site.fullName}`,
  description: `Clearance mobile homes at special pricing at ${site.fullName} in ${site.city}. Call ${site.phone} for current specials.`,
  path: "/specials",
});

export default function SpecialsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Specials", path: "/specials" }])} />
      <Nav />
      <main>
        <section id="top" className="bg-band px-4 pt-40 pb-16 text-center sm:px-6">
          <p className="text-sm font-medium tracking-wide text-clay uppercase">Available for a limited time</p>
          <h1 className="display hero-in mt-4 text-[clamp(3rem,7vw,5.5rem)]">Quality homes at special pricing</h1>
          <p className="hero-in mx-auto mt-5 max-w-xl text-lg text-muted [animation-delay:150ms]">
            Enjoy special pricing without compromising on craftsmanship. Call {site.phone} for current specials.
          </p>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="display text-[clamp(2.2rem,4vw,3rem)]">Clearance homes</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clearance.map((h) => (
                <div key={h.slug}>
                  <HomeCard home={h} heading="h3" sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
                  <p className="sr-only">
                    {specs(h)}, marked down {usd(h.markdown!)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
