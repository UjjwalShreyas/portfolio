"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "C", "Java", "Full Stack", "HTML", "CSS", "JavaScript", "Next.js", "React.js", "Tailwind CSS"]
  },
  {
    title: "DBMS & Tools",
    skills: ["SQL", "MySQL", "Oracle 10g", "Tableau", "Git", "GitHub", "Excel"]
  },
  {
    title: "Web Technologies",
    skills: ["HTML", "CSS", "JavaScript", "Next.js"]
  }
];

const softSkills = [
  "Communication", "Teamwork", "Analytical Thinking",
  "Leadership", "Adaptability", "Time Management",
  "Communication", "Teamwork", "Analytical Thinking",
  "Leadership", "Adaptability", "Time Management" // Doubled for infinite scroll
];

export default function SkillsSection() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".skill-pill",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Infinite marquee animation
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
  }, []);

  return (
    <section id="skills" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="font-heading text-4xl md:text-6xl text-white mb-16">
          Technical <span className="text-[var(--color-scarlet-red)]">Skills</span>
        </h2>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="bg-[var(--color-dark-surface)] p-8 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-scarlet-red)]" />
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-pill opacity-0 px-4 py-2 bg-[var(--color-dark-bg)] border border-gray-800 text-gray-300 text-sm font-medium rounded-full cursor-default hover:border-[var(--color-scarlet-red)] hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Horizontal Marquee for Soft Skills */}
      <div className="relative w-full py-8 border-y border-gray-800 bg-[var(--color-dark-surface)]/30 overflow-hidden flex whitespace-nowrap">
        <div ref={marqueeRef} className="flex gap-8 px-4 items-center min-w-max">
          {softSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-xl md:text-3xl font-heading text-gray-400 uppercase tracking-wider">{skill}</span>
              <span className="text-[var(--color-scarlet-red)] text-xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
