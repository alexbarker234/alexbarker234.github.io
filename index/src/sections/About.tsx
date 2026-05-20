import HeaderText from "@/components/HeaderText";
import RevealingSection from "@/components/RevealingSection";

export default function About() {
  return (
    <RevealingSection id="about" className="mx-auto w-11/12 text-left">
      <HeaderText level="h1" className="text-4xl">
        About Me
      </HeaderText>
      <div
        className="rounded-lg border border-white/10 bg-bg-dark/50 p-8 my-8 max-w-2xl mx-auto flex
          flex-col gap-4"
      >
        <p>
          I'm a <strong>software developer</strong> with a focus on{" "}
          <strong>full-stack web development</strong>. With a skill set spanning
          front-end and back-end technologies, I bring a creative,
          problem-solving approach to building intuitive, responsive, and
          high-performance web applications.
        </p>
        <p>
          My background in game development has refined my abilities in
          interactive design, optimisation, and user experience, all of which I
          integrate into my projects to create dynamic and engaging
          applications.
        </p>
        <p>
          I am also <strong>really</strong> into music, check out what I've been
          grooving to lately:
        </p>
        <div className="flex flex-col gap-2 text-center py-4">
          <span className="text-lg text-white/60 italic">Coming soon...</span>
        </div>
      </div>
    </RevealingSection>
  );
}
