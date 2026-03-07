import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-dark flex flex-col items-center justify-center text-center px-6">
      <p className="text-accent uppercase tracking-[0.4em] text-sm mb-4">404</p>
      <h1 className="font-display text-6xl md:text-8xl text-cream mb-6">Not Found</h1>
      <p className="text-cream/50 max-w-md mb-10">
        This page doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 border border-accent text-accent uppercase tracking-widest text-sm hover:bg-accent hover:text-dark transition-colors duration-500"
      >
        Back to Home <span>&rarr;</span>
      </Link>
    </section>
  );
}
