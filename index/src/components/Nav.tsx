import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaCertificate,
  FaFile,
  FaHammer,
  FaUser
} from "react-icons/fa";

export default function Nav() {
  const [navEnabled, setNavEnabled] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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
          <FaBars />
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
          <NavItem href="#about">
            <FaUser className="mr-2" /> About
          </NavItem>
          <NavItem href="#skills">
            <FaCertificate className="mr-2" /> Skills
          </NavItem>
          <NavItem href="#experience">
            <FaFile className="mr-2" /> Experience
          </NavItem>
          <NavItem href="#projects">
            <FaHammer className="mr-2" /> Projects
          </NavItem>
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
        duration-200 mx-2 flex-1 max-w-48 font-semibold"
    >
      {children}
    </a>
  );
};
