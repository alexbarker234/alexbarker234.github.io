import HeaderText from "@/components/HeaderText";
import { ProjectCard } from "@/components/ProjectCard";
import RevealingSection from "@/components/RevealingSection";
import SlidingIndicatorSelector from "@/components/SlidingIndicatorSelector";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import projects from "../data/projectsData";
import type { ProjectTag } from "../types";

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<ProjectTag | null>(null);

  const filters: { label: string; value: ProjectTag | null }[] = [
    { label: "All", value: null },
    { label: "React / NextJS", value: "react" },
    { label: "Games", value: "game" },
    { label: "Other", value: "other" }
  ];

  const visibleProjects = selectedFilter
    ? projects.filter((project) => project.tags.includes(selectedFilter))
    : projects;

  return (
    <RevealingSection id="projects" className="overflow-x-hidden">
      <HeaderText level="h1" className="text-4xl text-center my-6">
        My Projects
      </HeaderText>
      <div className="w-[95%] max-w-[900px] mx-auto my-6 flex justify-center">
        <SlidingIndicatorSelector
          options={filters}
          value={selectedFilter}
          onChange={setSelectedFilter}
          size="responsive"
          equalButtons={true}
        />
      </div>
      {/* Filter slide/fade lives on the wrapper so it doesn't clash with the card's modal animation. */}
      <div className="relative w-[95%] max-w-[1200px] mx-auto flex flex-wrap justify-center mb-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.4 },
                layout: { duration: 0.4, ease: "easeInOut" }
              }}
              className={[
                "aspect-[6/5] mb-2 w-full max-w-full shrink-0",
                "min-[500px]:m-2 min-[500px]:w-[calc(50%-1.2rem)]",
                "min-[900px]:w-[calc(33.3%-1.2em)]"
              ].join(" ")}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </RevealingSection>
  );
};
export default Projects;
