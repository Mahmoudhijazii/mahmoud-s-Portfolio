import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import HeroLaptop from "./HeroLaptop";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      <div className="relative max-w-[1100px] mx-auto w-full px-6 md:px-12 lg:px-24 grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-4 items-center pt-24 lg:pt-0">
        {/* Left: Text content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left order-2 lg:order-1"
        >
          {/* Status badge */}
          <motion.div variants={item} className="mb-7">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/60 bg-bg-card/50 backdrop-blur-sm text-[13px] text-text-secondary font-mono tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-[2.75rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem] xl:text-[5rem] font-bold tracking-[-0.04em] leading-[1.05]"
          >
            <span className="text-text-primary">I build products</span>
            <br />
            <span className="text-text-primary">that </span>
            <span className="gradient-text">ship.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="mt-6 text-[1.05rem] md:text-lg text-text-secondary max-w-[480px] mx-auto lg:mx-0 leading-[1.7]"
          >
            Full-stack engineer turning ideas into polished, production-ready
            applications. From concept to deployment — 20+ projects built, owned,
            and shipped.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            <a
              href="#projects"
              className="group whitespace-nowrap px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-all duration-300 inline-flex items-center gap-2 hover:shadow-md text-[14px]"
            >
              View My Work
              <ArrowDown
                size={14}
                className="group-hover:translate-y-0.5 transition-transform duration-300"
              />
            </a>
            <a
              href="/resume.pdf"
              download
              className="group whitespace-nowrap px-6 py-3 border border-accent/40 hover:border-accent text-accent hover:bg-accent-muted rounded-xl font-medium transition-all duration-300 inline-flex items-center gap-2 text-[14px]"
            >
              <Download size={14} />
              Resume
            </a>
            <a
              href="#contact"
              className="whitespace-nowrap px-6 py-3 border border-border/60 hover:border-border-hover text-text-primary rounded-xl font-medium transition-all duration-300 hover:bg-bg-card/60 text-[14px] inline-flex items-center"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={item}
            className="mt-10 flex items-center justify-center lg:justify-start gap-3"
          >
            {[
              { icon: GithubIcon, href: "https://github.com/Mahmoudhijazii", label: "GitHub" },
              { icon: LinkedinIcon, href: "https://linkedin.com/in/mahmoud-hijazi-897b64247", label: "LinkedIn" },
              { icon: Mail, href: "mailto:mahmoudhijjazii@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl border border-border/40 hover:border-accent/30 bg-bg-card/30 hover:bg-accent-muted text-text-tertiary hover:text-accent transition-all duration-300"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D Laptop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <HeroLaptop className="w-full max-w-[500px] lg:max-w-none aspect-square lg:aspect-auto lg:h-[500px] xl:h-[550px]" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[22px] h-[34px] rounded-full border border-border/50 flex items-start justify-center pt-2"
        >
          <div className="w-[3px] h-[6px] bg-text-tertiary/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
