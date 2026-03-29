"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
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
          Developer · Data Analyst · Builder
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-gray-400 mb-8 max-w-lg"
        >
          Aspiring engineer turning ideas into real-world solutions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 mt-12 w-full sm:w-auto relative z-10 justify-center"
        >
          <MagneticButton href="#projects" className="px-8 py-4 text-lg bg-[var(--color-scarlet-red)] text-white font-bold rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-105" data-interactive="true">
            View My Work
          </MagneticButton>
          <MagneticButton href="/resume.pdf" download className="px-8 py-4 text-lg bg-transparent border-2 border-[var(--color-dark-surface)] text-white font-bold rounded-full hover:border-[var(--color-scarlet-red)] transition-all duration-300 hover:scale-105" data-interactive="true">
            Download Resume
          </MagneticButton>
        </motion.div>

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
      </div>
    </section>
  );
}
