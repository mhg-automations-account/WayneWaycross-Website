import { CallToAction, Footer } from "./components/Closing";
import Features from "./components/Features";
import Financing from "./components/Financing";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import OurPromise from "./components/OurPromise";
import Showcase from "./components/Showcase";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <OurPromise />
        <Financing />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
