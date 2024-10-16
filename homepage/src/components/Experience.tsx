import RevealingSection from "./RevealingSection";

export default function ExperienceSection() {
  return (
    <RevealingSection id="resume">
      <h1>Resume</h1>
      <div className="resume-container">
        <div className="resume-part">
          <div className="title">Education</div>
          <div className="experience">
            <div className="title">
              B.S. in Computer Science & Cybersecurity
            </div>
            <div className="time">2021 - 2024</div>
            <div className="description">
              Bachelor of Science - Double major in Computer Science &
              Cybersecurity at UWA
            </div>
          </div>
        </div>
        <div className="resume-part">
          <div className="title">Experience</div>
          <Experience
            title="Wesfarmers Chemicals Energies & Fertilisers - Software Developer Cadet"
            time="Nov 2022 - Present"
            description={
              <ul>
                <li>Developing C# applications using ASP MVC & Razor Markup</li>
                <li>Creating & administrating Jira Cloud projects</li>
                <li>Migrating our Jira Server instance to Jira Cloud</li>
                <li>
                  Developing PowerShell integration scripts using multiple APIs,
                  Azure & Microsoft Graph
                </li>
              </ul>
            }
          />
          <Experience
            title="UWA Coders for Causes Project (Summer 2023/24)"
            time="Nov 2023 - Feb 2024"
            description={
              <div>
                Volunteer work in a large student-run team developing a
                <a
                  href="https://github.com/codersforcauses/repair-labs"
                  className="text-link"
                >
                  {" "}
                  Next JS web application{" "}
                </a>
                for a non-profit
              </div>
            }
          />
          <Experience
            title="University Computer Club - Committee Member"
            time="Mar 2021 - Mar 2022"
            description="Organising & running cross-club events and working with various systems"
          />
        </div>
      </div>
    </RevealingSection>
  );
}
interface ExperienceProps {
  title: string;
  time: string;
  description: React.ReactNode;
}

const Experience: React.FC<ExperienceProps> = ({
  title,
  time,
  description
}) => (
  <div className="experience">
    <div className="title">{title}</div>
    <div className="time">{time}</div>
    <div className="description">{description}</div>
  </div>
);
