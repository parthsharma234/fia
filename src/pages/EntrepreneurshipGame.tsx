import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EntrepreneurshipGame from '@/components/EntrepreneurshipGame';

const EntrepreneurshipGamePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <EntrepreneurshipGame />
      <Footer />
    </div>
  );
};

export default EntrepreneurshipGamePage;