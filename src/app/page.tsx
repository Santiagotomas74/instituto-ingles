import Image from "next/image";
import Hero from "@/components/hero/Hero";
import Levels from "@/components/levels/Levels";
import FeaturesSection from "@/components/features/Features";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <Levels />
      <CTASection />
    </>
  );
}
