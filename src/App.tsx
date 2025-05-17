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
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-[1536px] mx-auto">
        <Header />
        <Routes>
          {/* Main landing page route */}
          <Route
            path="/"
            element={
              <>
                <div className="bg-black max-h-[736px] overflow-hidden">
                  <Hero />
                </div>
                <Courses />
                <Roadmap />
                <Faqs />
                <Partner />
                <JadeStarCTA />
                <Footer />
              </>
            }
          />

          {/* Enroll form route */}
          <Route
            path="/enroll"
            element={
              <>
                <EnrollNow />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
