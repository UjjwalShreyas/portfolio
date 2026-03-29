"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "Deloitte Australia",
    role: "Data Analytics Job Simulation",
    platform: "Forage",
    date: "Jan 2026",
    certUrl: "https://www.linkedin.com/posts/ujjwalshreyasg_deloitte-js-activity-7423925932945530880-fwXJ",
    details: ["Built a Tableau dashboard to analyze data.", "Performed Excel classification and forensic data analysis."]
  },
  {
    company: "Deloitte Australia",
    role: "Cyber Security Job Simulation",
    platform: "Forage",
    date: "Feb 2026",
    certUrl: "https://www.linkedin.com/posts/ujjwalshreyasg_deloitte-certificate-activity-7421208107248349185-97ld",
    details: ["Provided cybersecurity breach support.", "Analyzed web activity logs and identified suspicious activities."]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="font-heading text-4xl md:text-6xl text-white text-center mb-16">
        Job <span className="text-[var(--color-scarlet-red)]">Simulations</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-[var(--color-dark-surface)] border border-gray-800 p-8 rounded-2xl hover:border-[var(--color-scarlet-red)]/50 transition-colors flex flex-col h-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                <p className="text-[var(--color-scarlet-red)] font-semibold">{exp.company}</p>
              </div>
              <span className="text-xs font-semibold px-4 py-1.5 bg-[var(--color-dark-bg)] border border-gray-700 text-gray-300 rounded-full whitespace-nowrap">
                {exp.date}
              </span>
            </div>
            <p className="text-xs font-medium border border-gray-700 bg-[var(--color-dark-bg)] inline-block px-3 py-1 rounded mb-6 text-gray-400">
              Platform: {exp.platform}
            </p>
            <ul className="space-y-3 text-gray-400 mb-8 flex-grow">
              {exp.details.map((detail, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span className="text-[var(--color-scarlet-red)] mt-1">▹</span> {detail}
                </li>
              ))}
            </ul>
            
            <a 
              href={exp.certUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 text-[var(--color-scarlet-red)] font-semibold hover:text-white transition-colors"
              data-interactive="true"
            >
              View Certificate <span>→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
