import HeaderText from "@/components/HeaderText";
import RevealingSection from "@/components/RevealingSection";

export default function About() {
  return (
    <RevealingSection
      id="about"
      className="mx-auto w-11/12 max-w-5xl text-left"
    >
      <HeaderText level="h1" className="text-4xl">
        About
      </HeaderText>
      <p className="mb-4">
        I'm a software developer with a focus on full-stack web development.
        With a skill set spanning front-end and back-end technologies, I bring a
        creative, problem-solving approach to building intuitive, responsive,
        and high-performance web applications.
      </p>
      <p>
        My background in game development has refined my abilities in
        interactive design, optimisation, and user experience, all of which I
        integrate into my projects to create dynamic and engaging applications.
      </p>
    </RevealingSection>
  );
}
