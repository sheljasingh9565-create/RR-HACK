export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F6F1] text-[#171717]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 md:px-16">
        <div className="text-2xl font-bold tracking-tight">
          OPPORA
        </div>

        <button className="rounded-full border border-[#171717] px-5 py-2 text-sm font-medium transition hover:bg-[#171717] hover:text-white">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">

        <div className="mb-6 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
          Opportunity Intelligence for Students
        </div>

        <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
          From what you mean
          <br />
          <span className="text-[#6B5CFF]">to what fits.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
          Tell us what you’re trying to achieve.
          <br />
          OPPORA finds the opportunities that actually fit you.
        </p>

        {/* CTA */}
        <a
           href="/onboarding"
          className="mt-10 inline-block rounded-full bg-[#171717] px-8 py-4 text-base font-medium text-white shadow-lg transition hover:scale-105 hover:bg-[#333]"
          >
          Find My Opportunities →
        </a>

        {/* Small trust line */}
        <p className="mt-6 text-sm text-gray-500">
          Internships · Hackathons · Research · Competitions
        </p>

      </section>

      {/* Bottom message */}
      <section className="border-t border-black/10 px-6 py-16 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
          Stop searching. Start choosing.
        </p>
      </section>

    </main>
  );
}
