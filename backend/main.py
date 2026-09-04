from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Profile
from supabase import create_client
from dotenv import load_dotenv
import os

from pathlib import Path

load_dotenv(Path(__file__).with_name(".env"))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_SECRET_KEY
)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "OPPORA Backend is running!"
    }


@app.post("/profile")
def create_profile(profile: Profile):
    return {
        "message": "Profile received successfully",
        "profile": profile
    }

@app.get("/opportunities/{opportunity_id}")
def get_opportunity(opportunity_id: str):
    response = (
        supabase
        .table("opportunities")
        .select("*")
        .eq("id", opportunity_id)
        .single()
        .execute()
    )

    return response.data

@app.post("/recommendations")
def get_recommendations(profile: Profile):

    # Get real opportunities from Supabase
    response = supabase.table("opportunities").select("*").execute()
    opportunities = response.data

    results = []

    student_skills = [skill.strip().lower() for skill in profile.skills]

    for opportunity in opportunities:

        required_skills = opportunity.get("required_skills") or []
        goals = opportunity.get("goals") or []

        # -------------------------
        # 1. SKILL MATCH
        # -------------------------
        matched_skills = []
        missing_skills = []

        for skill in required_skills:
            if skill.strip().lower() in student_skills:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

        if len(required_skills) > 0:
            skill_score = (len(matched_skills) / len(required_skills)) * 100
        else:
            skill_score = 100

        # -------------------------
        # 2. YEAR ELIGIBILITY
        # -------------------------
        min_year = opportunity.get("min_year")
        max_year = opportunity.get("max_year")

        year_eligible = True

        if min_year is not None and profile.year < min_year:
            year_eligible = False

        if max_year is not None and profile.year > max_year:
            year_eligible = False

        year_score = 100 if year_eligible else 0

        # -------------------------
        # 3. GOAL MATCH
        # -------------------------
        profile_goal = profile.goal.lower()

        goal_match = False

        for goal in goals:
            if profile_goal in goal.lower() or goal.lower() in profile_goal:
                goal_match = True
                break

        goal_score = 100 if goal_match else 50

        # -------------------------
        # 4. OVERALL FIT
        # -------------------------
        fit = (
            skill_score * 0.55
            + year_score * 0.25
            + goal_score * 0.20
        )

        fit = round(fit)

        # -------------------------
        # 5. STATUS
        # -------------------------
        if not year_eligible:
            status = "NOT ELIGIBLE"
            priority = "LOW"

        elif fit >= 80:
            status = "APPLY NOW"
            priority = "HIGH"

        elif fit >= 60:
            status = "PREPARE & APPLY"
            priority = "MEDIUM"

        else:
            status = "BUILD TOWARD"
            priority = "LOW"

        # -------------------------
        # 6. RESULT
        # -------------------------
        results.append({
            "id": opportunity.get("id"),
            "title": opportunity.get("title"),
            "organization": opportunity.get("organization"),
            "type": opportunity.get("type"),
            "domain": opportunity.get("domain"),
            "fit": fit,
            "readiness": round(skill_score),
            "status": status,
            "priority": priority,
            "matchedSkills": matched_skills,

            "missingSkills": missing_skills,
            "missing": (
             ", ".join(missing_skills)
               if missing_skills
              else "Nothing critical"
),
             "reason": (
    f"You match {len(matched_skills)} of "
    f"{len(required_skills)} key skills for this opportunity."
    if matched_skills
    else "Your current skills have limited overlap with this opportunity."
),
            "deadline": opportunity.get("deadline"),
            "nextAction": opportunity.get("next_action"),
            "officialUrl": opportunity.get("official_url")
        })

    # Highest-fit opportunities first
    results.sort(key=lambda x: x["fit"], reverse=True)

    return results