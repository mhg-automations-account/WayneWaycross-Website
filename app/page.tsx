import { pageMetadata } from "./lib/seo";
import { site } from "./lib/site";
import { CallToAction, Footer } from "./components/Closing";
import FeaturedHomes from "./components/FeaturedHomes";
import Features from "./components/Features";
import Financing from "./components/Financing";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";

export const metadata = pageMetadata({
  title: `Mobile Homes for Sale in Crestview, FL | ${site.fullName}`,
  description:
    "Shop single, double and triple-wide mobile homes from Live Oak Homes and TownHomes in Crestview, FL, with land/home packages, financing, delivery and setup.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <FeaturedHomes />
        <Reviews />
        <Financing />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
