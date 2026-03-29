"use client";

import { motion } from "framer-motion";
import { FaHandsHelping } from "react-icons/fa";

const certifications = [
  {
    issuer: "NPTEL (AICTE-Swayam)",
    name: "Programming in Java",
    logoPlaceholder: "JP",
    certUrl: "/nptel.png"
  },
  {
    issuer: "Oracle",
    name: "Cloud Infrastructure (75%)",
    logoPlaceholder: "OR",
    certUrl: "https://www.linkedin.com/posts/ujjwalshreyasg_oracle-certificate-activity-7418264322105081856-HAB7"
  },
  {
    issuer: "Infosys",
    name: "Artificial Intelligence for All",
    logoPlaceholder: "IN",
    certUrl: "/infosys-ai.png" // Point to local file
  },
  {
    issuer: "Infosys",
    name: "Generative AI for All",
    logoPlaceholder: "IN",
    certUrl: "/infosys-genai.png" // Point to local file
  }
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 bg-[var(--color-dark-surface)]/20 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-heading text-4xl md:text-6xl text-white text-center mb-16">
          <span className="text-[var(--color-scarlet-red)]">Certifications</span> & Extras
        </h2>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {certifications.map((cert, idx) => (
            <motion.a
              href={cert.certUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive="true"
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="group block h-full"
            >
              <div className="bg-[var(--color-dark-surface)] border border-gray-800 p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:border-[var(--color-scarlet-red)] group-hover:shadow-[0_10px_30px_rgba(220,20,60,0.1)] relative">
                <div className="w-16 h-16 rounded-full bg-[var(--color-dark-bg)] border border-gray-700 flex items-center justify-center font-heading text-xl text-gray-400 mb-6 group-hover:text-[var(--color-scarlet-red)] group-hover:border-[var(--color-scarlet-red)]/50 transition-colors">
                  {cert.logoPlaceholder}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-[var(--color-scarlet-red)] text-sm uppercase tracking-wider font-semibold mb-4">{cert.issuer}</p>
                <div className="text-gray-500 text-sm group-hover:text-white transition-colors flex items-center gap-1 mt-auto font-medium">
                  View Certificate <span className="text-[var(--color-scarlet-red)]">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Extra-Curricular */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[var(--color-dark-surface)] to-[var(--color-dark-bg)] border border-gray-800 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 hover:border-[var(--color-scarlet-red)]/50 transition-colors"
        >
          <div className="w-20 h-20 rounded-full bg-[var(--color-scarlet-red)]/10 flex items-center justify-center flex-shrink-0">
            <FaHandsHelping className="text-[var(--color-scarlet-red)] text-4xl" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">NSS Volunteer <span className="text-gray-500 font-normal text-lg ml-2 block sm:inline">(National Service Scheme)</span></h3>
            <p className="text-gray-400 max-w-2xl text-lg mt-3">
              Active community service involvement. Participated in multiple cleanliness drives and public awareness campaigns to foster a better environment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
