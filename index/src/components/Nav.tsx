import { cn } from "@/utils/cn";
import {
  faBars,
  faCertificate,
  faFile,
  faHammer,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [navEnabled, setNavEnabled] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("about");
  const navRef = useRef<HTMLDivElement>(null);
  /** When set, scroll handler must not override `activeSection` until scroll reaches this section. */
  const pendingClickSectionRef = useRef<Section | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setNavEnabled(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsStuck(rect.top <= 0);
      }

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

  useEffect(() => {
    if (navEnabled) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navEnabled]);

  const handleNavChange = (value: Section) => {
    setActiveSection(value);
    pendingClickSectionRef.current = value;
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setNavEnabled(false);
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
          "md:sticky md:top-0 md:z-10 md:py-3 md:text-xl relative",
          "md:pointer-events-none md:text-center fixed top-4 right-4 z-99"
        )}
        ref={navRef}
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-75 -z-10",
            "bg-linear-to-b from-bg1 to-transparent",
            {
              "opacity-100": isStuck,
              "opacity-0": !isStuck
            }
          )}
        />
        <button
          className="text-2xl block md:hidden absolute top-0 right-0"
          onClick={() => setNavEnabled(!navEnabled)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className={cn(
            "md:flex md:justify-center md:p-0 md:opacity-100 md:pointer-events-auto",
            "bg-bg-dark md:bg-transparent fixed md:static top-12 right-0",
            "md:right-auto transition-opacity duration-200 md:flex-row md:space-x-4",
            "rounded-lg md:rounded-none overflow-hidden",
            {
              "opacity-100 pointer-events-auto": navEnabled,
              "opacity-0 pointer-events-none": !navEnabled
            }
          )}
        >
          {/* Desktop view with sliding indicator */}
          <div className="hidden md:block">
            <SlidingIndicatorSelector
              options={navOptions}
              value={activeSection}
              size="lg"
              onChange={handleNavChange}
            />
          </div>
          {/* Mobile view */}
          <div className="md:hidden">
            <NavItem href="#about">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> About
            </NavItem>
            <NavItem href="#skills">
              <FontAwesomeIcon icon={faCertificate} className="mr-2" /> Skills
            </NavItem>
            <NavItem href="#experience">
              <FontAwesomeIcon icon={faFile} className="mr-2" /> Experience
            </NavItem>
            <NavItem href="#projects">
              <FontAwesomeIcon icon={faHammer} className="mr-2" /> Projects
            </NavItem>
          </div>
        </div>
      </nav>
    </>
  );
}

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

const NavItem = ({ href, children }: NavItemProps) => {
  return (
    <a
      href={href}
      className="flex items-center md:justify-center p-4 md:py-3 md:px-8 md:bg-bg1 md:border-2
        md:border-white md:rounded-xl hover:bg-blue hover:border-blue transition-all
        rounded-lg duration-200 mx-2 flex-1 max-w-48 font-semibold"
    >
      {children}
    </a>
  );
};
