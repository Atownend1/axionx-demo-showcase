import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { PageTransition } from "./components/PageTransition";
import { AnimatedBackgroundPattern } from "./components/AnimatedBackgroundPattern";
import Dashboard from "./pages/Dashboard";
import DataQuality from "./pages/DataQuality";
import AIInsights from "./pages/AIInsights";
import ROICalculator from "./pages/ROICalculator";
import RevenueModel from "./pages/RevenueModel";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import { PortalLayout } from "./components/layout/PortalLayout";
import Auth from "./pages/Auth";
import ChatApp from "./pages/ChatApp";
import { AIChatWidget } from "./components/AIChatWidget";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />

        {/* Portal Routes */}
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="data-quality" element={<PageTransition><DataQuality /></PageTransition>} />
          <Route path="ai-insights" element={<PageTransition><AIInsights /></PageTransition>} />
          <Route path="roi-calculator" element={<PageTransition><ROICalculator /></PageTransition>} />
          <Route path="revenue-model" element={<PageTransition><RevenueModel /></PageTransition>} />
          <Route path="chat" element={<PageTransition><ChatApp /></PageTransition>} />
        </Route>

        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedBackgroundPattern />
        <div className="min-h-screen flex flex-col">
          {/* Navigation is now handled inside layouts (PortalLayout) or individual pages if needed. 
              Actually, for Landing Page we want Navigation too. 
              But PortalLayout adds it. 
              If I keep it here, it duplicates in Portal. 
              Let's make App.tsx NOT render Navigation globally, but handle it via Route wrappers.
          */}
          {/* Removing global Navigation and Footer since they are context specific or part of Layouts */}
          {/* Wait, LandingPage needs Navigation. PortalLayout has Navigation.
               Let's create a PublicLayout or just render Navigation conditionally here.
               But switching routes remounts layouts in Routes.
               
               Alternative: Keep Navigation global here. 
               Remove <Navigation /> from PortalLayout.tsx.
               This allows smooth transition of Nav bar if it's the same component.
           */}
          <Navigation />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          {/* Footer is also in PortalLayout? Let's check. Yes.
              Let's remove Footer from PortalLayout and keep it global here?
              Or keep it global here and remove from PortalLayout.
              Let's keep Navigation and Footer global in App.tsx.
          */}
          <Footer />
          <AIChatWidget />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
