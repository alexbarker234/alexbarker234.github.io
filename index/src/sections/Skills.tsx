import HeaderText from "@/components/HeaderText";
import skills from "@/data/skillsData";
import type { Skill } from "@/types";
import type { JSX } from "react";
import { useEffect, useRef } from "react";
import RevealingSection from "../components/RevealingSection";

const types = {
  language: "Programming Languages",
  "front-end": "Front End",
  "back-end": "Back End",
  misc: "Misc Skills"
};

type SkillCardProps = {
  skill: Skill;
};

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div
      className="skills-glow-card flex h-[4.8rem] w-[4.8rem] shrink-0 flex-col items-center justify-center gap-1
        rounded-lg border border-white/10 bg-bg-dark/50 p-2 md:h-28 md:w-28 md:gap-2"
    >
      <div className="relative z-[2] flex justify-center items-center md:mb-0.5">
        <i className={`${skill.icon} text-3xl md:text-5xl`} aria-hidden />
      </div>
      <div className="relative z-[2] text-center text-sm font-bold md:text-base">{skill.title}</div>
    </div>
  );
};

const Skills = () => {
  const glowRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;
    let pointerX = -9999;
    let pointerY = -9999;

    const applyPointerPosition = () => {
      rafId = 0;
      const root = glowRootRef.current;
      if (!root) return;
      root.style.setProperty("--skills-mx", `${pointerX}`);
      root.style.setProperty("--skills-my", `${pointerY}`);
    };

    const queuePointerPositionUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(applyPointerPosition);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      queuePointerPositionUpdate();
    };

    const handlePointerLeaveWindow = () => {
      pointerX = -9999;
      pointerY = -9999;
      queuePointerPositionUpdate();
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerdown", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeaveWindow, {
      passive: true
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeaveWindow);
    };
  }, []);

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
      skillTypes[skillType].push(<SkillCard key={skill.id} skill={skill} />);
    });
  });

  return (
    <RevealingSection id="skills">
      <HeaderText level="h1" className="text-4xl">
        Skills
      </HeaderText>
      <div
        ref={glowRootRef}
        id="skills-container"
        className="skills-glow mx-auto flex w-11/12 max-w-[960px] flex-col flex-wrap"
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
