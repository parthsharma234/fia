import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StockResearch from '@/components/StockResearch';

const StockResearchPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <StockResearch />
      <Footer />
    </div>
  );
};

export default StockResearchPage;