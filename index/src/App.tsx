import "devicon/devicon.min.css";
import Experience from "./components/Experience";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import RevealingSection from "./components/RevealingSection";
import Skills from "./components/Skills";
import TopButton from "./components/TopButton";
import "./index.scss";

const App = () => {
  return (
    <div>
      <Header />
      <Nav />
      <RevealingSection id="about">
        <h1>About</h1>
        <p>
          I am a self-taught developer with a background in creating and
          implementing innovative features from ideation to production. I thrive
          on creative problem-solving and turning abstract ideas into functional
          code, all while prioritising user experience.
        </p>
        <p>
          I am dedicated to writing reusable and efficient code, ensuring that
          every project combines exceptional design, cutting-edge technology,
          and innovative solutions.
        </p>
      </RevealingSection>
      <Skills />
      <Experience />
      <Projects />
      <TopButton />
    </div>
  );
};

export default App;
