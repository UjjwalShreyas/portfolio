"use client";

import { motion } from "framer-motion";
import { FaHandsHelping } from "react-icons/fa";

type Category = "Course" | "Event" | "Hackathon";

interface Cert {
  issuer: string;
  name: string;
  logo: string;
  certUrl: string;
  category: Category;
}

const certifications: Cert[] = [
  // ── Courses & Credentials ──────────────────────────────
  {
    issuer: "NPTEL (AICTE-Swayam)",
    name: "Programming in Java",
    logo: "NP",
    certUrl: "/nptel.png",
    category: "Course",
  },
  {
    issuer: "Oracle",
    name: "Cloud Infrastructure",
    logo: "OR",
    certUrl:
      "https://www.linkedin.com/posts/ujjwalshreyasg_oracle-certificate-activity-7418264322105081856-HAB7",
    category: "Course",
  },
  {
    issuer: "Infosys",
    name: "Artificial Intelligence for All",
    logo: "IN",
    certUrl: "/infosys-ai.png",
    category: "Course",
  },
  {
    issuer: "Infosys",
    name: "Generative AI for All",
    logo: "IN",
    certUrl: "/infosys-genai.png",
    category: "Course",
  },
  {
    issuer: "Analytics Vidhya",
    name: "GenAI for Everyone",
    logo: "AV",
    certUrl: "/certificates/gen%20AI.pdf",
    category: "Course",
  },
  {
    issuer: "Analytics Vidhya",
    name: "Generative AI with AWS",
    logo: "AV",
    certUrl: "/certificates/AWS%20gen%20AI.pdf",
    category: "Course",
  },
  {
    issuer: "Orbit Cybermatics",
    name: "C, C++ & Data Structures",
    logo: "OC",
    certUrl: "/certificates/orbit.pdf",
    category: "Course",
  },

  // ── Events ────────────────────────────────────────────
  {
    issuer: "Vignan Institute (CSI)",
    name: "CommuniQuiz — 2nd Prize",
    logo: "VG",
    certUrl: "/certificates/quiz.pdf",
    category: "Event",
  },
  {
    issuer: "Vignan Institute",
    name: "CodeRush — Coding Competition",
    logo: "VG",
    certUrl: "/certificates/coderush.pdf",
    category: "Event",
  },
  {
    issuer: "SAE India VITS Club",
    name: "SAE Quiz Mania-2K26",
    logo: "SA",
    certUrl: "/certificates/sae.pdf",
    category: "Event",
  },

  // ── Hackathons ────────────────────────────────────────
  {
    issuer: "Vignan Institute",
    name: "HackVibe 2025 — National Hackathon",
    logo: "HV",
    certUrl: "/certificates/hackvibe.pdf",
    category: "Hackathon",
  },
  {
    issuer: "KMIT — Recurse Club",
    name: "Codenovate 2024 — Hackathon",
    logo: "KM",
    certUrl: "/certificates/kmit%20hackathon%20certificate.pdf",
    category: "Hackathon",
  },
];

const categoryStyles: Record<Category, string> = {
  Course:
    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Event:
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Hackathon:
    "bg-[var(--color-scarlet-red)]/10 text-[var(--color-scarlet-red)] border border-[var(--color-scarlet-red)]/20",
};

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="py-24 bg-[var(--color-dark-surface)]/20 border-y border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-heading text-4xl md:text-6xl text-white text-center mb-4">
          <span className="text-[var(--color-scarlet-red)]">Certifications</span> &amp; Extras
        </h2>
        <p className="text-gray-500 text-center mb-16 text-sm uppercase tracking-widest">
          Click any card to view the certificate
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, idx) => (
            <motion.a
              href={cert.certUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive="true"
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
              className="group block h-full"
            >
              <div className="bg-[var(--color-dark-surface)] border border-gray-800 p-6 rounded-2xl h-full flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:border-[var(--color-scarlet-red)] group-hover:shadow-[0_10px_30px_rgba(220,20,60,0.08)] relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-scarlet-red)]/0 via-transparent to-[var(--color-scarlet-red)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Logo circle */}
                <div className="w-14 h-14 rounded-full bg-[var(--color-dark-bg)] border border-gray-700 flex items-center justify-center font-heading text-lg text-gray-400 mb-4 group-hover:text-[var(--color-scarlet-red)] group-hover:border-[var(--color-scarlet-red)]/50 transition-colors z-10">
                  {cert.logo}
                </div>

                {/* Category badge */}
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3 z-10 ${categoryStyles[cert.category]}`}>
                  {cert.category}
                </span>

                <h3 className="text-base font-bold text-white mb-1 z-10 leading-snug">
                  {cert.name}
                </h3>
                <p className="text-[var(--color-scarlet-red)] text-xs uppercase tracking-wider font-semibold mb-4 z-10">
                  {cert.issuer}
                </p>

                <div className="text-gray-500 text-xs group-hover:text-white transition-colors flex items-center gap-1 mt-auto font-medium z-10">
                  View Certificate{" "}
                  <span className="text-[var(--color-scarlet-red)]">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* NSS Extra-Curricular */}
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
            <h3 className="text-2xl font-bold text-white mb-2">
              NSS Volunteer{" "}
              <span className="text-gray-500 font-normal text-lg ml-2 block sm:inline">
                (National Service Scheme)
              </span>
            </h3>
            <p className="text-gray-400 max-w-2xl text-lg mt-3">
              Active community service involvement. Participated in multiple
              cleanliness drives and public awareness campaigns to foster a
              better environment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
