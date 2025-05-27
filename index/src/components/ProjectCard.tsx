"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import type { Project } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { FaGithub, FaStar } from "react-icons/fa";

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
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white
                dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${project.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={project.imgSrc}
                  alt="?"
                  className="w-full h-52 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center flex
                    items-center justify-center"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${project.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${project.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap"
                    >
                      {project.extendedDescription ?? project.description}
                    </motion.p>
                  </div>
                </div>
                {/* Buttons */}
                <motion.div
                  className="flex gap-2 p-4"
                  layout
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                >
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
                      className="h-9 w-9 text-sm rounded-full bg-neutral-800 text-white hover:bg-neutral-900 flex
                        items-center justify-center transition"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
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
          `flex-1 w-full max-w-full h-52 text-center relative select-none rounded-lg
          duration-0 mb-2 cursor-pointer`,
          // Medium screens (500px+)
          "min-[500px]:w-[calc(50%-1.2rem)] min-[500px]:m-2",
          // Large screens (900px+)
          "min-[900px]:w-[calc(33.3%-1.2em)]"
        ].join("\u0020")}
      >
        {/* Separate element for hover scale to not mess with Isotope */}
        <motion.div className="hover:scale-105 group transition-all w-full h-full">
          <motion.div
            layoutId={`image-${project.title}-${id}`}
            className={`overflow-hidden relative w-full h-full transition duration-100 border
              border-blue rounded-lg ${isLoaded ? "border-none" : ""}`}
          >
            <img
              src={project.imgSrc}
              alt="?"
              onLoad={() => setLoaded(true)}
              className="w-full h-full object-cover object-top flex items-center justify-center"
            />
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 p-4 bg-blue/70
                hover:opacity-100 rounded-lg"
            >
              <motion.h3
                layoutId={`title-${project.title}-${id}`}
                className="text-2xl font-extrabold mb-2"
              >
                {project.title}
              </motion.h3>
              <motion.p layoutId={`description-${project.description}-${id}`}>
                {project.description}
              </motion.p>
            </motion.div>
          </motion.div>
          {project.favourite && (
            <motion.div className="absolute left-full top-full transform -translate-x-3/4 -translate-y-3/4">
              <FaStar
                size={24}
                className="text-gold group-hover:animate-wiggle-pop"
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

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
