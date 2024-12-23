import { FaGithub, FaLinkedin } from "react-icons/fa";
import FadeInImage from "../components/FadeInImage";
import MeteorShower from "../components/MeteorShower";

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
        className="absolute rounded-full bg-meteor-body animate-flicker"
        style={{
          left,
          top,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay
        }}
      >
        <div className="bg-meteor-glow blur-lg w-full h-full"></div>
      </div>
    );
  });
};

export default function Header() {
  return (
    <header className="overflow-hidden relative w-full min-h-[400px] h-[30vw]">
      <div
        className="absolute bg-night-sky w-[3000px] h-[3000px] rounded-full bottom-0 left-1/2
          transform -translate-x-1/2 z-[-1] overflow-hidden"
      >
        <div
          className="w-screen h-[30vw] min-h-[400px] absolute bottom-0 left-1/2 transform
            -translate-x-1/2"
        >
          {generateStars(50)}
          <MeteorShower />
        </div>
      </div>
      <div
        className="main-title font-thin text-center absolute w-full top-[60%] transform
          -translate-y-1/2 text-[max(10vw,4rem)] drop-shadow-lg"
      >
        Alex Barker
        <div className="subtitle absolute top-[90%] w-full text-5xl">
          Full Stack Dev
        </div>
      </div>
      <div className="icon-section absolute left-1/2 top-2 transform -translate-x-1/2 w-48">
        <FadeInImage
          src="./me.png"
          className="w-40 mx-auto aspect-square rounded-full"
        />
        <div className="social-links flex justify-between gap-3 -translate-y-[40%]">
          <SocialLink
            href="https://github.com/alexbarker234"
            icon={<FaGithub size={30} />}
          />
          <SocialLink
            href="https://www.linkedin.com/in/alex-barker234/"
            icon={<FaLinkedin size={30} />}
          />
        </div>
      </div>
    </header>
  );
}

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({
  href,
  icon
}) => {
  return (
    <a
      href={href}
      className="relative w-12 h-12 rounded-full bg-bg-light transition-transform duration-100
        hover:scale-105 hover:bg-blue flex items-center justify-center"
    >
      {icon}
    </a>
  );
};
