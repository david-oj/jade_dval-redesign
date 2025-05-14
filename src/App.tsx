import { Header, Hero, Courses, Roadmap, JadeStarCTA } from "./sections";

function App() {
  return (
    <>
      <div className="bg-black max-h-[736px] overflow-hidden">
        <Header />
        <Hero />
      </div>

      <Courses />
      <Roadmap />
      <JadeStarCTA />
    </>
  );
}

export default App;
