import Image from "next/image";
import Hero from "@/components/hero/Hero";
import Levels from "@/components/levels/Levels";
import FeaturesSection from "@/components/features/Features";
import CTASection from "@/components/CTASection";
import MethodologySection from "@/components/meyhodology/Methodology";
import About from "@/components/about/About";
import CambridgeSection from "@/components/cambridge/Cambridge";
import ModalitiesSection from "@/components/modality/Modalidades";
import TeachersSection from "@/components/teachers/Teachers";
import TestimonialsSection from "@/components/testimonios/Testimonials";
import StatsSection from "@/components/stats/Stats";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturesSection />
      <Levels />
      <CambridgeSection />
      <MethodologySection />
      <ModalitiesSection />
      <TeachersSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </>
  );
}
