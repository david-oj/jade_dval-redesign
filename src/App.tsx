import { Header, Hero, Courses, Roadmap, JadeStarCTA, Faqs } from "./sections";

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
      <JadeStarCTA />
    </>
  );
}

export default App;
