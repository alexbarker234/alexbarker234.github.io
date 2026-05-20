"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import type { Project } from "@/types";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

interface ProjectCardProps {
  project: Project;
}

/**
 * An animated project card that openes up as a modal when clicked
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const [active, setActive] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useClickOutside(ref, () => setActive(false));

  return (
    <>
      {/* Modal Background */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      {/* Modal */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${project.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col
                backdrop-blur-md bg-bg-dark/50 border border-white/10 sm:rounded-3xl
                overflow-x-hidden overflow-y-auto p-3"
            >
              <motion.div
                layoutId={`image-${project.title}-${id}`}
                className="relative w-full aspect-[5/3]"
              >
                {project.banner && (
                  <Banner
                    text={project.banner === "wip" ? "WIP" : "ARCHIVED"}
                    color={
                      project.banner === "wip"
                        ? "bg-purple-600"
                        : "bg-yellow-500"
                    }
                  />
                )}
                <img
                  width={200}
                  height={200}
                  src={project.imgSrc}
                  alt="?"
                  className="w-full h-full object-cover object-top flex items-center justify-center
                    rounded-2xl"
                />
              </motion.div>

              <div className="px-2">
                <div className="flex justify-between items-start py-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${project.title}-${id}`}
                      className="font-bold text-neutral-200"
                    >
                      {project.title}
                    </motion.h3>
                    {project.techIcon && (
                      <motion.div
                        className="flex flex-wrap gap-2 my-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {project.techIcon.map((icon) => (
                          <i className={`${icon} text-2xl p-2`} key={icon} />
                        ))}
                      </motion.div>
                    )}
                    <motion.p
                      layoutId={`description-${project.description}-${id}`}
                      className="text-neutral-400 whitespace-pre-wrap"
                    >
                      {(project.extendedDescription ?? project.description)
                        .split("\n")
                        .map((line, index) => (
                          <span key={index} className="block mb-2">
                            {line}
                            <br />
                          </span>
                        ))}
                    </motion.p>
                  </div>
                </div>
                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                >
                  <div className="flex gap-2 w-full">
                    {project.appURL && (
                      <a
                        href={project.appURL}
                        target="_blank"
                        className="px-4 py-2 text-sm rounded-full font-bold bg-blue text-white hover:bg-blue-dark
                          h-9 transition"
                      >
                        Check it out
                      </a>
                    )}
                    {project.gitHubURL && (
                      <a
                        href={project.gitHubURL}
                        target="_blank"
                        className="my-button flex items-center justify-center h-9 w-9"
                      >
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                      </a>
                    )}
                  </div>
                  <button
                    className="my-button flex gap-2 items-center py-2 px-4 w-full mt-2 justify-center"
                    onClick={() => setActive(false)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Default State */}
      <motion.div
        layoutId={`card-${project.title}-${id}`}
        onClick={() => setActive(true)}
        className={[
          // Isotope classes
          `project ${project.tags.join("\x20")}`,
          // Base styles
          `flex flex-col flex-1 w-full max-w-full text-left relative select-none
          aspect-[6/5] rounded-3xl duration-0 mb-2 cursor-pointer`,
          // Medium screens (500px+)
          "min-[500px]:w-[calc(50%-1.2rem)] min-[500px]:m-2",
          // Large screens (900px+)
          "min-[900px]:w-[calc(33.3%-1.2em)]"
        ].join("\u0020")}
      >
        <div
          className="flex flex-col gap-4 w-full h-full p-4 bg-bg-dark/50 border border-white/10
            rounded-3xl transition-colors hover:border-white/20"
        >
          <motion.div
            layoutId={`image-${project.title}-${id}`}
            className={`relative w-full aspect-[5/3] overflow-hidden rounded-2xl transition duration-100
              ${isLoaded ? "" : "border border-blue"}`}
          >
            {project.banner && (
              <Banner
                text={project.banner === "wip" ? "WIP" : "ARCHIVED"}
                color={
                  project.banner === "wip" ? "bg-purple-600" : "bg-yellow-500"
                }
              />
            )}
            <img
              src={project.imgSrc}
              alt={project.title}
              onLoad={() => setLoaded(true)}
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <motion.h3
                layoutId={`title-${project.title}-${id}`}
                className="font-bold text-neutral-200"
              >
                {project.title}
              </motion.h3>
              {project.favourite && (
                <FontAwesomeIcon icon={faStar} className="text-gold text-xs" />
              )}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

const Banner = ({ text, color }: { text: string; color: string }) => {
  return (
    <div
      className={`${color} text-white text-xs font-bold px-12 py-1 transform rotate-45 shadow-lg
        translate-x-1/2 -translate-y-1/2 absolute top-6 right-6`}
    >
      {text}
    </div>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05
        }
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
