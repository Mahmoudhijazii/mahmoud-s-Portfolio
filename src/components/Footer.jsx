import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30 py-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-text-tertiary font-mono tracking-tight">
          mahmoud<span className="text-accent">.</span>dev &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-3">
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
              className="text-text-tertiary hover:text-text-secondary transition-colors duration-300"
              aria-label={label}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
