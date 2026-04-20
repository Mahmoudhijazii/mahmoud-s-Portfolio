import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Code2, Layers, Rocket, GraduationCap } from "lucide-react";
import profileImg from "../assets/image.jpg";

const stats = [
  { icon: Code2, value: "20+", label: "Projects Built", desc: "End-to-end, solo" },
  { icon: Layers, value: "Full", label: "Stack Coverage", desc: "Frontend to backend" },
  { icon: Rocket, value: "3+", label: "Companies", desc: "Production shipped" },
  { icon: GraduationCap, value: "CS", label: "Degree", desc: "Strong foundations" },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading label="About" title="Engineer who builds." />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Photo */}
        <div className="lg:col-span-3 flex justify-center lg:justify-start">
          <Reveal>
            <div className="relative group">
              {/* Glow ring behind photo */}
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 via-accent-secondary/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Photo container */}
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 lg:w-full lg:h-auto lg:aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border group-hover:border-accent/40 transition-colors duration-500 shadow-lg">
                <img
                  src={profileImg}
                  alt="Mahmoud Hijazi"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bg-primary/60 to-transparent" />
              </div>
              {/* Decorative corner accent */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-accent/40 rounded-br-lg" />
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-accent/40 rounded-tl-lg" />
            </div>
          </Reveal>
        </div>

        {/* Text */}
        <div className="lg:col-span-5 space-y-5">
          <Reveal delay={60}>
            <p className="text-text-secondary text-[17px] leading-[1.8]">
              I'm a Computer Science graduate and full-stack developer who believes in
              building things that work in the real world — not just in demos. With 20+
              projects built independently and professional experience shipping production
              software, I bring both technical depth and product awareness to every project.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-text-secondary text-[17px] leading-[1.8]">
              I don't just write code — I architect solutions. From real-time bidding systems
              to fleet management dashboards, I've owned entire products from database design
              to deployment. My focus is on clean architecture, premium user interfaces, and
              code that scales.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-text-secondary text-[17px] leading-[1.8]">
              Currently the main developer on{" "}
              <span className="text-text-primary font-medium">Auctions For All</span> —
              Lebanon's first auction platform. I handle everything from real-time
              WebSocket communication to payment integration and admin systems.
            </p>
          </Reveal>
        </div>

        {/* Stats grid */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3 content-start">
          {stats.map(({ icon: Icon, value, label, desc }, i) => (
            <Reveal key={label} delay={100 + i * 60}>
              <div className="card-glow p-5 rounded-2xl border border-border bg-bg-card hover:border-accent/30 transition-all duration-400 group h-full">
                <div className="w-9 h-9 rounded-lg bg-accent-muted flex items-center justify-center mb-3 group-hover:bg-accent-glow transition-colors duration-300">
                  <Icon size={16} className="text-accent" strokeWidth={2} />
                </div>
                <p className="text-2xl font-bold text-text-primary tracking-tight">{value}</p>
                <p className="text-[13px] text-text-secondary font-medium mt-0.5">{label}</p>
                <p className="text-[11px] text-text-tertiary mt-0.5">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
