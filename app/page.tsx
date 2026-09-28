import { CallToAction, Footer } from "./components/Closing";
import FeaturedHomes from "./components/FeaturedHomes";
import Features from "./components/Features";
import Financing from "./components/Financing";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import OurPromise from "./components/OurPromise";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <FeaturedHomes />
        <OurPromise />
        <Financing />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
