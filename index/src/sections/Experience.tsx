import HeaderText from "@/components/HeaderText";
import { cn } from "@/utils/cn";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCertificate, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useId, useState } from "react";
import RevealingSection from "../components/RevealingSection";

/**
 * Linear easing matching `--ease-bounce` in `src/index.css`:
 */
const EASE_BOUNCE_STOPS: readonly [number, number][] = [
  [0, 0],
  [0.186, 0.596],
  [0.39, 0.933],
  [0.492, 1.009],
  [0.606, 1.042],
  [1, 1]
];

function easeBounce(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  for (let i = 0; i < EASE_BOUNCE_STOPS.length - 1; i++) {
    const [t0, y0] = EASE_BOUNCE_STOPS[i];
    const [t1, y1] = EASE_BOUNCE_STOPS[i + 1];
    if (t <= t1) {
      const u = (t - t0) / (t1 - t0);
      return y0 + (y1 - y0) * u;
    }
  }
  return 1;
}

const experiencePanelVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.22, ease: [0.4, 0, 0.6, 1] as const },
      opacity: { duration: 0.18, ease: "easeIn" as const }
    }
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.38, ease: easeBounce },
      opacity: { duration: 0.3, ease: "easeIn" }
    }
  }
} as const;

type ExperienceIcon =
  | { kind: "image"; file: string; alt: string; bgClass?: string }
  | {
      kind: "fontawesome";
      icon: IconDefinition;
      className?: string;
      bgClass?: string;
    };

type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  icon: ExperienceIcon;
  details: ReactNode;
};

const SkillTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2 text-sm font-semibold">
    {tags.map((tag, index) => (
      <div
        key={index}
        className="w-fit rounded-full bg-blue px-2 py-0.5 text-nowrap text-text-color"
      >
        {tag}
      </div>
    ))}
  </div>
);

