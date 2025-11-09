// import CTA from "@/components/partnership/CTA";
import FAQSection from "@/components/partnership/FAQSection";
import Hero from "@/components/partnership/Hero";
import Highlights from "@/components/partnership/Highlights";
import OurImpact from "@/components/partnership/OurImpact";
import OurMission from "@/components/partnership/OurMIssion";
import WhyPartner from "@/components/partnership/WhyPartner";
import { Partner } from "@/sections";
// import { Header } from "@/sections";

const Partnership = () => {
  return (
    <div>
      <Hero />
      <OurMission />
      <Highlights/>
      <WhyPartner />
      <OurImpact />
      {/* <CTA /> */}
      <Partner />
      <FAQSection />
    </div>
  );
};

export default Partnership;
