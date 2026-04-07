import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Zap, Package, Eye, Shield, Wrench, Target } from "lucide-react";

const values = [
  {
    icon: Package,
    title: "Full Product Ownership",
    description:
      "I own the full lifecycle — architecture, database design, APIs, polished UI, and deployment. No half-built handoffs.",
  },
  {
    icon: Zap,
    title: "Solo Execution Speed",
    description:
      "20+ projects built independently. Give me a problem and a deadline, I'll deliver a working solution.",
  },
  {
    icon: Eye,
    title: "Design-Aware Code",
    description:
      "I write code with the user experience in mind. Clean interfaces, smooth interactions, pixel-level attention to detail.",
  },
  {
    icon: Shield,
    title: "Production Mindset",
    description:
      "Auth, error handling, real-time systems, scalable architecture — everything I build is meant for the real world.",
  },
  {
    icon: Wrench,
    title: "Modern Stack",
    description:
      "React, Node.js, Tailwind, WebSockets — I use the tools modern teams use, and I use them with fluency.",
  },
  {
    icon: Target,
    title: "Problem-First Thinking",
    description:
      "Every technical decision serves the actual problem. No over-engineering, no unnecessary complexity.",
  },
];

export default function WhyMe() {
  return (
    <SectionWrapper id="why-me">
      <SectionHeading
        label="Why Work With Me"
        title="What I bring to the table."
        description="Beyond writing code — ownership, speed, and product thinking."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {values.map((value, i) => (
          <Reveal key={value.title} delay={i * 50}>
            <div className="card-glow group p-6 rounded-2xl border border-border/40 bg-bg-card/40 hover:bg-bg-card-hover hover:border-border-hover transition-all duration-400 h-full">
              <div className="w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center mb-5 group-hover:bg-accent-glow group-hover:scale-105 transition-all duration-300">
                <value.icon size={18} className="text-accent" strokeWidth={1.8} />
              </div>
              <h3 className="text-text-primary font-semibold tracking-tight mb-2">{value.title}</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
