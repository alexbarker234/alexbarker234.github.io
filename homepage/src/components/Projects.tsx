import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import projects from "../data/projectsData";
import { ProjectTag } from "../types";
import RevealingSection from "./RevealingSection";

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<ProjectTag | null>(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => setIsFading(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isFading]);

  const filters: { label: string; value: ProjectTag | null }[] = [
    { label: "All", value: null },
    { label: "React / NextJS", value: "react" },
    { label: "Games", value: "game" },
    { label: "Other", value: "other" }
  ];

  const handleFilterClick = (filter: ProjectTag | null) => {
    setIsFading(true);
    setTimeout(() => setSelectedFilter(filter), 350);
  };

  return (
    <RevealingSection id="projects">
      <h1>My Projects</h1>
      <div className="project-selectors">
        {filters.map((filter) => (
          <div
            key={filter.label}
            className="selector"
            onClick={() => handleFilterClick(filter.value)}
          >
            {filter.label}
          </div>
        ))}
      </div>
      <div className={`projects ${isFading ? "fade" : ""}`}>
        {projects.map(({ tags, href, imgSrc, title, description }, index) => (
          <Project
            key={index}
            // wack double negation boolean cast lol
            disabled={!!(selectedFilter && !tags.includes(selectedFilter))}
            href={href}
            imgSrc={imgSrc}
            title={title}
            description={description}
          />
        ))}
      </div>
    </RevealingSection>
  );
};
export default Projects;

interface ProjectProps {
  href: string;
  imgSrc: string;
  title: string;
  description: string;
  favourite?: boolean;
  disabled?: boolean;
}
const Project: React.FC<ProjectProps> = ({
  href,
  imgSrc,
  title,
  description,
  favourite,
  disabled
}) => (
  <a className={`project ${disabled && "disabled"}`} href={href}>
    <div className="project-inner">
      <img src={imgSrc} alt={title} />
      <div className="project-details">
        <div className="project-title">{title}</div>
        <div className="project-description">{description}</div>
      </div>
    </div>
    {favourite && <FaStar />}
  </a>
);
