import { cn } from "@/utils/cn";
import {
  faCertificate,
  faFile,
  faHammer,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import SlidingIndicatorSelector from "./SlidingIndicatorSelector";

type Section = "about" | "skills" | "experience" | "projects";

function getActiveSectionFromScroll(): Section {
  const sections: Section[] = ["about", "skills", "experience", "projects"];
  const sectionElements = sections.map((section) =>
    document.getElementById(section)
  );
  const scrollPosition = window.scrollY + 200;

  for (let i = sectionElements.length - 1; i >= 0; i--) {
    const element = sectionElements[i];
    if (element && element.offsetTop <= scrollPosition) {
      return sections[i];
    }
  }
  return "about";
}

export default function Nav() {
  const [activeSection, setActiveSection] = useState<Section>("about");
  const navRef = useRef<HTMLDivElement>(null);
  /** When set, scroll handler must not override `activeSection` until scroll reaches this section. */
  const pendingClickSectionRef = useRef<Section | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const pending = pendingClickSectionRef.current;
      if (pending !== null) {
        if (getActiveSectionFromScroll() === pending) {
          pendingClickSectionRef.current = null;
        } else {
          return;
        }
      }

      setActiveSection(getActiveSectionFromScroll());
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavChange = (value: Section) => {
    setActiveSection(value);
    pendingClickSectionRef.current = value;
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navOptions = [
    { value: "about" as Section, label: "About", icon: faUser },
    { value: "skills" as Section, label: "Skills", icon: faCertificate },
    { value: "experience" as Section, label: "Experience", icon: faFile },
    { value: "projects" as Section, label: "Projects", icon: faHammer }
  ];

  return (
    <>
      <nav
        className={cn(
          `sticky top-0 z-10 py-3 text-xl pointer-events-none text-center md:mx-auto mx-4
          max-w-2xl`
        )}
        ref={navRef}
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-75 -z-10",
            "bg-linear-to-b from-bg1 to-transparent"
          )}
        />
        <div
          className={cn(
            "flex justify-center p-0 opacity-100 pointer-events-auto overflow-hidden"
          )}
        >
          <SlidingIndicatorSelector
            options={navOptions}
            value={activeSection}
            size="responsive"
            onChange={handleNavChange}
          />
        </div>
      </nav>
    </>
  );
}
