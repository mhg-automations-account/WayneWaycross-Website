import Reveal from "./Reveal";
import { HouseIcon } from "./Icons";

export default function OurPromise() {
  return (
    <section className="px-4 py-28">
      <Reveal as="blockquote" className="display mx-auto max-w-3xl text-center text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.18]">
        &ldquo;We&rsquo;re not here to sell you just any house. We&rsquo;re here to help your family find the one it
        belongs in, and to be right down the road long after you move in.&rdquo;
      </Reveal>
      <Reveal delay={350} className="mt-9 flex items-center justify-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-blush text-clay">
          <HouseIcon className="h-5 w-5" />
        </span>
        <span className="text-left">
          <span className="block font-medium text-ink">The Family Homes team</span>
          <span className="block text-sm text-muted">Crestview, Florida</span>
        </span>
      </Reveal>
    </section>
  );
}
