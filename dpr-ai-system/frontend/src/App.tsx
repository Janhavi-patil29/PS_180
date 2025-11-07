import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Upload from "./pages/Upload";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/DashboardLayout";
import Login from "./pages/Login"; // <-- 1. Import the new Login page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Routes inside the dashboard layout */}
          <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/projects" element={<DashboardLayout><Projects /></DashboardLayout>} />
          <Route path="/upload" element={<DashboardLayout><Upload /></DashboardLayout>} />
          <Route path="/users" element={<DashboardLayout><Users /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="/help" element={<DashboardLayout><Help /></DashboardLayout>} />

          {/* Routes outside the dashboard layout */}
          <Route path="/login" element={<Login />} /> {/* <-- 2. Add the new login route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;