import skills from "@/data/skillsData";
import RevealingSection from "./RevealingSection";

const types = {
  language: "Programming Languages",
  "front-end": "Front End",
  "back-end": "Back End",
  misc: "Misc Skills"
};

const Skills = () => {
  const skillTypes: { [key: string]: JSX.Element[] } = Object.keys(
    types
  ).reduce((acc, type) => {
    acc[type] = [];
    return acc;
  }, {} as { [key: string]: JSX.Element[] });

  skills.forEach((skill) => {
    skill.types.forEach((skillType) => {
      skillTypes[skillType].push(
        <div className="skill" key={skill.title}>
          <div className="icon">
            <i className={skill.icon}></i>
          </div>
          <div className="title">{skill.title}</div>
        </div>
      );
    });
  });

  return (
    <RevealingSection id="skills">
      <h1>Skills</h1>
      <div id="skills-container" className="skills-container">
        {Object.entries(types).map(([typeId, title]) => (
          <div className="skill-section" id={typeId} key={typeId}>
            <h2>{title}</h2>
            <div className="skills">{skillTypes[typeId]}</div>
          </div>
        ))}
      </div>
    </RevealingSection>
  );
};

export default Skills;
