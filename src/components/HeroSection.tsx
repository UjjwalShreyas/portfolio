"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown } from "react-icons/fa";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Parallax Blob */}
      <motion.div 
        style={{ y: yBg, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-scarlet-red)]/20 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="z-10 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-tight text-white mb-4 flex items-center justify-center min-h-[120px] md:min-h-[160px]">
          <TextScramble phrases={["G. Ujjwal Shreyas"]} />
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg md:text-2xl text-[var(--color-muted-white)] font-medium mb-2"
        >
          Full Stack Developer · Data Analyst · Tech Enthusiast
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-gray-400 mb-8 max-w-lg"
        >
         Hi, Im an Aspiring engineer turning ideas into real-world solutions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex space-x-6 text-2xl mt-12"
        >
          <a href="https://github.com/UjjwalShreyas" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-scarlet-red)] transition-colors" data-interactive="true">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ujjwalshreyasg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-scarlet-red)] transition-colors" data-interactive="true">
            <FaLinkedin />
          </a>
          <a href="mailto:ujvivobook@gmail.com" className="text-gray-400 hover:text-[var(--color-scarlet-red)] transition-colors" data-interactive="true">
            <FaEnvelope />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          onClick={() => {
            const aboutSection = document.getElementById("about");
            aboutSection?.scrollIntoView({ behavior: "smooth" });
          }}
          data-interactive="true"
        >
          <span className="text-gray-500 text-xs tracking-[0.2em] mb-2 uppercase font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <FaChevronDown className="text-[var(--color-scarlet-red)] text-lg" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
