import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import GetInvolved from "./pages/GetInvolved";
import Team from "./pages/Team";
import Chapters from "./pages/Chapters";
import ChapterDetail from "./pages/ChapterDetail";
import Contact from "./pages/Contact";
import StockResearch from "./pages/StockResearch";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollTo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/team" element={<Team />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/chapters/:state" element={<ChapterDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stock-research" element={<StockResearch />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
