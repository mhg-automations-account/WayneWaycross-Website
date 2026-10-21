import { CallToAction, Footer } from "../components/Closing";
import JsonLd, { breadcrumbSchema } from "../components/JsonLd";
import Nav from "../components/Nav";
import { pageMetadata } from "../lib/seo";
import { site } from "../lib/site";

export const metadata = pageMetadata({
  title: `Contact ${site.fullName} | Mobile Homes in Waycross, GA`,
  description: `Visit ${site.fullName} at ${site.address.street}, ${site.city} ${site.address.postalCode}, or call ${site.phone}.`,
  path: "/contact",
});

const team = [
  {
    name: "Joy Lee Adams",
    bio: "For the past five years, I have had the privilege of helping individuals and families find a place they can truly call home. One of my favorite parts of what I do is seeing the excitement on my customers’ faces when they find the home they love and can picture themselves making memories in for years to come. I take the time to listen, understand what you’re looking for, and help you find a home that fits your needs, wants, and budget. My goal is to help you find your forever home and make the experience as comfortable and enjoyable as possible.",
  },
  { name: "Christy Alanis", role: "Sales" },
  {
    name: "Jay Harvard",
    bio: "Jay brings over 30 years of experience in the manufacturing industry and a strong commitment to serving his customers with honesty, knowledge, and personal attention. His goal is to help every customer find a quality home that fits their needs, lifestyle, and budget.",
  },
  { name: "Nate James", role: "Sales" },
  { name: "Donovan McAtamney", role: "Sales" },
];

export default function ContactPage() {
  const { street, city, region, postalCode } = site.address;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${site.fullName}, ${street}, ${city}, ${region} ${postalCode}`)}&output=embed`;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <Nav />
      <main>
        <section id="top" className="bg-band px-4 pt-40 pb-16 text-center sm:px-6">
          <p className="text-sm font-medium tracking-wide text-clay uppercase">Contact us</p>
          <h1 className="display hero-in mt-4 text-[clamp(3rem,7vw,5.5rem)]">Local experts you can trust</h1>
          <p className="hero-in mx-auto mt-5 max-w-xl text-lg text-muted [animation-delay:150ms]">
            Our team is here to make your home-buying experience clear, comfortable, and personalized, from your first
            question to the day your home is delivered and set.
          </p>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2">
            <div>
              <h2 className="display text-[clamp(2.2rem,4vw,3rem)]">Visit us</h2>
              <address className="mt-6 space-y-4 text-lg not-italic text-muted">
                <p>
                  <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-clay">
                    {street}, {city}, {region} {postalCode}
                  </a>
                </p>
                <p>
                  <a href={site.phoneHref} className="font-medium text-clay hover:text-clay-dark">
                    {site.phone}
                  </a>
                </p>
                <dl className="grid max-w-xs grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                  {site.hoursText.map(([d, t]) => (
                    <div key={d} className="contents">
                      <dt className="font-medium text-ink">{d}</dt>
                      <dd>{t}</dd>
                    </div>
                  ))}
                </dl>
              </address>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[28px] border border-line bg-band">
              <iframe
                src={mapSrc}
                title={`Map to ${site.fullName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </section>

        <section className="bg-band px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="display text-[clamp(2.2rem,4vw,3rem)]">Meet the team</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <article key={m.name} className="rounded-3xl border border-line bg-cream p-7">
                  <h3 className="display text-[26px]">{m.name}</h3>
                  {"role" in m && <p className="mt-1 text-sm font-medium tracking-wide text-clay uppercase">{m.role}</p>}
                  {"bio" in m && <p className="mt-3 leading-relaxed text-muted">{m.bio}</p>}
                </article>
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
