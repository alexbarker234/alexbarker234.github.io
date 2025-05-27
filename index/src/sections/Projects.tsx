import HeaderText from "@/components/HeaderText";
import { ProjectCard } from "@/components/ProjectCard";
import RevealingSection from "@/components/RevealingSection";
import { cn } from "@/utils/cn";
import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";
import projects from "../data/projectsData";
import type { ProjectTag } from "../types";

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<ProjectTag | null>(null);
  const isotope = useRef<Isotope | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      isotope.current = new Isotope(gridRef.current, {
        itemSelector: ".project",
        layoutMode: "fitRows"
      });
    }

    return () => {
      isotope.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (isotope.current) {
      if (selectedFilter === null) {
        isotope.current.arrange({ filter: "*" });
      } else {
        isotope.current.arrange({
          filter: `.${selectedFilter}`
        });
      }
    }
  }, [selectedFilter]);

  const filters: { label: string; value: ProjectTag | null }[] = [
    { label: "All", value: null },
    { label: "React / NextJS", value: "react" },
    { label: "Games", value: "game" },
    { label: "Other", value: "other" }
  ];

  const handleFilterClick = (filter: ProjectTag | null) => {
    if (filter)
      console.log(projects.filter((project) => project.tags.includes(filter)));
    setSelectedFilter(filter);
  };

  return (
    <RevealingSection id="projects">
      <HeaderText level="h1" className="text-4xl font-bold text-center my-6">
        My Projects
      </HeaderText>
      <div
        className="project-selectors w-[95%] max-w-[900px] mx-auto flex flex-wrap justify-center
          gap-x-6"
      >
        {filters.map((filter) => (
          <div
            key={filter.label}
            className={cn(
              `selector cursor-pointer w-36 h-12 max-400px:w-40 rounded-full text-center
              bg-white text-black my-4 transition duration-300 flex items-center`,
              {
                "bg-blue text-white": selectedFilter === filter.value,
                "hover:bg-grey-light": selectedFilter !== filter.value
              }
            )}
            onClick={() => handleFilterClick(filter.value)}
          >
            <p className="w-full">{filter.label}</p>
          </div>
        ))}
      </div>
      <div
        ref={gridRef}
        className="w-[95%] max-w-[1200px] min-h-[700px] mx-auto flex flex-wrap justify-center mb-4"
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </RevealingSection>
  );
};
export default Projects;
