import type { Metadata } from "next";
import { CallToAction, Footer } from "../components/Closing";
import HomesBrowser from "../components/HomesBrowser";
import Nav from "../components/Nav";
import { homes } from "../lib/homes";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: `Our Homes | ${site.fullName}`,
  description: `Browse ${homes.length} single and multi-section mobile home models on our lot in Crestview, Florida.`,
};

export default function HomesPage() {
  return (
    <>
      <Nav />
      <main>
        <section id="top" className="bg-band px-4 pt-40 pb-16 text-center sm:px-6">
          <p className="text-sm font-medium tracking-wide text-clay uppercase">Our homes</p>
          <h1 className="display hero-in mt-4 text-[clamp(3rem,7vw,5.5rem)]">Find your floor plan</h1>
          <p className="hero-in mx-auto mt-5 max-w-xl text-lg text-muted [animation-delay:150ms]">
            {homes.length} models from cozy one-bedrooms to five-bedroom family homes. Come walk through any of them on
            our lot in {site.city}.
          </p>
        </section>

        <section className="px-4 pt-10 pb-8 sm:px-6">
          <div className="mx-auto max-w-[1200px]">
            <HomesBrowser />
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
