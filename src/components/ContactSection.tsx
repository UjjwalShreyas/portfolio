"use client";

import { useState } from "react";
import MagneticButton from "./MagneticButton";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Bot check
    if (data.honeypot) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message
        }),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-heading text-5xl md:text-7xl text-white mb-6">
            Let&apos;s Build <span className="text-[var(--color-scarlet-red)]">Together.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-md">
            Have an idea or a project in mind? Reach out and let&apos;s turn it into reality.
          </p>

          <div className="space-y-6">
            <a href="mailto:ujvivobook@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-[var(--color-scarlet-red)] transition-colors group w-fit" data-interactive="true">
              <div className="w-12 h-12 rounded-full bg-[var(--color-dark-surface)] border border-gray-800 flex items-center justify-center group-hover:border-[var(--color-scarlet-red)] transition-colors">
                <FaEnvelope />
              </div>
              <span className="text-lg">ujvivobook@gmail.com</span>
            </a>

            <div className="flex items-center gap-4 text-gray-300 group w-fit">
              <div className="w-12 h-12 rounded-full bg-[var(--color-dark-surface)] border border-gray-800 flex items-center justify-center">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <span className="text-lg">Hyderabad, Telangana</span>
            </div>
            
            <div className="flex items-center gap-4 pt-6">
              <a href="https://www.linkedin.com/in/ujjwalshreyasg" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[var(--color-scarlet-red)]/10 text-[var(--color-scarlet-red)] flex items-center justify-center hover:bg-[var(--color-scarlet-red)] hover:text-white transition-all" data-interactive="true">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com/UjjwalShreyas" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[var(--color-scarlet-red)]/10 text-[var(--color-scarlet-red)] flex items-center justify-center hover:bg-[var(--color-scarlet-red)] hover:text-white transition-all" data-interactive="true">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-dark-surface)] p-8 md:p-10 rounded-3xl border border-gray-800 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
            {/* Honeypot field - invisible to users */}
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" suppressHydrationWarning />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                suppressHydrationWarning
                className="w-full bg-[var(--color-dark-bg)] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-scarlet-red)] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                suppressHydrationWarning
                className="w-full bg-[var(--color-dark-bg)] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-scarlet-red)] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                required 
                rows={4}
                suppressHydrationWarning
                className="w-full bg-[var(--color-dark-bg)] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-scarlet-red)] transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <MagneticButton type="submit" disabled={status === "loading"} className="w-full py-4 bg-[var(--color-scarlet-red)] text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50" data-interactive="true">
              {status === "loading" ? "Sending..." : "Send Message"}
            </MagneticButton>

            {status === "success" && <p className="text-green-400 text-center mt-4 font-medium">Message sent successfully!</p>}
            {status === "error" && <p className="text-red-400 text-center mt-4 font-medium">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
