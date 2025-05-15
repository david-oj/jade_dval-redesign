import {
  Header,
  Hero,
  Courses,
  Roadmap,
  JadeStarCTA,
  Faqs,
  Partner,
} from "./sections";

function App() {
  return (
    <div className="max-w-[1536px] mx-auto">
      <div className="bg-black max-h-[736px] overflow-hidden">
        <Header />
        <Hero />
      </div>

      <Courses />
      <Roadmap />
      <Faqs />
      <Partner />
      <JadeStarCTA />
    </div>
  );
}

export default App;
