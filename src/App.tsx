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
    <>
      <div className="bg-black max-h-[736px] overflow-hidden">
        <Header />
        <Hero />
      </div>

      <Courses />
      <Roadmap />
      <Faqs />
      <Partner />
      <JadeStarCTA />
    </>
  );
}

export default App;
