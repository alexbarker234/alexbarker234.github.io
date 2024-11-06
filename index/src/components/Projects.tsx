import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import projects from "../data/projectsData";
import { ProjectTag } from "../types";
import RevealingSection from "./RevealingSection";
import "./projects.scss";
import FadeInImage from "./FadeInImage";

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
    setSelectedFilter(filter);
  };

  return (
    <RevealingSection id="projects">
      <h1>My Projects</h1>
      <div className="project-selectors">
        {filters.map((filter) => (
          <div
            key={filter.label}
            className={`selector ${
              selectedFilter === filter.value ? "active" : ""
            }`}
            onClick={() => handleFilterClick(filter.value)}
          >
            {filter.label}
          </div>
        ))}
      </div>
      <div ref={gridRef} className="projects">
        {projects.map(
          ({ tags, href, imgSrc, title, description, favourite }, index) => (
            <Project
              key={index}
              tags={tags}
              href={href}
              imgSrc={imgSrc}
              title={title}
              description={description}
              favourite={favourite}
            />
          )
        )}
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
  tags: ProjectTag[];
  favourite?: boolean;
}
const Project: React.FC<ProjectProps> = ({
  href,
  imgSrc,
  title,
  description,
  tags,
  favourite
}) => {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <a className={`project ${tags.join(" ")}`} href={href}>
      <div className={`project-inner ${isLoaded ? "loaded" : ""}`}>
        <FadeInImage src={imgSrc} alt={title} onLoad={() => setLoaded(true)} />
        <div className="project-details">
          <div className="project-title">{title}</div>
          <div className="project-description">{description}</div>
        </div>
      </div>
      {favourite && <FaStar />}
    </a>
  );
};
