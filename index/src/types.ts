export interface Skill {
  id: string;
  icon: string;
  title: string;
  types: string[];
}

export type ProjectTag = "react" | "nextjs" | "game" | "other";

export interface TopArtist {
  artistName: string;
  artistId: string;
  artistImageUrl: string;
  listenCount: string;
  totalDuration: string;
}

export interface TopArtistsResponse {
  period: string;
  limit: number;
  artists: TopArtist[];
}

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
