export interface Skill {
  id: string;
  icon: string;
  title: string;
  types: string[];
}

export type ProjectTag = "react" | "nextjs" | "game" | "other";

export interface Project {
  tags: ProjectTag[];

  appURL?: string;
  gitHubURL?: string;

  techIcon?: string[];

  imgSrc: string;
  title: string;
  description: string;
  extendedDescription?: string;

  favourite?: boolean;
  banner?: "archived" | "wip";
}
