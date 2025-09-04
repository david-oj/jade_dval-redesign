import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
// import Dashboard from "./pages/Dashboard";
import ProfileStudents from "./pages/admin/ProfiledStudents";
import AddMaterial from "./pages/admin/AddMaterial";
import NotFound from "./pages/NotFound";

import DashboardLayout from "@/components/admin/dashboard/DashdoardLayout";
import GenerateId from "./pages/admin/GenerateID";

// import { Footer } from "./sections";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<DashboardLayout />}>
          {/* <Route index element={<Navigate to="dashboard" replace />} /> */}

          <Route index element={<Dashboard />} />
          <Route path="add-material" element={<AddMaterial />} />
          <Route path="profile-students" element={<ProfileStudents />} />
          <Route path="generate-id" element={<GenerateId />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
