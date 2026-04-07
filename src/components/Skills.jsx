import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skillCategories } from "../data/skills";

function SkillCategory({ category, index }) {
  return (
    <Reveal delay={index * 60}>
      <div className="card-glow p-6 rounded-2xl border border-border/40 bg-bg-card/40 hover:bg-bg-card-hover hover:border-border-hover transition-all duration-400 h-full">
        <h3 className="text-[12px] font-mono text-accent uppercase tracking-[0.15em] mb-5">
          {category.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="text-[13px] px-3 py-1.5 rounded-lg bg-bg-tertiary/50 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-300 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills" dark>
      <SectionHeading
        label="Tech Stack"
        title="Tools I work with."
        description="A focused, modern stack for building complete products."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, i) => (
          <SkillCategory key={category.title} category={category} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
