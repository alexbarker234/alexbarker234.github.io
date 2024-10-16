export interface Skill {
  id: string;
  icon: string;
  title: string;
  types: string[];
}

export type ProjectTag = "react" | "nextjs" | "game" | "other";

export interface Project {
  tags: ProjectTag[];
  href: string;
  imgSrc: string;
  title: string;
  description: string;
  favourite?: boolean;
}
