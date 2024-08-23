import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const skillList = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <>
      <img src="jonas.jpeg" alt="jonas" className="avatar" />
    </>
  );
}

function Intro() {
  return (
    <>
      <h1>Jonas Schemdtmann</h1>
      <p>
        Full-stack web developer and teacher at Udemy. When not coding or
        preparing a course, I like to play board games, to cook (and eat), or to
        just enjoy the Portuguese sun at the beach.
      </p>
    </>
  );
}

function SkillList() {
  const skills = skillList;
  const icons = ["💪", "👍", "👶"];
  const levels = ["advanced", "intermediate", "beginner"];
  const map = new Map();
  levels.forEach((level, index) => map.set(level, icons[index]));
  console.log(map);

  return (
    <ul className="skill-list">
      {skills.map((skill) => (
        <Skill
          skillObj={skill}
          icon={map.get(skill.level)}
          key={skill.color}
        ></Skill>
      ))}
    </ul>
  );
}

function Skill({ skillObj, icon }) {
  return (
    <li className="skill" style={{ backgroundColor: skillObj.color }}>
      <span>{skillObj.skill}</span>
      <span>{icon}</span>
      {/* <span>
        {level === "beginner" && "👶"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪"}
      </span> */}
    </li>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
