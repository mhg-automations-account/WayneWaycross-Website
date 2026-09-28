import Image from "next/image";
import Link from "next/link";
import { specs, type Home } from "../lib/homes";
import { ArrowRight } from "./Icons";

/** Photo card for a single home model; `large` fills a taller grid slot. */
export default function HomeCard({ home, large = false, sizes }: { home: Home; large?: boolean; sizes: string }) {
  return (
    <Link
      href={`/homes/${home.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(40,70,30,0.35)]"
    >
      <div className={`relative overflow-hidden bg-band aspect-[4/3] ${large ? "lg:aspect-auto lg:flex-1" : ""}`}>
        <Image
          src={home.photo}
          alt={`The ${home.name} home`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-end justify-between gap-3 p-5">
        <div>
          <h3 className={`display ${large ? "text-[34px]" : "text-[26px]"}`}>{home.name}</h3>
          <p className="mt-1 text-sm text-muted">{specs(home)}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blush text-clay transition-colors group-hover:bg-clay group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
