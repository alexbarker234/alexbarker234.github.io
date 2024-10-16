import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../header.scss";
import MeteorShower from "./MeteorShower";

const randBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const generateStars = (numStars: number) => {
  return Array.from({ length: numStars }, (_, i) => {
    const size = randBetween(5, 10);
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;
    const animationDelay = `${Math.random() * -0.3}s`;

    return (
      <div
        key={i}
        className="star"
        style={{
          left,
          top,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay
        }}
      ></div>
    );
  });
};

export default function Header() {
  return (
    <header className="header">
      <div className="header-background">
        <div className="header-inner" id="stars-bg">
          {generateStars(50)}
        </div>
        <MeteorShower />
      </div>
      <div className="main-title">
        Alex Barker
        <div className="subtitle">Full Stack Dev</div>
      </div>
      <div className="icon-section">
        <img src="./me.png" alt="Alex Barker" />
        <div className="social-links">
          <a href="https://github.com/alexbarker234">
            <FaGithub />
          </a>
          <a href="https://au.linkedin.com/in/alex-barker-a37389ba">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </header>
  );
}
