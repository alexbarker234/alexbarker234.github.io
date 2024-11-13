import HeaderText from "@/components/HeaderText";
import RevealingSection from "@/components/RevealingSection";
import { cn } from "@/utils/cn";
import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import FadeInImage from "../components/FadeInImage";
import projects from "../data/projectsData";
import { ProjectTag } from "../types";

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
          gap-6"
      >
        {filters.map((filter) => (
          <div
            key={filter.label}
            className={cn(
              `selector cursor-pointer w-40 h-12 rounded-full text-center bg-white text-black
              my-4 transition duration-300 flex items-center`,
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
        className="projects w-[95%] max-w-[1200px] min-h-[700px] mx-auto flex flex-wrap
          justify-center mb-4"
      >
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

  const tagClasses = tags.join(" ");

  return (
    <a
      className={`project ${tagClasses} w-[22rem] h-[13rem] m-2 text-center relative select-none
        rounded-lg hover:scale-105 group duration-0`}
      href={href}
    >
      <div
        className={`overflow-hidden relative w-full h-full transition duration-100 border
          border-blue rounded-lg ${isLoaded ? "border-none" : ""}`}
      >
        <FadeInImage
          src={imgSrc}
          alt={title}
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 p-4 bg-blue/70
            hover:opacity-100 rounded-lg"
        >
          <div className="text-2xl font-extrabold mb-2">{title}</div>
          <div>{description}</div>
        </div>
      </div>
      {favourite && (
        <div className="absolute left-full top-full transform -translate-x-3/4 -translate-y-3/4">
          <FaStar
            size={24}
            className="text-gold group-hover:animate-wiggle-pop"
          />
        </div>
      )}
    </a>
  );
};
