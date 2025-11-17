import AuroraBorealis from "@/components/Header/Aurora";
import StarsBackground from "@/components/Header/StarsBackground";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MeteorShower from "../components/Header/MeteorShower";
import ParallaxDivider from "../components/Header/ParralaxDivider";
import ProfilePicture from "../components/Header/ProfilePicture";

export default function Header() {
  return (
    <header className="relative w-full min-h-[500px] h-[40vw] -z-10">
      {/* Stars and Shower Background */}
      <div
        className="absolute bg-radial-[at_50%_100%] from-[#321e3f] to-night-sky w-full h-full
          bottom-0 left-1/2 transform -translate-x-1/2 z-[-1] overflow-hidden"
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
          <div className="absolute w-full h-full">
            <AuroraBorealis />
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
            icon={<FontAwesomeIcon icon={faGithub} size="2xl" />}
          />
          <SocialLink
            href="https://www.linkedin.com/in/alex-barker234/"
            icon={<FontAwesomeIcon icon={faLinkedin} size="2xl" />}
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
