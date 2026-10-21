import { pageMetadata } from "./lib/seo";
import { site } from "./lib/site";
import { CallToAction, Footer } from "./components/Closing";
import FeaturedHomes from "./components/FeaturedHomes";
import Features from "./components/Features";
import Specials from "./components/Specials";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";

export const metadata = pageMetadata({
  title: `Mobile Homes for Sale in Waycross, GA | ${site.fullName}`,
  description:
    "Shop singlewide, doublewide and triplewide Live Oak Homes in Waycross, GA. Exclusive Live Oak Homes retailer with energy-efficient homes, customization, delivery and setup.",
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
        <Specials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
