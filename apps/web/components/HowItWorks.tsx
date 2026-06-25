export default function HowItWorks() {
  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold text-center mb-12">
        How SecondChance Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="border rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">
            Create Your Profile
          </h3>

          <p>
            Showcase your skills, experience, and strengths
            regardless of career gaps.
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">
            Discover Opportunities
          </h3>

          <p>
            Browse jobs from employers who value talent,
            potential, and inclusive hiring.
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">
            Restart Your Career
          </h3>

          <p>
            Apply confidently and connect with employers
            ready to give talent a second chance.
          </p>
        </div>

      </div>
    </section>
  );
}