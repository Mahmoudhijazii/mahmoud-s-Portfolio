import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "mahmoudhijjazii@gmail.com",
    href: "mailto:mahmoudhijjazii@gmail.com",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/Mahmoudhijazii",
    href: "https://github.com/Mahmoudhijazii",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/mahmoud-hijazi",
    href: "https://linkedin.com/in/mahmoud-hijazi-897b64247",
  },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact" dark>
      <div className="max-w-xl mx-auto text-center">
        <Reveal>
          <span className="inline-block font-mono text-[13px] tracking-[0.15em] uppercase text-accent mb-5">
            // Contact
          </span>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.1] mb-5">
            Let's build
            <br />
            <span className="gradient-text">something great.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-text-secondary text-[17px] mb-12 leading-relaxed">
            Looking for a developer who can take ownership and deliver?
            I'm open to full-time roles, contract work, and interesting collaborations.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="space-y-3 mb-10">
            {links.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glow group flex items-center justify-between p-4 rounded-xl border border-border bg-bg-card hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center group-hover:bg-accent-glow group-hover:scale-105 transition-all duration-300">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] text-text-tertiary font-mono uppercase tracking-[0.12em]">
                      {label}
                    </p>
                    <p className="text-text-primary text-[14px] font-medium">{value}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-text-tertiary group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <a
            href="mailto:mahmoudhijjazii@gmail.com"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-all duration-300 hover:shadow-md text-[15px]"
          >
            <Mail size={16} />
            Send me a message
          </a>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
