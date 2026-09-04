"use client";

import { useEffect, useState } from "react";
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

function calculateFit(
  profile: Profile,
  opportunity: (typeof opportunities)[number]
) {
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

  const skillScore =
    opportunity.requiredSkills.length > 0
      ? (matchedSkills.length / opportunity.requiredSkills.length) * 50
      : 0;

  const goalScore = opportunity.goals.includes(profile.goal) ? 30 : 10;

  const yearNumber = parseInt(profile.year.charAt(0)) || 1;

  const yearScore = yearNumber >= opportunity.minYear ? 20 : 0;

  const fit = Math.min(
    100,
    Math.round(skillScore + goalScore + yearScore)
  );

  const readiness = Math.min(
    100,
    Math.round(
      skillScore * 1.4 +
        (yearScore > 0 ? 20 : 0) +
        (profile.cgpa ? 10 : 0)
    )
  );

  let status = "BUILD TOWARD";
  let priority = "LOW";

  if (yearNumber < opportunity.minYear) {
    status = "NOT ELIGIBLE";
    priority = "LOW";
  } else if (fit >= 80 && readiness >= 70) {
    status = "APPLY NOW";
    priority = "HIGH";
  } else if (fit >= 65 && readiness >= 50) {
    status = "PREPARE & APPLY";
    priority = "MEDIUM";
  } else {
    status = "BUILD TOWARD";
    priority = "LOW";
  }

  const missingSkills = opportunity.requiredSkills.filter(
    (skill) =>
      !studentSkills.some(
        (studentSkill) =>
          studentSkill.includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(studentSkill)
      )
  );

  return {
    ...opportunity,
    fit,
    readiness,
    status,
    priority,
    missing:
      missingSkills.length > 0
        ? missingSkills.join(", ")
        : "Nothing critical",
    reason:
      matchedSkills.length > 0
        ? `You match ${matchedSkills.length} of ${opportunity.requiredSkills.length} key skills for this opportunity.`
        : "Your current skills have limited overlap with this opportunity.",
  };
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("opporaProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F1]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            No profile found
          </h1>

          <Link
            href="/onboarding"
            className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-white"
          >
            Create Profile →
          </Link>
        </div>
      </main>
    );
  }

  const rankedOpportunities = opportunities
    .map((opportunity) => calculateFit(profile, opportunity))
    .sort((a, b) => b.fit - a.fit);

  return (
    <main className="min-h-screen bg-[#F8F6F1] text-[#171717]">

      {/* Navbar */}

      <nav className="flex items-center justify-between border-b border-black/10 px-8 py-6 md:px-16">
        <div className="text-2xl font-bold">
          OPPORA
        </div>

        <div className="text-sm text-gray-600">
          {profile.name}
        </div>
      </nav>


      {/* Header */}

      <section className="mx-auto max-w-6xl px-6 py-12">

        <p className="text-sm font-medium uppercase tracking-widest text-[#6B5CFF]">
          Your opportunity intelligence
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          Opportunities picked for you.
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Based on your profile, skills and goal of{" "}
          <span className="font-medium text-black">
            {profile.goal}
          </span>
          .
        </p>


        {/* Profile Summary */}

        <div className="mt-8 grid gap-4 md:grid-cols-4">

          <InfoCard
            label="Year"
            value={profile.year}
          />

          <InfoCard
            label="Branch"
            value={profile.branch}
          />

          <InfoCard
            label="CGPA"
            value={profile.cgpa}
          />

          <InfoCard
            label="Goal"
            value={profile.goal}
          />

        </div>


        {/* Opportunities */}

        <div className="mt-14">

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="text-sm text-gray-500">
                OPPORA analysis
              </p>

              <h2 className="text-2xl font-semibold">
                Your top opportunities
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              {rankedOpportunities.length} matches
            </p>

          </div>


          <div className="grid gap-5">

            {rankedOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}


/* Profile Information Card */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 font-medium">
        {value || "Not provided"}
      </p>

    </div>
  );
}


/* Opportunity Card */

function OpportunityCard({
  opportunity,
}: {
  opportunity: {
    id: string;
    title: string;
    organization: string;
    type: string;
    fit: number;
    readiness: number;
    status: string;
    priority: string;
    reason: string;
    missing: string;
    deadline: string;
    nextAction: string;
  };
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 transition hover:shadow-lg">

      <div className="flex flex-col justify-between gap-6 md:flex-row">


        {/* Left Side */}

        <div className="flex-1">

          <div className="flex flex-wrap gap-2">

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
              {opportunity.type}
            </span>

            <span className="rounded-full bg-[#6B5CFF]/10 px-3 py-1 text-xs font-medium text-[#6B5CFF]">
              {opportunity.status}
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {opportunity.priority} PRIORITY
            </span>

          </div>


          <h3 className="mt-4 text-xl font-semibold">
            {opportunity.title}
          </h3>


          <p className="mt-1 text-sm text-gray-500">
            {opportunity.organization}
          </p>


          <p className="mt-5 text-sm leading-6 text-gray-600">
            {opportunity.reason}
          </p>


          {/* Missing Skills */}

          <div className="mt-4 rounded-xl bg-gray-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              What you're missing
            </p>

            <p className="mt-1 text-sm">
              {opportunity.missing}
            </p>

          </div>


          {/* Deadline + Next Action */}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            <div className="rounded-xl bg-gray-50 p-4">

              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Deadline
              </p>

              <p className="mt-1 text-sm font-medium">
                {opportunity.deadline}
              </p>

            </div>


            <div className="rounded-xl bg-purple-50 p-4">

              <p className="text-xs font-medium uppercase tracking-wider text-purple-600">
                Your next action
              </p>

              <p className="mt-1 text-sm">
                {opportunity.nextAction}
              </p>

            </div>

          </div>

        </div>


        {/* Scores */}

        <div className="flex gap-8 md:w-64 md:justify-end">

          <div className="text-center">

            <p className="text-3xl font-bold text-[#6B5CFF]">
              {opportunity.fit}%
            </p>

            <p className="mt-1 text-xs text-gray-500">
              FIT
            </p>

          </div>


          <div className="text-center">

            <p className="text-3xl font-bold">
              {opportunity.readiness}%
            </p>

            <p className="mt-1 text-xs text-gray-500">
              READINESS
            </p>

          </div>

        </div>

      </div>


      {/* Action */}

      <div className="mt-6 border-t border-black/10 pt-5">

        <Link
          href={`/opportunity/${opportunity.id}`}
          className="inline-block rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#333]"
        >
          View Opportunity →
        </Link>

      </div>

    </div>
  );
}