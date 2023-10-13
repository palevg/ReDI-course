import { useState } from "react";
import { mySkills } from "../data";

const MyPortfolio = () => {
  const [skillDeskr, setSkillDeskr] = useState("");

  return (
    <div className="portfolio">
      <h1>Welcome to my portfolio</h1>
      <h2>here is a list of my skills</h2>
      {skillDeskr && <p>{skillDeskr}</p>}

      <ul className="skills-list">
        {mySkills.map((skill) => (
          <li
            key={skill.name}
            className="skill-item"
            onClick={() =>
              skillDeskr === skill.description
                ? setSkillDeskr("")
                : setSkillDeskr(skill.description)
            }
          >
            <img src={skill.img} alt={skill.name} />
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPortfolio;