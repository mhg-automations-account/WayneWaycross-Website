import Image from "next/image";
import { getReviews, googleReviewsUrl, googleWriteReviewUrl, type Review } from "../lib/reviews";
import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 text-gold ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < Math.round(rating) ? "" : "opacity-25"}`} aria-hidden="true">
          <path
            fill="currentColor"
            d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"
          />
        </svg>
      ))}
    </span>
  );
}

export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function ReviewCard({ review, hidden }: { review: Review; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[300px] shrink-0 flex-col rounded-3xl border border-line bg-white p-6 shadow-[0_10px_30px_-18px_rgba(40,70,30,0.35)] sm:w-[360px]"
    >
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <GoogleG className="h-5 w-5" />
      </div>
      <blockquote className="mt-4 line-clamp-5 flex-1 text-[15px] leading-relaxed text-ink/85">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-blush font-medium text-clay">
            {review.author.charAt(0).toUpperCase()}
          </span>
        )}
        <span>
          <span className="block text-sm font-medium text-ink">{review.author}</span>
          <span className="block text-xs text-muted">{fmtDate(review.date)}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** One infinitely scrolling row. Cards are rendered twice so the loop is seamless. */
function TickerRow({ reviews, reverse, seconds }: { reviews: Review[]; reverse?: boolean; seconds: number }) {
  return (
    <div className="ticker group flex overflow-hidden py-3">
      {[false, true].map((copy) => (
        <div
          key={String(copy)}
          aria-hidden={copy || undefined}
          className={`ticker-track flex shrink-0 gap-5 pr-5 ${reverse ? "ticker-reverse" : ""}`}
          style={{ animationDuration: `${seconds}s` }}
        >
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} hidden={copy} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default async function Reviews({ id = "reviews" }: { id?: string }) {
  const { reviews, rating, total } = await getReviews();
  if (reviews.length === 0) return null;

  const rows = reviews.length >= 8 ? [reviews.filter((_, i) => i % 2 === 0), reviews.filter((_, i) => i % 2 === 1)] : [reviews];

  return (
    <section id={id} className="scroll-mt-24 overflow-hidden py-24 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
        <Reveal as="p" className="text-sm font-medium tracking-wide text-clay uppercase">
          Reviews
        </Reveal>
        <Reveal as="h2" delay={100} className="display mt-4 text-[clamp(2.4rem,5vw,4rem)]">
          Families love their new homes
        </Reveal>
        <Reveal delay={200} className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-muted">
          <GoogleG className="h-5 w-5" />
          {rating !== null && <span className="font-medium text-ink">{rating.toFixed(1)}</span>}
          <Stars rating={rating ?? 5} />
          <span>{total ? `${total} reviews on Google` : "Real reviews from our Google listing"}</span>
        </Reveal>
      </div>

      <div className="ticker-mask mt-12 space-y-2">
        {rows.map((row, i) => (
          <TickerRow key={i} reviews={row} reverse={i === 1} seconds={Math.max(40, row.length * 7)} />
        ))}
      </div>

      <Reveal delay={150} className="mt-10 flex flex-wrap justify-center gap-4 px-4">
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:border-clay hover:text-clay"
        >
          Read all reviews on Google
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href={googleWriteReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-clay px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-clay-dark"
        >
          Leave a review
        </a>
      </Reveal>
    </section>
  );
}
