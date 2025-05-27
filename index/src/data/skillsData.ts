import type { Skill } from "../types";
import { iconMap } from "../utils/iconMap";

const skills: Skill[] = [
  {
    id: "C#",
    icon: iconMap.csharp,
    title: "C#",
    types: ["language"]
  },
  {
    id: "ASP.NET",
    icon: iconMap.aspnet,
    title: "ASP.NET",
    types: ["back-end"]
  },
  {
    id: "Python",
    icon: iconMap.python,
    title: "Python",
    types: ["language"]
  },
  {
    id: "CSS",
    icon: iconMap.css,
    title: "CSS",
    types: ["front-end"]
  },
  {
    id: "Sass",
    icon: iconMap.sass,
    title: "Sass",
    types: ["front-end"]
  },
  {
    id: "TailwindCSS",
    icon: iconMap.tailwindcss,
    title: "Tailwind",
    types: ["front-end"]
  },
  {
    id: "HTML",
    icon: iconMap.html,
    title: "HTML",
    types: ["front-end"]
  },
  {
    id: "JavaScript",
    icon: iconMap.javascript,
    title: "JavaScript",
    types: ["front-end", "language"]
  },
  {
    id: "TypeScript",
    icon: iconMap.typescript,
    title: "TypeScript",
    types: ["back-end", "language"]
  },
  {
    id: "Bash",
    icon: iconMap.bash,
    title: "Bash",
    types: ["language"]
  },
  {
    id: "PowerShell",
    icon: iconMap.powershell,
    title: "PowerShell",
    types: ["language"]
  },
  {
    id: "SQL",
    icon: iconMap.sql,
    title: "SQL",
    types: ["language"]
  },
  {
    id: "NodeJS",
    icon: iconMap.nodejs,
    title: "NodeJS",
    types: ["back-end"]
  },
  {
    id: "React",
    icon: iconMap.react,
    title: "React",
    types: ["front-end"]
  },
  {
    id: "Next.js",
    icon: iconMap.nextjs,
    title: "Next.js",
    types: ["back-end"]
  },
  {
    id: "Jira",
    icon: iconMap.jira,
    title: "Jira",
    types: ["misc"]
  },
  {
    id: "DevOps",
    icon: iconMap.devops,
    title: "Azure Devops",
    types: ["misc"]
  },
  {
    id: "GitHub",
    icon: iconMap.github,
    title: "GitHub",
    types: ["misc"]
  },
  {
    id: "Git",
    icon: iconMap.git,
    title: "Git",
    types: ["misc"]
  }
];

export default skills;