function ExperienceIconBadge({ icon }: { icon: ExperienceIcon }) {
  const surface = icon.bgClass ?? "bg-bg1/80";

  const frame = cn(
    "size-10 shrink-0 overflow-hidden rounded-lg border border-white/10 md:size-11",
    surface
  );

  if (icon.kind === "image") {
    return (
      <div className={frame}>
        <img
          src={`${import.meta.env.BASE_URL}experience-images/${icon.file}`}
          alt={icon.alt}
          className="size-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={cn(frame, "flex items-center justify-center")}>
      <FontAwesomeIcon
        icon={icon.icon}
        className={cn("text-lg text-blue-light", icon.className)}
      />
    </div>
  );
}

const EXPERIENCES: ExperienceEntry[] = [
  {
    id: "wcef-dev",
    company: "Wesfarmers Chemicals, Energy & Fertilisers",
    role: "Application Developer",
    period: "May 2025 - Present",
    icon: { kind: "image", file: "wescef.png", alt: "" },
    details: (
      <>
        <SkillTags tags={["C#", "SQL", "React", "Angular", ".NET MAUI"]} />
        <ul className="ml-5 list-outside list-disc space-y-2">
          <li>Developing Angular and React applications using TypeScript</li>
          <li>Building .NET REST APIs</li>
          <li>
            Migrating a Xamarin mobile application to .NET MAUI and developing
            new features for the app
          </li>
          <li>Implementing Azure services for cloud-based solutions</li>
        </ul>
      </>
    )
  },
  {
    id: "wcef-cadet",
    company: "Wesfarmers Chemicals, Energy & Fertilisers",
    role: "Software Developer Cadet",
    period: "Nov 2022 - Dec 2024",
    icon: { kind: "image", file: "wescef.png", alt: "" },
    details: (
      <>
        <SkillTags tags={["C#", "SQL", "PowerShell", "Jira", "Azure"]} />
        <ul className="ml-5 list-outside list-disc space-y-2">
          <li>Developing C# applications using ASP MVC & Razor Markup</li>
          <li>Creating & administrating Jira cloud projects</li>
          <li>Migrating our Jira server instance to Jira cloud</li>
          <li>
            Creating PowerShell integration scripts using multiple APIs, Azure &
            Microsoft Graph
          </li>
          <li>
            Developing Dynamics365 Model-Driven apps using PowerApps &
            JavaScript
          </li>
        </ul>
      </>
    )
  },
  {
    id: "cfc",
    company: "UWA Coders for Causes",
    role: "Volunteer Developer",
    period: "Nov 2023 - Feb 2024",
    icon: { kind: "image", file: "cfc.png", alt: "" },
    details: (
      <>
        <SkillTags tags={["NextJS", "TypeScript"]} />
        <ul className="ml-5 list-outside list-disc space-y-2">
          <li>
            Volunteer work in a large student-run team developing a{" "}
            <a
              href="https://github.com/codersforcauses/repair-labs"
              className="text-blue-light hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js web application
            </a>{" "}
            for a non-profit
          </li>
        </ul>
      </>
    )
  },
  {
    id: "ucc",
    company: "University Computer Club",
    role: "Committee Member",
    period: "Mar 2021 - Mar 2022",
    icon: { kind: "image", file: "ucc.png", alt: "" },
    details: (
      <>
        <SkillTags tags={["Linux", "Networking", "Event Planning"]} />
        <ul className="ml-5 list-outside list-disc space-y-2">
          <li>Organising & running cross-club events</li>
          <li>Working with various Linux and networking systems</li>
        </ul>
      </>
    )
  },
  {
    id: "degree",
    company: "The University of Western Australia",
    role: "B.S. Computer Science & Cybersecurity",
    period: "2021 - 2024",
    icon: { kind: "fontawesome", icon: faCertificate },
    details: (
      <>
        <SkillTags tags={["Java", "Python", "C", "SQL"]} />
        <p>
          Bachelor of Science — double major in Computer Science & Cybersecurity
          at UWA.
        </p>
      </>
    )
  },
  {
    id: "mod-team",
    company: "Video Game Mod Development",
    role: "Team Lead & Developer",
    period: "2017 - 2022",
    icon: { kind: "fontawesome", icon: faGamepad },
    details: (
      <>
        <SkillTags
          tags={["C#", "Git", "Team Leadership", "Project Management"]}
        />
        <ul className="ml-5 list-outside list-disc space-y-2">
          <li>Led a team of volunteer developers creating a mod for a game</li>
          <li>
            Coordinated feature development and bug fixes across multiple
            releases
          </li>
          <li>Managed Git workflow for team contributions</li>
          <li>
            Engaged with community feedback to guide development priorities
          </li>
        </ul>
      </>
    )
  }
];

export default function ExperienceSection() {
  const [openIds, setOpenIds] = useState(() => new Set<string>());
  const baseId = useId();

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <RevealingSection
      id="experience"
      className="mx-auto my-4 w-11/12 max-w-2xl"
    >
      <HeaderText level="h1" className="text-4xl my-6">
        Experience
      </HeaderText>
      <div className="space-y-2" role="list">
        {EXPERIENCES.map((entry) => {
          const isOpen = openIds.has(entry.id);
          const panelId = `${baseId}-${entry.id}-panel`;
          const triggerId = `${baseId}-${entry.id}-trigger`;

          return (
            <div
              key={entry.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-bg-dark/50
                transition-colors hover:bg-bg-dark/70"
              role="listitem"
            >
              <button
                type="button"
                id={triggerId}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left
                  md:gap-4 md:px-4 md:py-3.5 disabled:cursor-not-allowed"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleOpen(entry.id)}
              >
                <ExperienceIconBadge icon={entry.icon} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-text-color">
                    {entry.company}
                  </div>
                  <div className="mt-0.5 text-sm text-grey-light">
                    <span>{entry.role}</span>
                    <span className="mx-1.5 text-grey-light/70" aria-hidden>
                      •
                    </span>
                    <span>{entry.period}</span>
                  </div>
                </div>
                <motion.span
                  className="text-grey-light"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden
                >
                  <ChevronIcon />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    variants={experiencePanelVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="overflow-hidden"
                  >
                    <div
                      className="space-y-3 border-t border-white/10 px-3 pb-4 pt-2 text-sm text-grey-light
                        md:px-4 md:pb-5"
                    >
                      {entry.details}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </RevealingSection>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="size-4 shrink-0 md:size-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}
