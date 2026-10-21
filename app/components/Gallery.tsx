"use client";

import Image from "next/image";
import { useState } from "react";

/** Main photo with a thumbnail strip; every photo is self-hosted. */
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line bg-band">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${alt} (photo ${active + 1} of ${images.length})`}
          fill
          preload={active === 0}
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6" aria-label="More photos">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-pressed={i === active}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition-colors ${
                  i === active ? "border-clay" : "border-transparent hover:border-clay/40"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
