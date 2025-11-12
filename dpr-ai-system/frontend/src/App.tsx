import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Page Components
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Upload from "./pages/Upload";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Import Layout Components
import { DashboardLayout } from "./components/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute"; // <-- 1. Import ProtectedRoute

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* --- Protected Routes --- */}
          {/* All routes inside here are now protected */}
          <Route element={<ProtectedRoute />}> 
            {/* These routes will only be accessible if logged in */}
            <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/projects" element={<DashboardLayout><Projects /></DashboardLayout>} />
            <Route path="/upload" element={<DashboardLayout><Upload /></DashboardLayout>} />
            <Route path="/users" element={<DashboardLayout><Users /></DashboardLayout>} />
            <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
            <Route path="/help" element={<DashboardLayout><Help /></DashboardLayout>} />
          </Route>
          {/* --- End Protected Routes --- */}

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;