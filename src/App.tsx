import { Outlet } from "react-router-dom";
import { Footer } from "./sections";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Outlet /> {/* This will contain your page content */}
      </main>
      <Footer /> {/* Footer will stick to bottom */}
    </div>
  );
}

export default App;
