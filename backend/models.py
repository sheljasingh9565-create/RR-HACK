from pydantic import BaseModel
from typing import List


class Profile(BaseModel):
    name: str
    year: int
    branch: str
    college: str
    cgpa: float
    skills: List[str]
    goal: str