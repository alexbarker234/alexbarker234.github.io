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
  // scroll handler must not override `activeSection` until scroll reaches this section.
  const pendingClickSectionRef = useRef<Section | null>(null);

  useEffect(() => {
    // if the user scrolls (interrupting the click), cancel the pending click section
    const cancelPendingClickSectionFromUserScroll = () => {
      if (pendingClickSectionRef.current === null) return;
      pendingClickSectionRef.current = null;
    };

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

    const userScrollOpts = { passive: true };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener(
      "wheel",
      cancelPendingClickSectionFromUserScroll,
      userScrollOpts
    );
    window.addEventListener(
      "touchmove",
      cancelPendingClickSectionFromUserScroll,
      userScrollOpts
    );
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(
        "wheel",
        cancelPendingClickSectionFromUserScroll
      );
      window.removeEventListener(
        "touchmove",
        cancelPendingClickSectionFromUserScroll
      );
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
          "pointer-events-none text-center text-xl z-10 max-w-2xl",
          "fixed bottom-0 left-0 right-0 mx-auto w-full px-4 pb-4 pt-3",
          "md:sticky md:top-0 md:bottom-auto md:py-3 md:pb-3 md:px-0"
        )}
        ref={navRef}
      >
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
