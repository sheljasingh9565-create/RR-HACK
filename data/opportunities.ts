export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  type: string;

  requiredSkills: string[];

  goals: string[];

  minYear: number;

  eligibility: string;

  deadline: string;

  officialUrl: string;

  nextAction: string;
};

export const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Software Development Internship",
    organization: "Tech Company",
    type: "Internship",

    requiredSkills: [
      "Python",
      "C++",
      "Java",
      "SQL",
      "Git",
    ],

    goals: ["Find an internship"],

    minYear: 2,

    eligibility:
      "Undergraduate students pursuing Computer Science or related disciplines.",

    deadline: "Rolling",

    officialUrl: "https://example.com",

    nextAction:
      "Build one practical software project and strengthen your Git workflow.",
  },

  {
    id: "2",
    title: "National Coding Hackathon",
    organization: "Student Innovation Network",
    type: "Hackathon",

    requiredSkills: [
      "C++",
      "Python",
      "JavaScript",
      "Git",
    ],

    goals: ["Participate in hackathons"],

    minYear: 1,

    eligibility:
      "Open to undergraduate students interested in technology and innovation.",

    deadline: "30 September 2026",

    officialUrl: "https://example.com",

    nextAction:
      "Practice problem solving and build a small project you can present.",
  },

  {
    id: "3",
    title: "Student Research Program",
    organization: "Research Institute",
    type: "Research",

    requiredSkills: [
      "Python",
      "Machine Learning",
      "Research",
      "Statistics",
    ],

    goals: ["Find research opportunities"],

    minYear: 2,

    eligibility:
      "Students with an interest in computer science research and data-driven projects.",

    deadline: "15 October 2026",

    officialUrl: "https://example.com",

    nextAction:
      "Build a small research project and document your methodology.",
  },

  {
    id: "4",
    title: "Frontend Development Challenge",
    organization: "Developer Community",
    type: "Competition",

    requiredSkills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
    ],

    goals: [
      "Build my skills",
      "Explore career options",
    ],

    minYear: 1,

    eligibility:
      "Students interested in web development and frontend technologies.",

    deadline: "10 October 2026",

    officialUrl: "https://example.com",

    nextAction:
      "Build a responsive frontend project using HTML, CSS and JavaScript.",
  },

  {
    id: "5",
    title: "Data Science Internship",
    organization: "Analytics Company",
    type: "Internship",

    requiredSkills: [
      "Python",
      "SQL",
      "Pandas",
      "Statistics",
    ],

    goals: [
      "Find an internship",
      "Build my skills",
    ],

    minYear: 2,

    eligibility:
      "Undergraduate students with basic programming and data analysis skills.",

    deadline: "20 October 2026",

    officialUrl: "https://example.com",

    nextAction:
      "Practice Python, SQL and Pandas through a small data analysis project.",
  },

  {
    id: "6",
    title: "AI Innovation Challenge",
    organization: "Technology Community",
    type: "Competition",

    requiredSkills: [
      "Python",
      "Machine Learning",
      "Git",
    ],

    goals: [
      "Participate in hackathons",
      "Build my skills",
    ],

    minYear: 1,

    eligibility:
      "Students interested in artificial intelligence and technology innovation.",

    deadline: "5 November 2026",

    officialUrl: "https://example.com",

    nextAction:
      "Build a small machine learning project and learn how to present your solution.",
  },

  {
    id: "7",
    title: "Open Source Contribution Program",
    organization: "Developer Community",
    type: "Competition",

    requiredSkills: [
      "Git",
      "GitHub",
      "Python",
      "JavaScript",
    ],

    goals: [
      "Build my skills",
      "Explore career options",
    ],

    minYear: 1,

    eligibility:
      "Students interested in contributing to open-source software projects.",

    deadline: "Rolling",

    officialUrl: "https://example.com",

    nextAction:
      "Create a GitHub profile and make your first meaningful open-source contribution.",
  },

  {
    id: "8",
    title: "Machine Learning Research Internship",
    organization: "AI Research Lab",
    type: "Research",

    requiredSkills: [
      "Python",
      "Machine Learning",
      "Statistics",
      "Research",
    ],

    goals: [
      "Find research opportunities",
      "Explore career options",
    ],

    minYear: 3,

    eligibility:
      "Undergraduate students with programming and machine learning experience.",

    deadline: "1 December 2026",

    officialUrl: "https://example.com",

    nextAction:
      "Build and document a machine learning project while strengthening your research skills.",
  },
];