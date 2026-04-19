"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGraduationCap } from "react-icons/fa";

const educationData = [
  {
    period: "2024–2028",
    degree: "B.Tech",
    institution: "Vignan Institution of Technology and Science, Hyderabad",
    score: null
  },
  {
    period: "2022–2024",
    degree: "Intermediate",
    institution: "Excellencia Junior College",
    score: "90.3%"
  },
  {
    period: "2022",
    degree: "Secondary School",
    institution: "Ravindra Bharathi School",
    score: "CGPA 9.8"
  }
];

export default function EducationTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".timeline-card") as HTMLElement[];
    
    cards.forEach((card, i) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(
        card,
        { opacity: 0, x: isLeft ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="education" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <h2 className="font-heading text-4xl md:text-6xl text-white text-center mb-16">
        Education <span className="text-[var(--color-scarlet-red)]">Timeline</span>
      </h2>
      
      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 -translate-x-1/2 rounded-full hidden md:block" />

        <div className="space-y-12">
          {educationData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--color-dark-surface)] border-2 border-[var(--color-scarlet-red)] flex items-center justify-center z-10 hidden md:flex">
                  <FaGraduationCap className="text-[var(--color-scarlet-red)]" />
                </div>

                <div className={`timeline-card w-full md:w-5/12 bg-[var(--color-dark-surface)] p-6 rounded-2xl border border-gray-800 hover:border-[var(--color-scarlet-red)]/50 transition-colors ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-scarlet-red)]/20 text-[var(--color-scarlet-red)] text-sm font-semibold mb-4">
                    {item.period}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.degree}</h3>
                  <p className="text-gray-400 mb-2">{item.institution}</p>
                  {item.score && (
                    <p className="text-white font-medium">Score: <span className="text-[var(--color-scarlet-red)]">{item.score}</span></p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
