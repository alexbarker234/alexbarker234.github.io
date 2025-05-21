import type { Project } from "../types";

const projects: Project[] = [
  {
    tags: ["react", "nextjs", "game"],
    href: "https://songversation.lexalot.dev/",
    imgSrc: "./project-images/songversation.png",
    title: "Songversation",
    description: "A Spotify lyric guessing game",
    favourite: true
  },
  {
    tags: ["react", "nextjs"],
    href: "https://salesavant.lexalot.dev",
    imgSrc: "./project-images/salesavant.png",
    title: "Sale Savant",
    description: "View deals from different websites for your Steam wishlist",
    favourite: true
  },
  {
    tags: ["react", "nextjs"],
    href: "https://melodymapper.lexalot.dev",
    imgSrc: "./project-images/melodymapper.png",
    title: "Melody Mapper",
    description:
      "Explore new artists related to your existing favourites in a node graph and play snippets of their top songs.",
    favourite: true
  },
  {
    tags: ["game", "react", "nextjs"],
    href: "https://artistmaze.lexalot.dev",
    imgSrc: "./project-images/artistmaze.png",
    title: "Artist Maze",
    description:
      "Try to connect two Spotify artists from their 20 most related artists",
    favourite: true
  },
  {
    tags: ["game", "react"],
    href: "./connect4",
    imgSrc: "./project-images/connect4.png",
    title: "Connect 4",
    description: "Connect 4 written in react - play with friends or AI!"
  },
  {
    tags: ["game"],
    href: "./snowbound",
    imgSrc: "./project-images/snowbound.png",
    title: "Snowbound",
    description: "A basic clicker game using Webpack"
  },
  {
    tags: ["game"],
    href: "https://github.com/alexbarker234",
    imgSrc: "./project-images/birdgame.png",
    title: "GitHub Clicker",
    description:
      "A communal clicker game displayed on my GitHub profile Read Me"
  },
  {
    tags: ["game"],
    href: "./wordle",
    imgSrc: "./project-images/wordle.png",
    title: "Wordle Clone",
    description: "A wordle clone made for a uni lab"
  },
  {
    tags: ["other"],
    href: "./metaballs",
    imgSrc: "./project-images/metaballs.png",
    title: "Metaballs",
    description: "A strange SVG metaballs visual display"
  }
];
export default projects;
