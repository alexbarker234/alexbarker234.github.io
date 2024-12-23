import HeaderText from "@/components/HeaderText";
import { TbCertificate } from "react-icons/tb";
import RevealingSection from "../components/RevealingSection";

export default function ExperienceSection() {
  return (
    <RevealingSection
      id="experience"
      className="w-11/12 max-w-3xl mx-auto mb-4"
    >
      <HeaderText level="h1" className="text-4xl">
        Experience
      </HeaderText>
      <div className="w-full group">
        <Experience
          title="Wesfarmers Chemicals Energies & Fertilisers - Software Developer Cadet"
          time="Nov 2022 - Present"
        >
          <SkillTags tags={["C#", "SQL", "PowerShell", "Jira", "Azure"]} />
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>Developing C# applications using ASP MVC & Razor Markup</li>
            <li>Creating & administrating Jira cloud projects</li>
            <li>Migrating our Jira server instance to Jira cloud</li>
            <li>
              Creating PowerShell integration scripts using multiple APIs, Azure
              & Microsoft Graph
            </li>
            <li>
              Developing Dynamics365 Model-Driven apps using PowerApps &
              JavaScript
            </li>
          </ul>
        </Experience>
        <Experience
          title="UWA Coders for Causes Project (Summer 2023/24)"
          time="Nov 2023 - Feb 2024"
        >
          <SkillTags tags={["NextJS", "TypeScript"]} />
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>
              Volunteer work in a large student-run team developing a{" "}
              <a
                href="https://github.com/codersforcauses/repair-labs"
                className="text-blue hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next JS web application
              </a>{" "}
              for a non-profit
            </li>
          </ul>
        </Experience>
        <Experience
          title="University Computer Club - Committee Member"
          time="Mar 2021 - Mar 2022"
        >
          <SkillTags tags={["Linux", "Networking", "Event Planning"]} />
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>Organising & running cross-club events</li>
            <li>Working with various Linux and networking systems</li>
          </ul>
        </Experience>
        <Experience
          title="B.S. in Computer Science & Cybersecurity"
          time="2021 - 2024"
          icon={<TbCertificate />}
        >
          <SkillTags tags={["Java", "Python", "C", "SQL"]} />
          <div>
            Bachelor of Science - Double major in Computer Science &
            Cybersecurity at UWA
          </div>
        </Experience>
        <Experience
          title="Mod Development Team Lead & Developer"
          time="2017 - 2022"
        >
          <SkillTags
            tags={["C#", "Git", "Team Leadership", "Project Management"]}
          />
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>
              Led a team of volunteer developers creating a mod for a game
            </li>
            <li>
              Coordinated feature development and bug fixes across multiple
              releases
            </li>
            <li>Managed Git workflow for team contributions</li>
            <li>
              Engaged with community feedback to guide development priorities
            </li>
          </ul>
        </Experience>
      </div>
    </RevealingSection>
  );
}

const SkillTags = ({ tags }: { tags: string[] }) => (
  <div className="flex gap-2 text-sm font-semibold flex-wrap">
    {tags.map((tag, index) => (
      <div key={index} className="bg-blue rounded-full px-2 w-fit text-nowrap">
        {tag}
      </div>
    ))}
  </div>
);

interface ExperienceProps {
  title: string;
  time: string;
  children: React.ReactNode;
}

const Experience = ({
  title,
  time,
  children,
  icon
}: ExperienceProps & { icon?: React.ReactNode }) => (
  <div
    className="relative hover:bg-bg-light/50 p-4 rounded-lg transition-all hover:!opacity-100
      group-hover:opacity-50"
  >
    <div className="font-black text-xl mb-1 -translate-y-1.5 flex items-center gap-2">
      {icon && <>{icon}</>}
      {title}
    </div>
    <div className="border-b-2 border-blue w-fit mb-4">{time}</div>
    <div className="space-y-2">{children}</div>
    {/* Stick thing */}
    <div className="hidden md:block">
      <span className="absolute left-0 top-0 h-full w-[2px] rounded-sm -translate-x-1/2 bg-blue"></span>
      <span className="absolute w-4 h-4 rounded-md bg-blue left-0 top-0 -translate-x-1/2"></span>
    </div>
  </div>
);
