"use client";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    title: "Inventory Manager",
    description: "Database management system designed to handle entity relations, enforce constraints, and execute complex queries natively.",
    tags: ["SQL", "ER Diagrams", "DDL", "DML"],
    github: "https://github.com/UjjwalShreyas/Inventory-manager",
  },
  {
    title: "The CODARA",
    description: "Code & Git repository analyzer powered by Groq + Gemini API — delivering deep insights into codebases at lightning speed.",
    tags: ["React", "Node.js", "Groq", "Gemini", "GitHub API"],
    github: "https://github.com/UjjwalShreyas/CODARA",
    liveUrl: "https://thecodara.vercel.app/",
  },
  {
    title: "Humanizer AI",
    description: "Artificial Intelligence project aimed at parsing, synthesizing, and generating human-like natural language.",
    tags: ["AI", "NLP", "Python"],
    github: "https://github.com/UjjwalShreyas/humanizer-ai",
    liveUrl: "https://undetectify.vercel.app/",
  },
  {
    title: "Psychologist Site",
    description: "Clean, accessible web interface designed specifically for psychological consultancy scheduling and information.",
    tags: ["Web Dev", "UI/UX", "HTML/CSS"],
    github: "https://github.com/UjjwalShreyas/psychologist-site",
    liveUrl: "https://www.sumakavitha.online/",
  },
  {
    title: "YouTube Video Downloader",
    description: "Cross-platform graphical utility allowing high-speed downloads directly from YouTube using a clean interface.",
    tags: ["Python", "Tkinter", "yt-dlp"],
    github: "https://github.com/UjjwalShreyas/youtube_downloader",
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-[var(--color-dark-bg)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-heading text-4xl md:text-6xl text-white text-center mb-16">
          My <span className="text-[var(--color-scarlet-red)]">Projects</span>
        </h2>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="bg-[var(--color-dark-surface)] border border-gray-800 rounded-2xl p-8 flex flex-col justify-between group hover:border-[var(--color-scarlet-red)] transition-all duration-500 relative overflow-hidden h-full"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-scarlet-red)]/0 via-transparent to-[var(--color-scarlet-red)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="z-10 relative flex flex-col h-full">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-semibold px-3 py-1 bg-[var(--color-scarlet-red)]/10 text-[var(--color-scarlet-red)] rounded-full border border-[var(--color-scarlet-red)]/20 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex-shrink-0">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--color-scarlet-red)] transition-colors" data-interactive="true">
                      <FiGithub size={18} />
                    </a>
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-heading text-white mb-3 tracking-wide group-hover:text-[var(--color-scarlet-red)] transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">{project.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 flex-wrap">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex text-[var(--color-scarlet-red)] font-medium text-sm tracking-wider uppercase items-center gap-2 group-hover:underline" data-interactive="true">
                    View on GitHub <span>→</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-interactive="true"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white border border-gray-700 hover:border-[var(--color-scarlet-red)] px-3 py-1.5 rounded-full transition-all duration-300"
                    >
                      <FiExternalLink size={13} />
                      Live Site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
