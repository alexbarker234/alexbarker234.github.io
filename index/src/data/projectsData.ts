import { iconMap } from "@/utils/iconMap";
import type { Project } from "../types";

const projects: Project[] = [
  {
    tags: ["react", "nextjs"],
    imgSrc: "./project-images/argrage.png",
    title: "Argrage",
    techIcon: [iconMap.react, iconMap.nextjs, iconMap.django],
    description: "A car part marketplace",
    banner: "wip",
    extendedDescription:
      "A car part marketplace where you can buy and sell car parts\n\n(New website coming soon)",
    favourite: true
  },
  {
    tags: ["react", "nextjs", "game"],
    appURL: "https://songversation.lexalot.dev/",
    gitHubURL: "https://github.com/alexbarker234/songversation",
    imgSrc: "./project-images/songversation.png",
    title: "Songversation",
    techIcon: [iconMap.react, iconMap.nextjs],
    description: "A Spotify lyric guessing game",
    extendedDescription:
      "A Spotify lyric guessing game where players can select from any Spotify artist or public playlist",
    favourite: true
  },
  {
    tags: ["react", "nextjs"],
    appURL: "https://salesavant.lexalot.dev",
    gitHubURL: "https://github.com/alexbarker234/sale-savant",
    imgSrc: "./project-images/salesavant.png",
    title: "Sale Savant",
    techIcon: [iconMap.react, iconMap.nextjs],

    description: "View deals from different websites for your Steam wishlist",
    favourite: true
  },
  {
    tags: ["game"],
    imgSrc: "./project-images/boat-and-bobber.png",
    appURL: "./boat-and-bobber",
    gitHubURL: "https://github.com/alexbarker234/boat-and-bobber",
    title: "Boat and Bobber",
    techIcon: [iconMap.threejs, iconMap.vite],
    banner: "wip",
    description: "A Three.JS fishing game",
    extendedDescription:
      "A Three.JS fishing game where you can catch fish through a rhythm game.\n\nIncludes a multiplayer mode where you can fish with friends."
  },
  {
    tags: ["react", "nextjs"],
    gitHubURL: "https://github.com/alexbarker234/melody-mapper",
    imgSrc: "./project-images/melodymapper.png",
    title: "Melody Mapper",
    techIcon: [iconMap.react, iconMap.nextjs],
    banner: "archived",
    description: "A node force graph displaying similar Spotify artists.",
    extendedDescription:
      "Explore new artists related to your existing favourites in a node graph and play snippets of their top songs.\n\nUnfortunately, Spotify removed their APIs for finding related artists, so this project is no longer functional."
  },
  {
    tags: ["game", "react", "nextjs"],
    gitHubURL: "https://github.com/alexbarker234/artist-maze",
    imgSrc: "./project-images/artistmaze.png",
    title: "Artist Maze",
    techIcon: [iconMap.react, iconMap.nextjs],
    banner: "archived",
    description:
      "Try to connect two Spotify artists from their 20 most related artists",
    extendedDescription:
      "Try to connect two Spotify artists from their 20 most related artists.\n\nUnfortunately, Spotify removed their APIs for finding related artists, so this project is no longer functional."
  },
  {
    tags: ["react", "nextjs"],
    gitHubURL: "https://github.com/alexbarker234/colonel-coin",
    imgSrc: "./project-images/colonel-coin.png",
    title: "Colonel Coin",
    techIcon: [
      iconMap.react,
      iconMap.nextjs,
      iconMap.discordjs,
      iconMap.typescript
    ],
    description: "A discord bot + website to manage a game amongst friends",
    extendedDescription:
      "A discord bot + website to manage a game amongst friends\nFeatures a website and database to manage various minigames"
  },
  {
    tags: ["game", "react"],
    appURL: "./connect4",
    gitHubURL: "https://github.com/alexbarker234/connect4-react",
    imgSrc: "./project-images/connect4.png",
    title: "Connect 4",
    techIcon: [iconMap.react],

    description: "Connect 4 written in react - play with friends or AI!"
  },
  {
    tags: ["game"],
    appURL: "./snowbound",
    gitHubURL: "https://github.com/alexbarker234/snowbound",
    imgSrc: "./project-images/snowbound.png",
    title: "Snowbound",
    techIcon: [iconMap.typescript, iconMap.webpack],

    description: "A basic clicker game using Webpack"
  },
  {
    tags: ["game"],
    appURL: "https://github.com/alexbarker234",
    gitHubURL: "https://github.com/alexbarker234/alexbarker234",
    imgSrc: "./project-images/birdgame.png",
    title: "GitHub Clicker",
    techIcon: [iconMap.vercel, iconMap.mongodb],
    description:
      "A communal clicker game displayed on my GitHub profile Read Me"
  },
  {
    tags: ["game"],
    appURL: "./wordle",
    gitHubURL:
      "https://github.com/alexbarker234/alexbarker234.github.io/tree/main/wordle",
    imgSrc: "./project-images/wordle.png",
    title: "Wordle Clone",
    techIcon: [iconMap.html, iconMap.javascript],
    description: "A wordle clone made for a uni lab"
  },
  {
    tags: ["other"],
    appURL: "./metaballs",
    gitHubURL:
      "https://github.com/alexbarker234/alexbarker234.github.io/tree/main/metaballs",
    imgSrc: "./project-images/metaballs.png",
    title: "Metaballs",
    techIcon: [iconMap.css],
    description: "A strange SVG metaballs visual display"
  }
];
export default projects;
