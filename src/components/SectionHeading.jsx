import Reveal from "./Reveal";

export default function SectionHeading({ label, title, description }) {
  return (
    <div className="mb-16 md:mb-20">
      <Reveal>
        <span className="inline-block font-mono text-[13px] tracking-[0.15em] uppercase text-accent mb-5">
          // {label}
        </span>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="text-[2rem] sm:text-4xl md:text-[2.75rem] lg:text-5xl font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={120}>
          <p className="mt-5 text-text-secondary text-lg leading-relaxed max-w-xl">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
