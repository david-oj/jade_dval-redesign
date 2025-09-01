// import CountDown from "@/components/CountDown";
import {
  Header,
  Hero,
  Courses,
  Roadmap,
  JadeStarCTA,
  Faqs,
  Partner,
  EnrollNow,
  Footer,
} from "@/sections";

const LandingPage = () => {
  return (
    <div className="max-w-[1536px] mx-auto">
      <div className="bg-black max-h-screen overflow-hidden">
        {/* <CountDown/> */}
        <Header />
        <Hero />
      </div>

      <Courses />
      <Roadmap />
      <Faqs />
      <Partner />
      <JadeStarCTA />
      <EnrollNow />
      <Footer />
    </div>
  );
};

export default LandingPage;
