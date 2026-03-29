"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFilm, FaFutbol, FaBookOpen, FaMusic } from "react-icons/fa";

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(
      ".about-element",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Massive Profile Portrait */}
        <div className="lg:col-span-5 about-element">
          <div className="w-full h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden border-[1px] border-gray-800 shadow-2xl relative group">
            <div className="absolute inset-0 bg-[var(--color-scarlet-red)]/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
            <img 
              src="/myself.jpg" 
              alt="G. Ujjwal Shreyas" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
            />
            <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[var(--color-scarlet-red)]/50 rounded-[2rem] transition-colors duration-700 z-20 pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Bio + Elements */}
        <div className="lg:col-span-7 space-y-12">
          
          <div className="about-element space-y-6">
            <h2 className="font-heading text-4xl md:text-6xl text-white">
              About <span className="text-[var(--color-scarlet-red)]">Me</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed tracking-wide">
              I am a B.Tech student at Vignan Institution of Technology and Science, Hyderabad . I am deeply passionate about data, development, and solving complex problems through technology. I thrive in environments where creativity meets analytical rigor.
            </p>
            
            <div className="pt-4">
              <h3 className="text-xl font-bold text-white mb-4">Interests</h3>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 bg-[var(--color-dark-surface)] border border-gray-800 px-5 py-2.5 rounded-full text-sm font-medium text-gray-300 hover:border-[var(--color-scarlet-red)] hover:text-white transition-all duration-300 hover:scale-105 cursor-default">
                  <FaFilm className="text-[var(--color-scarlet-red)]" /> Movies & Series
                </span>
                <span className="flex items-center gap-2 bg-[var(--color-dark-surface)] border border-gray-800 px-5 py-2.5 rounded-full text-sm font-medium text-gray-300 hover:border-[var(--color-scarlet-red)] hover:text-white transition-all duration-300 hover:scale-105 cursor-default">
                  <FaFutbol className="text-[var(--color-scarlet-red)]" /> Football
                </span>
                <span className="flex items-center gap-2 bg-[var(--color-dark-surface)] border border-gray-800 px-5 py-2.5 rounded-full text-sm font-medium text-gray-300 hover:border-[var(--color-scarlet-red)] hover:text-white transition-all duration-300 hover:scale-105 cursor-default">
                  <FaBookOpen className="text-[var(--color-scarlet-red)]" /> Literature
                </span>
                <span className="flex items-center gap-2 bg-[var(--color-dark-surface)] border border-gray-800 px-5 py-2.5 rounded-full text-sm font-medium text-gray-300 hover:border-[var(--color-scarlet-red)] hover:text-white transition-all duration-300 hover:scale-105 cursor-default">
                  <FaMusic className="text-[var(--color-scarlet-red)]" /> Music
                </span>
              </div>
            </div>
          </div>

          {/* Personal Details Grid Data */}
          <div className="about-element bg-gradient-to-b from-[var(--color-dark-surface)] to-transparent border border-gray-800 rounded-2xl p-8 hover:border-[var(--color-scarlet-red)]/50 transition-colors duration-500">
            <h3 className="text-2xl font-heading text-white mb-8 border-b border-gray-800 pb-4">Personal Details</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <li className="flex flex-col">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Legal Name</span>
                <span className="text-white font-semibold text-lg">G. Ujjwal Shreyas</span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Date of Birth</span>
                <span className="text-white font-semibold text-lg">March 2, 2007</span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Based In</span>
                <span className="text-white font-semibold text-lg">Hyderabad, TS</span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Languages Spoken</span>
                <span className="text-white font-semibold text-lg">ENGLISH, TELUGU, HINDI</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
