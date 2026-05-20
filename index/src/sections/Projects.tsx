import HeaderText from "@/components/HeaderText";
import { ProjectCard } from "@/components/ProjectCard";
import RevealingSection from "@/components/RevealingSection";
import SlidingIndicatorSelector from "@/components/SlidingIndicatorSelector";
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
          itemSelector: ".project",
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
    <RevealingSection id="projects" className="overflow-x-hidden">
      <HeaderText level="h1" className="text-4xl font-bold text-center my-6">
        My Projects
      </HeaderText>
      <div className="w-[95%] max-w-[900px] mx-auto my-6 flex justify-center">
        <SlidingIndicatorSelector
          options={filters}
          value={selectedFilter}
          onChange={handleFilterClick}
          size="responsive"
          equalButtons={true}
        />
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
