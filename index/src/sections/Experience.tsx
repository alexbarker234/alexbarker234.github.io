import HeaderText from "@/components/HeaderText";
import RevealingSection from "../components/RevealingSection";

export default function ExperienceSection() {
  return (
    <RevealingSection
      id="experience"
      className="w-11/12 max-w-6xl mx-auto mb-4"
    >
      <HeaderText level="h1" className="text-4xl">
        Experience
      </HeaderText>
      <div className="flex flex-col lg:flex-row mt-8">
        <div className="w-full lg:mr-8 mb-4 lg:mb-0">
          <div className="font-black text-2xl mb-4">Education</div>
          <Experience
            title="B.S. in Computer Science & Cybersecurity"
            time="2021 - 2024"
          >
            <div>
              Bachelor of Science - Double major in Computer Science &
              Cybersecurity at UWA
            </div>
          </Experience>
        </div>
        <div className="w-full">
          <div className="font-black text-2xl mb-4">Experience</div>
          <Experience
            title="Wesfarmers Chemicals Energies & Fertilisers - Software Developer Cadet"
            time="Nov 2022 - Present"
          >
            <ul className="list-disc list-inside space-y-2">
              <li>Developing C# applications using ASP MVC & Razor Markup</li>
              <li>Creating & administrating Jira cloud projects</li>
              <li>Migrating our Jira server instance to Jira cloud</li>
              <li>
                Creating PowerShell integration scripts using multiple APIs,
                Azure & Microsoft Graph
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
            <div>
              Volunteer work in a large student-run team developing a
              <a
                href="https://github.com/codersforcauses/repair-labs"
                className="text-blue-500 underline"
              >
                {" "}
                Next JS web application{" "}
              </a>
              for a non-profit
            </div>
          </Experience>
          <Experience
            title="University Computer Club - Committee Member"
            time="Mar 2021 - Mar 2022"
          >
            Organising & running cross-club events and working with various
            systems
          </Experience>
        </div>
      </div>
    </RevealingSection>
  );
}

interface ExperienceProps {
  title: string;
  time: string;
  children: React.ReactNode;
}

const Experience = ({ title, time, children }: ExperienceProps) => (
  <div className="relative pl-4 border-l-2 border-blue mb-8 last:mb-0">
    <div className="font-black text-lg mb-1 -translate-y-1.5">{title}</div>
    <div className="border-b-2 border-blue w-fit mb-4">{time}</div>
    <div className="space-y-2">{children}</div>
    <span className="absolute w-4 h-4 rounded-md bg-blue left-0 top-0 -translate-x-1/2"></span>
  </div>
);
