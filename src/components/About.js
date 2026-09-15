"use client";

import SectionLayout from "@/components/SectionLayout";

export default function About() {
  return (
    <SectionLayout id="about" title="About">
      <p className="max-w-[60ch] text-base leading-[1.8] text-text md:text-lg md:leading-[1.85]">
        Hello, welcome to my portfolio. I&#8217;m Joseph, a backend engineer
        who&#8217;s all about building{" "}
        <span className="font-mono font-medium text-accent">
          reliable systems
        </span>{" "}
        that power real-world applications, APIs, data models, and everything
        underneath that makes the rest of the app work. Most of my time goes into
        Python and Django, currently deep in personal projects to sharpen that
        edge before moving towards cloud engineering. I care about{" "}
        <span className="font-mono font-medium text-accent">
          clean designs and clear plans
        </span>{" "}
        over clever ones. Outside of code, I&#8217;m usually watching MMA or
        messing with sound engineering. Feel free to hit me up if you want to
        talk about work, tech, or life in general.
      </p>
    </SectionLayout>
  );
}
