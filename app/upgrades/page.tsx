import { CallToAction, Footer } from "../components/Closing";
import { Check } from "../components/Icons";
import JsonLd, { breadcrumbSchema } from "../components/JsonLd";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import { pageMetadata } from "../lib/seo";
import { site } from "../lib/site";

export const metadata = pageMetadata({
  title: `Mobile Home Upgrades & Construction | ${site.fullName}`,
  description: `Premium kitchen, bathroom, exterior and energy-efficiency upgrades for Live Oak Homes at ${site.fullName} in ${site.city}.`,
  path: "/upgrades",
});

const groups = [
  {
    title: "Kitchen",
    items: [
      "High-Arch Metal Faucets",
      "Oversized Kitchen Farm Sink",
      "Wall Ovens and Microwaves",
      "Over-the-Range Built-in Microwave",
      "Smooth-Top Kitchen Ranges",
      "Stainless Steel Range Hood",
      "Spacious Granite Island Countertops",
      "Real Hardwood Cabinet Doors",
    ],
  },
  {
    title: "Bathroom",
    items: [
      "Wood-Plank Ceramic Tile",
      "Glass Subway Tile Backsplash",
      "Stone Step Entry for Garden Tub",
      "Customized Cabinetry",
      "Porcelain Sinks with Metal Faucets",
      "Ceramic Tile Sit-Down Showers",
      "Rainforest Shower Head",
    ],
  },
  {
    title: "Around the home",
    items: [
      "Recessed LED Lighting",
      "Knockdown Textured Ceilings",
      "Tape and Texture Walls",
      "Nine-Foot Ceilings",
      "Atrium Doors",
      "Shiplap Accent Walls",
      "Dining Room and Kitchen Tray Ceilings",
    ],
  },
  {
    title: "Windows and insulation",
    items: [
      "Low-E Insulated Windows",
      "Transom Windows",
      "R-30 Blown Insulation",
      "R-19 Sidewall Insulation",
      "R-22 Floor Insulation",
    ],
  },
  {
    title: "Exterior features",
    items: ["Deluxe Exterior Siding Packages", "Galvanized Metal Roof", "Sliding Glass Doors", "Southern-Style Porches"],
  },
];

export default function UpgradesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Upgrades", path: "/upgrades" }])} />
      <Nav />
      <main>
        <section id="top" className="bg-band px-4 pt-40 pb-16 text-center sm:px-6">
          <p className="text-sm font-medium tracking-wide text-clay uppercase">Unmatched upgrades</p>
          <h1 className="display hero-in mt-4 text-[clamp(3rem,7vw,5.5rem)]">Premium features and upgrades</h1>
          <p className="hero-in mx-auto mt-5 max-w-xl text-lg text-muted [animation-delay:150ms]">
            We offer a wide range of premium upgrades so you can make your home uniquely yours. Choose features to
            personalize your comfort and style in every corner of your home.
          </p>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g, i) => (
              <Reveal key={g.title} delay={i * 80} className="rounded-3xl border border-line bg-card p-8">
                <h2 className="display text-[28px]">{g.title}</h2>
                <ul className="mt-5 space-y-3">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-muted">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-clay" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
