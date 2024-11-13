import HeaderText from "@/components/HeaderText";
import skills from "@/data/skillsData";
import RevealingSection from "../components/RevealingSection";

const types = {
  language: "Programming Languages",
  "front-end": "Front End",
  "back-end": "Back End",
  misc: "Misc Skills"
};

const Skills = () => {
  const skillTypes: { [key: string]: JSX.Element[] } = Object.keys(
    types
  ).reduce(
    (acc, type) => {
      acc[type] = [];
      return acc;
    },
    {} as { [key: string]: JSX.Element[] }
  );

  skills.forEach((skill) => {
    skill.types.forEach((skillType) => {
      skillTypes[skillType].push(
        <div
          className="flex flex-col justify-center items-center transition-all duration-100 w-[4.8rem]
            h-[4.8rem] md:w-28 md:h-28 bg-blue rounded-lg drop-shadow-lg"
          key={skill.title}
        >
          <div className="flex justify-center items-center md:mb-2">
            <i className={`${skill.icon} text-3xl md:text-5xl`}></i>
          </div>
          <div className="text-center font-bold md:text-base text-sm">
            {skill.title}
          </div>
        </div>
      );
    });
  });

  return (
    <RevealingSection id="skills">
      <HeaderText level="h1" className="text-4xl">
        Skills
      </HeaderText>
      <div
        id="skills-container"
        className="flex flex-col w-11/12 mx-auto flex-wrap max-w-[960px]"
      >
        {Object.entries(types).map(([typeId, title]) => (
          <div className="w-full" id={typeId} key={typeId}>
            <HeaderText level="h2" className="text-2xl font-semibold my-4">
              {title}
            </HeaderText>
            <div className="flex items-center justify-center flex-wrap gap-3 md:gap-4">
              {skillTypes[typeId]}
            </div>
          </div>
        ))}
      </div>
    </RevealingSection>
  );
};

export default Skills;
