import { useReveal } from "../hooks/useReveal";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  direction = "up",
}) {
  const { ref, visible } = useReveal(0.08);

  const translateMap = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    none: "",
  };

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${translateMap[direction]}`
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
