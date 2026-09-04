from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Profile
from opportunities import opportunities

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


@app.get("/opportunities")
def get_opportunities():
    return opportunities
@app.post("/recommendations")
def get_recommendations(profile: Profile):

    results = []

    for opportunity in opportunities:

        # Check required skills
        required_skills = opportunity["required_skills"]
        student_skills = [skill.lower() for skill in profile.skills]

        matched_skills = []
        missing_skills = []

        for skill in required_skills:
            if skill.lower() in student_skills:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

        # Calculate skill score
        skill_score = (len(matched_skills) / len(required_skills)) * 100

        # Year eligibility
        year_score = 100 if profile.year >= opportunity["min_year"] else 0

        # CGPA eligibility
        cgpa_score = 100 if profile.cgpa >= opportunity["min_cgpa"] else 0

        # Goal match
        goal_score = 100 if profile.goal.lower() == opportunity["goal"].lower() else 50

        # Final fit score
        fit = (
            skill_score * 0.5
            + year_score * 0.2
            + cgpa_score * 0.15
            + goal_score * 0.15
        )

        fit = round(fit)

        # Decide status
        if year_score == 0 or cgpa_score == 0:
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

        # Readiness
        readiness = round(skill_score)

        results.append({
            "title": opportunity["title"],
            "organization": opportunity["organization"],
            "fit": fit,
            "readiness": readiness,
            "status": status,
            "priority": priority,
            "matchedSkills": matched_skills,
            "missingSkills": missing_skills,
            "deadline": opportunity["deadline"],
            "nextAction": opportunity["next_action"],
            "officialUrl": opportunity["official_url"]
        })

    # Highest fit first
    results.sort(key=lambda x: x["fit"], reverse=True)

    return results
