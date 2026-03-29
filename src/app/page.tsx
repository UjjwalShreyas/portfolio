import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationTimeline from "@/components/EducationTimeline";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full relative">
      <HeroSection />
      <AboutSection />
      <EducationTimeline />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
