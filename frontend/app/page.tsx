
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background decoration */}
      <div className="absolute -left-32 -top-32 size-96 rounded-full bg-secondary-light/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-primary/10 blur-3xl" />

      <section className="relative w-full max-w-3xl rounded-3xl border border-border bg-surface/80 px-8 py-16 text-center shadow-xl shadow-primary/5 backdrop-blur-xl sm:px-16">
        
        {/* Logo */}
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white shadow-lg shadow-primary/20">
          S
        </div>

        {/* Welcome badge */}
        <span className="mb-5 inline-flex rounded-full border border-secondary-light/40 bg-secondary-light/15 px-4 py-1.5 text-sm font-medium text-primary">
          Welcome to Solara
        </span>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Everything you need,
          <span className="mt-2 block text-primary">
            all in one place.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-muted-foreground">
          Welcome to your personal space.
          Sign in to access your account and
          enjoy a simple, seamless experience.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/signup"
            className="group inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-xl bg-primary px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl"
          >
            Get Started
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary transition-colors hover:text-primary-dark hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-14 border-t border-border pt-6">
          <p className="text-xs tracking-wide text-label">
            SIMPLE. SECURE. SEAMLESS.
          </p>
        </div>
      </section>
    </main>
  );
}
