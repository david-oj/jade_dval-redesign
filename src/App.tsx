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
} from "./sections";

function App() {
  return (
    <div className="max-w-[1536px] mx-auto">
      <div className="bg-black max-h-screen overflow-hidden">
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
}

export default App;
