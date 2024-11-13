import RevealingSection from "../components/RevealingSection";
import "./experience.scss";

export default function ExperienceSection() {
  return (
    <RevealingSection id="resume">
      <h1>Experience</h1>
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
          >
            <ul>
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
                className="text-link"
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

const Experience: React.FC<ExperienceProps> = ({ title, time, children }) => (
  <div className="experience">
    <div className="title">{title}</div>
    <div className="time">{time}</div>
    <div className="description">{children}</div>
  </div>
);
