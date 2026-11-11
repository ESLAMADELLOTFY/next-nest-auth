import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChartIcon,
  HeadsetIcon,
} from "../icons";
import SolaraCard from "./SolaraCard";

export default function HeroSection() {
  return (
    <section className="relative flex h-full w-191.5 flex-col overflow-hidden bg-primary py-12 text-white top-6">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 85% 8%, rgba(120,180,150,0.28), transparent 60%), radial-gradient(ellipse 45% 40% at 70% 35%, rgba(80,140,255,0.12), transparent 55%)",
        }}
      />

      <div className="relative z-10 flex justify-center">
        <Link
          href="/support"
          className="inline-flex items-center gap-2 text-[20px] text-inter leading[150%] font-medium text-input transition hover:text-white"
        >
          <HeadsetIcon />
          Support
        </Link>
      </div>

      <div className="relative z-10 mt-24 flex flex-1 flex-col pl-13">
        <div className="relative mx-auto w-full max-w-131.25 overflow-hidden">
          <div className="relative rounded-[8px] bg-white p-10 pr-32 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <h2 className="max-w-68.75 text-[34px] font-bold leading-[1.15] text-primary text-inter">
              Reach financial goals faster
            </h2>
            <p className="mt-3 max-w-75 text-[18px] leading-relaxed text-muted text-inter">
              Use your Venus card around the world with no hidden fees. Hold,
              transfer and spend money.
            </p>
            <button
              type="button"
              className="mt-5 rounded-full bg-primary px-8 py-2 text-sm text-white transition text-[14px] font-medium hover:bg-primary-light"
            >
              Learn more
            </button>

            <div className="absolute -right-28 top-40 -translate-y-1/2 rotate-20">
              <div className="absolute -inset-8 rounded-full bg-[#6b8cff]/35 blur-2xl" />
              <div className="absolute -right-4 top-4 h-28 w-28 rounded-full bg-[#8b6bff]/30 blur-2xl" />
              <SolaraCard />
            </div>
          </div>

          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.18)] w-fit ml-auto mt-10 mr-25">
            <div className="flex size-10 items-center justify-center rounded-xl bg-surface text-primary">
              <ChartIcon />
            </div>
            <div className="pr-2">
              <p className="text-xs text-muted">Earnings</p>
              <p className="text-lg font-bold leading-tight text-foreground">
                $350.40
              </p>
            </div>
        </div>

        <div className="mt-25 flex flex-col items-center pb-2 text-center">
          <h3 className="text-[40px] font-bold leading-tight tracking-[-0.02em]">
            Introducing new features
          </h3>
          <p className="mt-4 max-w-105 text-[18px] leading-relaxed text-white/70">
            Analyzing previous trends ensures that businesses always make the
            right decision. And as the scale of the decision and it&apos;s
          </p>

          <div className="mt-8 flex items-center gap-5 text-white/80">
            <button
              type="button"
              aria-label="Previous slide"
              className="transition hover:text-white"
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex items-center gap-2.5" aria-label="Slide indicators">
              <span className="flex size-5 items-center justify-center rounded-full border border-white/70">
                <span className="size-1.5 rounded-full bg-white" />
              </span>
              <span className="size-1.5 rounded-full bg-white/45" />
              <span className="size-1.5 rounded-full bg-white/45" />
            </div>

            <button
              type="button"
              aria-label="Next slide"
              className="transition hover:text-white"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
