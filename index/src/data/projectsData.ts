import type { Project } from "../types";

const projects: Project[] = [
  {
    tags: ["react", "nextjs"],
    gitHubURL: "https://github.com/alexbarker234/songversation",
    imgSrc: "./project-images/argrage.png",
    title: "Argrage",
    description: "A car part marketplace",
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
    description: "View deals from different websites for your Steam wishlist",
    favourite: true
  },
  {
    tags: ["react", "nextjs"],
    appURL: "https://melodymapper.lexalot.dev",
    gitHubURL: "https://github.com/alexbarker234/melody-mapper",
    imgSrc: "./project-images/melodymapper.png",
    title: "Melody Mapper",
    description:
      "Explore new artists related to your existing favourites in a node graph and play snippets of their top songs.",
    favourite: true
  },
  {
    tags: ["game", "react", "nextjs"],
    appURL: "https://artistmaze.lexalot.dev",
    gitHubURL: "https://github.com/alexbarker234/artist-maze",
    imgSrc: "./project-images/artistmaze.png",
    title: "Artist Maze",
    description:
      "Try to connect two Spotify artists from their 20 most related artists",
    favourite: true
  },
  {
    tags: ["react", "nextjs"],
    gitHubURL: "https://github.com/alexbarker234/colonel-coin",
    imgSrc: "./project-images/colonel-coin.png",
    title: "Colonel Coin",
    description: "A discord bot + website to manage a game amongst friends",
    favourite: true
  },
  {
    tags: ["game", "react"],
    appURL: "./connect4",
    gitHubURL: "https://github.com/alexbarker234/connect4-react",
    imgSrc: "./project-images/connect4.png",
    title: "Connect 4",
    description: "Connect 4 written in react - play with friends or AI!"
  },
  {
    tags: ["game"],
    appURL: "./snowbound",
    gitHubURL: "https://github.com/alexbarker234/snowbound",
    imgSrc: "./project-images/snowbound.png",
    title: "Snowbound",
    description: "A basic clicker game using Webpack"
  },
  {
    tags: ["game"],
    appURL: "https://github.com/alexbarker234",
    gitHubURL: "https://github.com/alexbarker234/alexbarker234",
    imgSrc: "./project-images/birdgame.png",
    title: "GitHub Clicker",
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
    description: "A wordle clone made for a uni lab"
  },
  {
    tags: ["other"],
    appURL: "./metaballs",
    gitHubURL:
      "https://github.com/alexbarker234/alexbarker234.github.io/tree/main/metaballs",
    imgSrc: "./project-images/metaballs.png",
    title: "Metaballs",
    description: "A strange SVG metaballs visual display"
  }
];
export default projects;
