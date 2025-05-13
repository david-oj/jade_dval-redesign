import { Header, Hero, Courses, Roadmap } from "./sections";

function App() {
  return (
    <>
      <div className="bg-black max-h-[736px] overflow-hidden">
        <Header />
        <Hero />
      </div>

      <Courses />
      <Roadmap />
    </>
  );
}

export default App;
