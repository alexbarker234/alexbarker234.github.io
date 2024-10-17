import {
  FaBars,
  FaCertificate,
  FaFile,
  FaHammer,
  FaUser
} from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import "./nav.scss";

export default function Nav() {
  const [navEnabled, setNavEnabled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setNavEnabled(false);
    }
  };

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
    <nav className="nav" ref={navRef}>
      <button id="nav-button" onClick={() => setNavEnabled(!navEnabled)}>
        <FaBars />
      </button>
      <div className={`nav-options ${navEnabled ? "enabled" : ""}`}>
        <a href="#about">
          <FaUser /> About
        </a>
        <a href="#skills">
          <FaCertificate /> Skills
        </a>
        <a href="#resume">
          <FaFile /> Resume
        </a>
      </div>
      <a href="#projects">
        <FaHammer /> Projects
      </a>
    </nav>
  );
}
