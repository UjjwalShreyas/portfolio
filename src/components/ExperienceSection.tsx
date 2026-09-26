"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";

const workExperiences = [
  {
    role: "Full Stack Developer Intern",
    company: "OTBI, Osmania University",
    location: "Hyderabad, Telangana",
    period: "2026 – 2026 ",
    type: "On Site",
    description: [
    "Built Aaharika, an AI-powered smart pantry and nutrition tracking web application for Indian households as part of a three-person startup team incubated at OTBI.",
    "Developed the full-stack architecture using Next.js, React 19, TypeScript, Tailwind CSS v4, and Supabase PostgreSQL for real-time data synchronization.",
    "Integrated Google Gemini Vision (2.0-flash) API to enable intelligent food recognition and nutritional analysis from user-captured pantry images.",
    "Implemented Google OAuth authentication, real-time meal tracking, and inventory management across a responsive web interface.",
    "Deployed and maintained the live application at aaharikaotbi.vercel.app."
  ],

  skills: [
    "Next.js","React","TypeScript","Tailwind CSS v4","Supabase","Google Gemini API","Google OAuth","REST APIs"]
  },
  {
    role: "Web Developer",
    company: "Freelance / Personal Projects",
    location: "Hyderabad, India",
    period: "2024 – Present",
    type: "Self-Employed",
    description: [
      "Architected and deployed full-stack web applications for clients  regarding an  appointment scheduling app. ",
      "Developed portfolios for clients ",
      "Designed database solutions utilizing SQL DDL/DML constraints, entity-relationship models, and high-performance querying."
    ],
    skills: ["React", "Next.js", "Node.js", "Python", "SQL", "Groq AI", "Gemini API"]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-[var(--color-dark-surface)]/20 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-heading text-4xl md:text-6xl text-white text-center mb-4">
          My <span className="text-[var(--color-scarlet-red)]">Experience</span>
        </h2>
        <p className="text-gray-500 text-center mb-16 text-sm uppercase tracking-widest">
          Professional & Practical Development Background
        </p>

        <div className="space-y-8 max-w-5xl mx-auto">
          {workExperiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-[var(--color-dark-surface)] border border-gray-800 rounded-2xl p-8 hover:border-[var(--color-scarlet-red)]/50 transition-all duration-300 relative overflow-hidden group shadow-xl"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-scarlet-red)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-gray-800/80 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-2xl font-bold text-white tracking-wide">{exp.role}</h3>
                    <span className="text-xs font-semibold px-3 py-1 bg-[var(--color-scarlet-red)]/10 text-[var(--color-scarlet-red)] rounded-full border border-[var(--color-scarlet-red)]/20">
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-scarlet-red)] font-medium text-lg">
                    <FiBriefcase className="text-sm" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-400">
                  <span className="flex items-center gap-1.5 bg-[var(--color-dark-bg)] px-3 py-1.5 rounded-lg border border-gray-800">
                    <FiCalendar className="text-[var(--color-scarlet-red)]" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[var(--color-dark-bg)] px-3 py-1.5 rounded-lg border border-gray-800">
                    <FiMapPin className="text-[var(--color-scarlet-red)]" /> {exp.location}
                  </span>
                </div>
              </div>

              {/* Responsibilities / Highlights */}
              <ul className="space-y-3 text-gray-300 mb-8 leading-relaxed">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-[var(--color-scarlet-red)] mt-1 text-sm">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Skills / Tech Stack */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mr-2">Tech Stack:</span>
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 bg-[var(--color-dark-bg)] text-gray-300 rounded-md border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
