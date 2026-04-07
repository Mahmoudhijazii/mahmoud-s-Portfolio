import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import {
  ExternalLink,
  X,
  ChevronRight,
  Gavel,
  Shield,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";
import { GithubIcon } from "./Icons";

const iconMap = {
  Gavel,
  Shield,
  ShoppingCart,
  LayoutDashboard,
};

function ProjectThumbnail({ image, title, className = "" }) {
  const Icon = iconMap[image?.icon] || LayoutDashboard;

  return (
    <div
      className={`relative aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br ${
        image?.gradient || "from-accent/20 to-accent-secondary/20"
      } border border-white/[0.04] ${className}`}
    >
      {/* Subtle grid pattern inside thumbnail */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          size={40}
          className="text-white/20 group-hover:text-white/30 group-hover:scale-110 transition-all duration-500"
          strokeWidth={1.2}
        />
      </div>
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-primary/60 to-transparent" />
    </div>
  );
}

function ProjectCard({ project, index, onClick }) {
  return (
    <Reveal delay={index * 100}>
      <div
        onClick={onClick}
        className="card-glow group rounded-2xl border border-border/40 bg-bg-card/30 hover:bg-bg-card-hover hover:border-border-hover transition-all duration-500 cursor-pointer overflow-hidden h-full flex flex-col"
      >
        {/* Thumbnail */}
        <div className="p-3 pb-0">
          <ProjectThumbnail image={project.image} title={project.title} />
        </div>

        {/* Content */}
        <div className="p-6 pt-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-300 tracking-tight">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono text-text-tertiary bg-bg-tertiary/50 px-2 py-0.5 rounded-full shrink-0 ml-3 mt-1">
              {project.role}
            </span>
          </div>

          <p className="text-[14px] text-text-secondary leading-relaxed mb-5 line-clamp-2 flex-1">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2.5 py-1 rounded-md border border-border/40 text-text-tertiary font-mono"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-[11px] px-2.5 py-1 rounded-md border border-border/40 text-text-tertiary font-mono">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center text-[13px] text-text-tertiary group-hover:text-accent transition-colors duration-300 font-medium mt-auto">
            View project
            <ChevronRight
              size={14}
              className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const Icon = iconMap[project.image?.icon] || LayoutDashboard;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-secondary border border-border/60 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
      >
        {/* Thumbnail in modal */}
        <div className="p-4 pb-0">
          <div
            className={`relative aspect-[16/8] rounded-xl overflow-hidden bg-gradient-to-br ${
              project.image?.gradient || "from-accent/20 to-accent-secondary/20"
            } border border-white/[0.04]`}
          >
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon size={56} className="text-white/15" strokeWidth={1} />
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 pt-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary transition-all z-10 bg-bg-secondary/80 backdrop-blur-sm"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-1">
            {project.title}
          </h3>
          <p className="text-[14px] font-mono text-accent mb-8">
            {project.role}
          </p>

          <p className="text-text-secondary text-[15px] leading-[1.8] mb-7">
            {project.description}
          </p>

          {project.outcome && (
            <div className="p-5 rounded-xl bg-accent-muted/50 border border-accent/10 mb-7">
              <p className="text-[14px] text-text-secondary leading-relaxed">
                <span className="text-accent font-semibold">Outcome: </span>
                {project.outcome}
              </p>
            </div>
          )}

          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.15em] text-text-tertiary font-mono mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[12px] px-3 py-1.5 rounded-lg border border-border/60 bg-bg-card text-text-secondary font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 hover:border-border-hover text-text-secondary hover:text-text-primary text-[14px] font-medium transition-all duration-300"
              >
                <GithubIcon size={15} />
                Source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-[14px] font-medium transition-all duration-300 hover:shadow-md"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        label="Projects"
        title="Select work."
        description="Projects I've designed, built, and shipped — from real-time platforms to full-stack applications."
      />

      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
