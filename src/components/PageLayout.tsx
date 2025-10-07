import { Footer } from "@/sections";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default PageLayout;
