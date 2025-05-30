import AuroraBorealis from "@/components/Header/Aurora";
import StarsBackground from "@/components/Header/StarsBackground";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MeteorShower from "../components/Header/MeteorShower";
import ParallaxDivider from "../components/Header/ParralaxDivider";
import ProfilePicture from "../components/Header/ProfilePicture";

export default function Header() {
  return (
    <header className="relative w-full min-h-[500px] h-[40vw] -z-10">
      {/* Stars and Shower Background */}
      <div
        className="absolute bg-night-sky w-full h-full bottom-0 left-1/2 transform -translate-x-1/2
          z-[-1] overflow-hidden"
      >
        <div className="w-screen h-full absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <StarsBackground />
          <MeteorShower />
        </div>

        {/* Aurora */}
        <div
          className="w-screen h-[30vw] min-h-[400px] absolute -top-20 left-1/2 transform
            -translate-x-1/2 opacity-80 scale-x-[1.2]"
        >
          <div className="absolute left-1/5">
            <AuroraBorealis />
          </div>
          <div className="absolute left-1/2 scale-x-[-1] rotate-12">
            <AuroraBorealis
              color1="#5538d6"
              color2="#41d9c2"
              startFrames={100}
              id="aurora-wave-2"
            />
          </div>
        </div>
        <ParallaxDivider />
      </div>
      {/* Header Info */}
      <div
        className="main-title font-thin text-center absolute w-full top-[50%] transform
          -translate-y-1/2 text-[max(10vw,4rem)] drop-shadow-lg"
      >
        Alex Barker
        <div className="subtitle absolute top-[90%] w-full text-5xl">
          Full Stack Dev
        </div>
      </div>
      <div className="icon-section absolute left-1/2 top-2 transform -translate-x-1/2 w-48">
        <ProfilePicture />
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
