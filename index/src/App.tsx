import "devicon/devicon.min.css";
import Nav from "./components/Nav";
import TopButton from "./components/TopButton";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Header from "./sections/Header";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

const App = () => {
  return (
    <main
      className="animate-fade-in opacity-0 font-sans text-white scroll-smooth scroll-pt-8 bg-bg1
        md:scroll-pt-24"
    >
      <Header />
      <Nav />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <TopButton />
    </main>
  );
};

export default App;
