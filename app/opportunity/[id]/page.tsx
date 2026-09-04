"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { opportunities } from "@/data/opportunities";

type Profile = {
  name: string;
  year: string;
  branch: string;
  college: string;
  cgpa: string;
  skills: string;
  goal: string;
};

export default function OpportunityPage() {
  const params = useParams();

  const opportunity = opportunities.find(
    (item) => item.id === String(params.id)
  );

  if (!opportunity) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F1]">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Opportunity not found
          </h1>

          <Link
            href="/dashboard"
            className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-white"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  let profile: Profile = {
    name: "",
    year: "",
    branch: "",
    college: "",
    cgpa: "",
    skills: "",
    goal: "",
  };

  if (typeof window !== "undefined") {
    const savedProfile = localStorage.getItem("opporaProfile");

    if (savedProfile) {
      profile = JSON.parse(savedProfile);
    }
  }

  const studentSkills = profile.skills
    .toLowerCase()
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const matchedSkills = opportunity.requiredSkills.filter((skill) =>
    studentSkills.some(
      (studentSkill) =>
        studentSkill.includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(studentSkill)
    )
  );

  const missingSkills = opportunity.requiredSkills.filter(
    (skill) =>
      !studentSkills.some(
        (studentSkill) =>
          studentSkill.includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(studentSkill)
      )
  );

  const skillScore =
    opportunity.requiredSkills.length > 0
      ? (matchedSkills.length / opportunity.requiredSkills.length) * 50
      : 0;

  const goalMatches = opportunity.goals.includes(profile.goal);

  const goalScore = goalMatches ? 30 : 10;

  const yearNumber = parseInt(profile.year.charAt(0)) || 1;

  const yearEligible = yearNumber >= opportunity.minYear;

  const yearScore = yearEligible ? 20 : 0;

  const fit = Math.min(
    100,
    Math.round(skillScore + goalScore + yearScore)
  );

  const readiness = Math.min(
    100,
    Math.round(
      skillScore * 1.4 +
        (yearEligible ? 20 : 0) +
        (profile.cgpa ? 10 : 0)
    )
  );

  let status = "BUILD TOWARD";

  if (!yearEligible) {
    status = "NOT ELIGIBLE";
  } else if (fit >= 80 && readiness >= 70) {
    status = "APPLY NOW";
  } else if (fit >= 65) {
    status = "PREPARE & APPLY";
  }

  const eligibility = yearEligible
    ? "Likely Eligible"
    : "Not Eligible";

  return (
    <main className="min-h-screen bg-[#F8F6F1] px-6 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Back */}

        <Link
          href="/dashboard"
          className="mb-8 inline-block text-sm text-gray-600 hover:text-black"
        >
          ← Back to opportunities
        </Link>


        {/* Main Opportunity */}

        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <div className="mb-4 flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-700">
              {opportunity.type}
            </span>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
              {status}
            </span>

          </div>


          <h1 className="text-4xl font-bold text-gray-900">
            {opportunity.title}
          </h1>

          <p className="mt-2 text-gray-500">
            {opportunity.organization}
          </p>


          <p className="mt-5 leading-7 text-gray-600">
            {opportunity.eligibility}
          </p>


          {/* Scores */}

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-purple-50 p-5">

              <p className="text-sm text-gray-500">
                FIT
              </p>

              <p className="mt-1 text-4xl font-bold text-purple-600">
                {fit}%
              </p>

            </div>


            <div className="rounded-2xl bg-blue-50 p-5">

              <p className="text-sm text-gray-500">
                READINESS
              </p>

              <p className="mt-1 text-4xl font-bold text-blue-600">
                {readiness}%
              </p>

            </div>


            <div className="rounded-2xl bg-green-50 p-5">

              <p className="text-sm text-gray-500">
                ELIGIBILITY
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {eligibility}
              </p>

            </div>

          </div>


          {/* Deadline */}

          <div className="mt-6 rounded-2xl bg-gray-50 p-5">

            <p className="text-sm text-gray-500">
              APPLICATION DEADLINE
            </p>

            <p className="mt-1 font-semibold">
              {opportunity.deadline}
            </p>

          </div>

        </div>


        {/* Why This Fits */}

        <section className="mt-6 rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Why this fits you
          </h2>


          <div className="mt-5 space-y-3">

            <div className="rounded-xl bg-gray-50 p-4">

              {matchedSkills.length > 0
                ? `✅ You match ${matchedSkills.length} of ${opportunity.requiredSkills.length} required skills.`
                : "⚠️ Your current skills have limited overlap with this opportunity."}

            </div>


            <div className="rounded-xl bg-gray-50 p-4">

              {goalMatches
                ? "✅ This opportunity aligns with your stated goal."
                : "ℹ️ This opportunity is related to your profile, but it is not a direct match with your current goal."}

            </div>


            <div className="rounded-xl bg-gray-50 p-4">

              {yearEligible
                ? "✅ Your current academic year meets the basic requirement."
                : "❌ Your current academic year does not meet the basic requirement."}

            </div>

          </div>

        </section>


        {/* Skills Analysis */}

        <section className="mt-6 rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Skills analysis
          </h2>

          <p className="mt-2 text-gray-500">
            OPPORA compares your current skills with the opportunity requirements.
          </p>


          {/* Existing Skills */}

          {matchedSkills.length > 0 && (

            <div className="mt-6">

              <p className="mb-3 text-sm font-medium text-green-700">
                YOU ALREADY HAVE
              </p>

              <div className="flex flex-wrap gap-3">

                {matchedSkills.map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-green-100 px-4 py-2 text-green-700"
                  >
                    ✓ {skill}
                  </span>

                ))}

              </div>

            </div>

          )}


          {/* Missing Skills */}

          {missingSkills.length > 0 && (

            <div className="mt-6">

              <p className="mb-3 text-sm font-medium text-orange-700">
                WHAT YOU'RE MISSING
              </p>

              <div className="flex flex-wrap gap-3">

                {missingSkills.map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-orange-100 px-4 py-2 text-orange-700"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          )}


          {missingSkills.length === 0 && (

            <div className="mt-6 rounded-xl bg-green-50 p-4 text-green-700">
              🎉 You currently match all the listed skills.
            </div>

          )}

        </section>


        {/* Recommendation */}

        <section className="mt-6 rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            What OPPORA recommends
          </h2>


          <div className="mt-5 rounded-2xl bg-purple-50 p-6">

            <p className="text-lg font-semibold text-purple-700">
              {status}
            </p>


            <p className="mt-3 leading-7 text-gray-700">

              {status === "APPLY NOW" &&
                "This opportunity is a strong match for your current profile. You appear ready to pursue it."}

              {status === "PREPARE & APPLY" &&
                "This opportunity is a good match, but strengthening your missing skills could improve your readiness before applying."}

              {status === "BUILD TOWARD" &&
                "This opportunity may be valuable for your longer-term goals. Focus on the missing skills and experience first."}

              {status === "NOT ELIGIBLE" &&
                "You currently do not meet the basic academic requirement for this opportunity."}

            </p>

          </div>

        </section>


        {/* Next Action */}

        <section className="mt-6 rounded-3xl bg-black p-8 text-white">

          <p className="text-sm uppercase tracking-widest text-purple-300">
            Your next action
          </p>


          <h2 className="mt-3 text-2xl font-bold">
            {opportunity.nextAction}
          </h2>


          <p className="mt-3 leading-7 text-gray-300">
            OPPORA uses your current profile and identified skill gaps
            to suggest a practical next step.
          </p>


          <button className="mt-6 rounded-full bg-white px-7 py-3 font-semibold text-black hover:bg-gray-200">
            Start Preparing →
          </button>

        </section>


        {/* Apply */}

        <div className="mt-8 text-center">

          <a
            href={opportunity.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block rounded-full px-10 py-4 text-lg font-semibold text-white shadow-lg ${
              yearEligible
                ? "bg-[#6c5ce7] hover:bg-[#5b4bd6]"
                : "pointer-events-none cursor-not-allowed bg-gray-400"
            }`}
          >
            {yearEligible
              ? "Apply for Opportunity →"
              : "Not Eligible"}
          </a>

        </div>


        <p className="mt-5 text-center text-sm text-gray-400">
          Opportunity ID: {opportunity.id}
        </p>

      </div>

    </main>
  );
}