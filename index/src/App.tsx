import "devicon/devicon.min.css";
import Nav from "./components/Nav";
import TopButton from "./components/TopButton";
import "./index.scss";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Header from "./sections/Header";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

const App = () => {
  return (
    <div className="main-content">
      <Header />
      <Nav />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <TopButton />
    </div>
  );
};

export default App;
