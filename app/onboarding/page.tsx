"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [profile, setProfile] = useState({
    name: "",
    year: "",
    branch: "",
    college: "",
    cgpa: "",
    skills: "",
    goal: "",
  });

  const updateProfile = (field: string, value: string) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

const nextStep = () => {
  if (step < 3) {
    setStep(step + 1);
  } else {
    localStorage.setItem("opporaProfile", JSON.stringify(profile));

    router.push("/dashboard");
  }
};

  return (
    <main className="min-h-screen bg-[#F8F6F1] text-[#171717]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 md:px-16">
        <div className="text-2xl font-bold tracking-tight">
          OPPORA
        </div>

        <div className="text-sm text-gray-500">
          Step {step} of 3
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="mx-auto mt-2 h-1 max-w-2xl overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-[#6B5CFF] transition-all duration-500"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Content */}
      <section className="mx-auto max-w-2xl px-6 py-16">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#6B5CFF]">
              Let's get to know you
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Tell us about yourself.
            </h1>

            <p className="mt-4 text-gray-600">
              This helps OPPORA understand where you are right now.
            </p>

            <div className="mt-10 space-y-5">

              <Input
                label="Your name"
                placeholder="e.g. Ritika"
                value={profile.name}
                onChange={(value) => updateProfile("name", value)}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Select
                  label="Current year"
                  value={profile.year}
                  options={[
                    "1st Year",
                    "2nd Year",
                    "3rd Year",
                    "4th Year",
                  ]}
                  onChange={(value) => updateProfile("year", value)}
                />

                <Input
                  label="Branch"
                  placeholder="e.g. CSE"
                  value={profile.branch}
                  onChange={(value) => updateProfile("branch", value)}
                />
              </div>

              <Input
                label="College / University"
                placeholder="e.g. IGDTUW"
                value={profile.college}
                onChange={(value) => updateProfile("college", value)}
              />

              <Input
                label="Current CGPA"
                placeholder="e.g. 9.5"
                value={profile.cgpa}
                onChange={(value) => updateProfile("cgpa", value)}
              />

            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#6B5CFF]">
              Your experience
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              What can you do?
            </h1>

            <p className="mt-4 text-gray-600">
              Add your skills. Don't worry if you don't have many yet.
            </p>

            <div className="mt-10">
              <label className="mb-2 block text-sm font-medium">
                Skills
              </label>

              <textarea
                value={profile.skills}
                onChange={(e) =>
                  updateProfile("skills", e.target.value)
                }
                placeholder="e.g. C++, Python, HTML, CSS, SQL, Git"
                rows={5}
                className="w-full resize-none rounded-2xl border border-black/10 bg-white p-4 outline-none transition focus:border-[#6B5CFF] focus:ring-2 focus:ring-[#6B5CFF]/20"
              />

              <p className="mt-2 text-sm text-gray-500">
                Separate your skills using commas.
              </p>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#6B5CFF]">
              Your goal
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              What are you looking for?
            </h1>

            <p className="mt-4 text-gray-600">
              Tell us what you want to achieve. OPPORA will use this to
              personalize your opportunities.
            </p>

            <div className="mt-10">
              <label className="mb-3 block text-sm font-medium">
                My main goal is...
              </label>

              <div className="grid gap-3">
                {[
                  "Find an internship",
                  "Participate in hackathons",
                  "Find research opportunities",
                  "Build my skills",
                  "Find scholarships",
                  "Explore career options",
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => updateProfile("goal", goal)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      profile.goal === goal
                        ? "border-[#6B5CFF] bg-[#6B5CFF]/10"
                        : "border-black/10 bg-white hover:border-[#6B5CFF]"
                    }`}
                  >
                    <span className="font-medium">{goal}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Button */}
        <button
          onClick={nextStep}
          className="mt-10 w-full rounded-full bg-[#171717] px-8 py-4 font-medium text-white transition hover:scale-[1.02] hover:bg-[#333]"
        >
          {step === 3 ? "Build My Opportunity Profile →" : "Continue →"}
        </button>

        {/* Back */}
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-black"
          >
            ← Go back
          </button>
        )}

      </section>
    </main>
  );
}


/* ---------- Reusable Input ---------- */

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-white p-4 outline-none transition focus:border-[#6B5CFF] focus:ring-2 focus:ring-[#6B5CFF]/20"
      />
    </div>
  );
}


/* ---------- Reusable Select ---------- */

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-black/10 bg-white p-4 outline-none focus:border-[#6B5CFF]"
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}