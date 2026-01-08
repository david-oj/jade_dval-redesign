import CountDown from "@/components/CountDown";
import {
  Header,
  Hero,
  Courses,
  Roadmap,
  JadeStarCTA,
  Faqs,
  Partner,
  EnrollNow,
} from "@/sections";
// import WhatsappFill from "@/assets/icons/whatsappFill.svg?react";

const LandingPage = () => {
  return (
    <div className="max-w-[1536px] mx-auto">
      <div className="bg-black max-h-screen overflow-hidden">
        <CountDown />
        <Header />
        <Hero />
      </div>

      <Courses />
      <Roadmap />
      <Faqs />
      <Partner />
      <JadeStarCTA />
      <EnrollNow />

      {/* WHatsapp group link */}
      {/* <a
        rel="noreferrer noopener "
        target="_blank"
        href="https://chat.whatsapp.com/DwmFC4pN6B52QAS7hQmhQD"
      >
        <button className="fixed bottom-8 right-5 z-50 size-10 sm:size-14 bg-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:cursor-pointer">
          <WhatsappFill className="size-6 sm:size-8 text-white" />
        </button>
      </a> */}
    </div>
  );
};

export default LandingPage;
