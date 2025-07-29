import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RealStockResearch from '@/components/RealStockResearch';

const StockResearchPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <RealStockResearch />
      <Footer />
    </div>
  );
};

export default StockResearchPage;