import Reveal from "./Reveal";

export default function SectionWrapper({ id, children, className = "", dark = false }) {
  return (
    <section
      id={id}
      className={`relative py-28 md:py-36 px-6 md:px-12 lg:px-24 overflow-hidden ${
        dark ? "bg-bg-secondary/40" : ""
      } ${className}`}
    >
      <Reveal className="relative max-w-[1100px] mx-auto">
        {children}
      </Reveal>
    </section>
  );
}
