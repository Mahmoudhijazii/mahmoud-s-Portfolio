import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experiences } from "../data/experience";

function ExperienceCard({ experience, index, isLast }) {
  return (
    <Reveal delay={index * 80}>
      <div className="relative pl-8 md:pl-10 pb-12 last:pb-0 group">
        {/* Timeline line */}
        {!isLast && (
          <div className="absolute left-[7px] md:left-[9px] top-[22px] bottom-0 w-px bg-gradient-to-b from-border via-border to-transparent" />
        )}

        {/* Timeline dot */}
        <div className="absolute left-0 top-[6px] w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 border-border bg-bg-primary group-hover:border-accent/50 group-hover:bg-accent-muted transition-all duration-400 z-10">
          <div className="absolute inset-[3px] md:inset-[4px] rounded-full bg-text-tertiary group-hover:bg-accent transition-colors duration-400" />
        </div>

        {/* Card */}
        <div className="card-glow p-6 md:p-8 rounded-2xl border border-border/60 bg-bg-card/50 hover:bg-bg-card-hover hover:border-border-hover transition-all duration-400">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-text-primary tracking-tight">
                {experience.role}
              </h3>
              <p className="text-accent font-medium text-[15px]">{experience.company}</p>
            </div>
            <span className="text-[12px] text-text-tertiary font-mono tracking-wider bg-bg-tertiary/50 px-3 py-1 rounded-full shrink-0 self-start">
              {experience.period}
            </span>
          </div>

          <p className="text-text-secondary text-[15px] leading-relaxed mb-5">
            {experience.description}
          </p>

          <ul className="space-y-2.5 mb-6">
            {experience.impact.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] text-text-secondary">
                <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2.5 py-1 rounded-md border border-border/50 text-text-tertiary font-mono bg-bg-tertiary/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <SectionWrapper id="experience" dark>
      <SectionHeading
        label="Experience"
        title="Where I've shipped."
        description="Professional experience building and shipping production software."
      />

      <div>
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.company}
            experience={exp}
            index={i}
            isLast={i === experiences.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
