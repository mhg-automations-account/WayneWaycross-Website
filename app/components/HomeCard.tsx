import Image from "next/image";
import Link from "next/link";
import { cover, homeAlt, specs, type Home } from "../lib/homes";
import { usd } from "../lib/site";
import { ArrowRight } from "./Icons";

/**
 * Photo card for a single home model; `large` fills a taller grid slot.
 * `heading` keeps the outline valid: h3 under a section's h2, h2 when the grid sits straight under the page's h1.
 */
export default function HomeCard({
  home,
  large = false,
  sizes,
  heading: Heading = "h3",
}: {
  home: Home;
  large?: boolean;
  sizes: string;
  heading?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/homes/${home.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(20,20,20,0.35)]"
    >
      <div className={`relative overflow-hidden bg-band aspect-[4/3] ${large ? "lg:aspect-auto lg:flex-1" : ""}`}>
        <Image
          src={cover(home)}
          alt={homeAlt(home)}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {home.onLot && (
          <span className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-clay shadow">
            Available on Lot
          </span>
        )}
        {home.markdown && (
          <span className="absolute top-3 left-3 rounded-full bg-clay px-3 py-1 text-xs font-semibold text-white shadow">
            Marked down {usd(home.markdown)}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between gap-3 p-5">
        <div>
          <p className="text-xs font-medium tracking-wide text-clay uppercase">{home.section ?? home.series[0] ?? "Manufactured home"}</p>
          <Heading className={`display ${large ? "text-[34px]" : "text-[26px]"}`}>{home.name}</Heading>
          <p className="mt-1 text-sm text-muted">{specs(home)}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blush text-clay transition-colors group-hover:bg-clay group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
