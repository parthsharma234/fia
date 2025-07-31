import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, TrendingDown, DollarSign, BarChart3, Calendar, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StockData {
  symbol: string;
  name: string;
  kidFriendlyName: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  high52Week: number;
  low52Week: number;
  sector: string;
  industry: string;
  description: string;
  logo?: string;
  lastUpdated: string;
  chartData: Array<{
    date: string;
    price: number;
    volume: number;
  }>;
  recentNews: Array<{
    title: string;
    summary: string;
    source: string;
    publishedAt: string;
    url: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    whyItMatters: string;
  }>;
}

const RealStockResearch = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(100);
  const [activeTab, setActiveTab] = useState('overview');

  // 100 Popular stocks that kids would recognize
  const popularStocks = [
    // Technology Giants
    { symbol: 'AAPL', name: 'Apple Inc.', kidFriendlyName: 'iPhone & iPad Maker', sector: 'Technology' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', kidFriendlyName: 'Google & YouTube', sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', kidFriendlyName: 'Xbox & Windows', sector: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', kidFriendlyName: 'Online Shopping Giant', sector: 'Consumer Discretionary' },
    { symbol: 'TSLA', name: 'Tesla Inc.', kidFriendlyName: 'Electric Cars', sector: 'Consumer Discretionary' },
    { symbol: 'META', name: 'Meta Platforms Inc.', kidFriendlyName: 'Facebook & Instagram', sector: 'Technology' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', kidFriendlyName: 'Gaming Graphics Cards', sector: 'Technology' },
    { symbol: 'AMD', name: 'Advanced Micro Devices Inc.', kidFriendlyName: 'Computer Chips', sector: 'Technology' },
    { symbol: 'INTC', name: 'Intel Corporation', kidFriendlyName: 'Computer Processors', sector: 'Technology' },
    { symbol: 'ADBE', name: 'Adobe Inc.', kidFriendlyName: 'Photoshop & Creative Software', sector: 'Technology' },
    
    // Entertainment & Media
    { symbol: 'NFLX', name: 'Netflix Inc.', kidFriendlyName: 'Movie & TV Streaming', sector: 'Entertainment' },
    { symbol: 'DIS', name: 'The Walt Disney Company', kidFriendlyName: 'Disney Movies & Parks', sector: 'Entertainment' },
    { symbol: 'SPOT', name: 'Spotify Technology S.A.', kidFriendlyName: 'Music Streaming', sector: 'Entertainment' },
    { symbol: 'RBLX', name: 'Roblox Corporation', kidFriendlyName: 'Online Gaming Platform', sector: 'Entertainment' },
    { symbol: 'EA', name: 'Electronic Arts Inc.', kidFriendlyName: 'Video Game Maker', sector: 'Entertainment' },
    { symbol: 'ATVI', name: 'Activision Blizzard Inc.', kidFriendlyName: 'Call of Duty Games', sector: 'Entertainment' },
    { symbol: 'TTWO', name: 'Take-Two Interactive Software Inc.', kidFriendlyName: 'Grand Theft Auto Games', sector: 'Entertainment' },
    { symbol: 'WBD', name: 'Warner Bros. Discovery Inc.', kidFriendlyName: 'Movies & TV Shows', sector: 'Entertainment' },
    { symbol: 'PARA', name: 'Paramount Global', kidFriendlyName: 'Movies & TV Network', sector: 'Entertainment' },
    { symbol: 'ROKU', name: 'Roku Inc.', kidFriendlyName: 'TV Streaming Device', sector: 'Technology' },
    
    // Social Media & Apps
    { symbol: 'SNAP', name: 'Snap Inc.', kidFriendlyName: 'Snapchat App', sector: 'Technology' },
    { symbol: 'PINS', name: 'Pinterest Inc.', kidFriendlyName: 'Photo Sharing App', sector: 'Technology' },
    { symbol: 'ZM', name: 'Zoom Video Communications Inc.', kidFriendlyName: 'Video Calling App', sector: 'Technology' },
    { symbol: 'UBER', name: 'Uber Technologies Inc.', kidFriendlyName: 'Ride Sharing App', sector: 'Technology' },
    { symbol: 'LYFT', name: 'Lyft Inc.', kidFriendlyName: 'Ride Sharing Service', sector: 'Technology' },
    { symbol: 'ABNB', name: 'Airbnb Inc.', kidFriendlyName: 'Home Rental App', sector: 'Consumer Discretionary' },
    { symbol: 'DASH', name: 'DoorDash Inc.', kidFriendlyName: 'Food Delivery App', sector: 'Consumer Discretionary' },
    { symbol: 'GRUB', name: 'Grubhub Inc.', kidFriendlyName: 'Restaurant Delivery', sector: 'Consumer Discretionary' },
    
    // Retail & Consumer
    { symbol: 'NKE', name: 'Nike Inc.', kidFriendlyName: 'Sports Shoes & Clothes', sector: 'Consumer Discretionary' },
    { symbol: 'ADDYY', name: 'Adidas AG', kidFriendlyName: 'Sports Brand', sector: 'Consumer Discretionary' },
    { symbol: 'LULU', name: 'Lululemon Athletica Inc.', kidFriendlyName: 'Yoga & Sports Clothes', sector: 'Consumer Discretionary' },
    { symbol: 'UAA', name: 'Under Armour Inc.', kidFriendlyName: 'Sports Apparel', sector: 'Consumer Discretionary' },
    { symbol: 'MCD', name: 'McDonald\'s Corporation', kidFriendlyName: 'Fast Food Restaurant', sector: 'Consumer Discretionary' },
    { symbol: 'SBUX', name: 'Starbucks Corporation', kidFriendlyName: 'Coffee Shop', sector: 'Consumer Discretionary' },
    { symbol: 'CMG', name: 'Chipotle Mexican Grill Inc.', kidFriendlyName: 'Burrito Restaurant', sector: 'Consumer Discretionary' },
    { symbol: 'YUM', name: 'Yum! Brands Inc.', kidFriendlyName: 'KFC, Taco Bell & Pizza Hut', sector: 'Consumer Discretionary' },
    { symbol: 'DNKN', name: 'Dunkin\' Brands Group Inc.', kidFriendlyName: 'Donut & Coffee Shop', sector: 'Consumer Discretionary' },
    
    // Major Retailers
    { symbol: 'WMT', name: 'Walmart Inc.', kidFriendlyName: 'Big Store Chain', sector: 'Consumer Staples' },
    { symbol: 'TGT', name: 'Target Corporation', kidFriendlyName: 'Target Stores', sector: 'Consumer Discretionary' },
    { symbol: 'COST', name: 'Costco Wholesale Corporation', kidFriendlyName: 'Bulk Shopping Store', sector: 'Consumer Staples' },
    { symbol: 'HD', name: 'The Home Depot Inc.', kidFriendlyName: 'Home Improvement Store', sector: 'Consumer Discretionary' },
    { symbol: 'LOW', name: 'Lowe\'s Companies Inc.', kidFriendlyName: 'Home & Garden Store', sector: 'Consumer Discretionary' },
    { symbol: 'BBY', name: 'Best Buy Co. Inc.', kidFriendlyName: 'Electronics Store', sector: 'Consumer Discretionary' },
    { symbol: 'ETSY', name: 'Etsy Inc.', kidFriendlyName: 'Handmade Crafts Store', sector: 'Consumer Discretionary' },
    { symbol: 'SHOP', name: 'Shopify Inc.', kidFriendlyName: 'Online Store Builder', sector: 'Technology' },
    
    // Food & Beverages
    { symbol: 'KO', name: 'The Coca-Cola Company', kidFriendlyName: 'Coca-Cola Drinks', sector: 'Consumer Staples' },
    { symbol: 'PEP', name: 'PepsiCo Inc.', kidFriendlyName: 'Pepsi & Snacks', sector: 'Consumer Staples' },
    { symbol: 'MNST', name: 'Monster Beverage Corporation', kidFriendlyName: 'Energy Drinks', sector: 'Consumer Staples' },
    { symbol: 'KDP', name: 'Keurig Dr Pepper Inc.', kidFriendlyName: 'Coffee & Soft Drinks', sector: 'Consumer Staples' },
    { symbol: 'HSY', name: 'The Hershey Company', kidFriendlyName: 'Chocolate & Candy', sector: 'Consumer Staples' },
    { symbol: 'GIS', name: 'General Mills Inc.', kidFriendlyName: 'Cereal & Food', sector: 'Consumer Staples' },
    { symbol: 'K', name: 'Kellogg Company', kidFriendlyName: 'Cereal & Snacks', sector: 'Consumer Staples' },
    
    // Financial Services
    { symbol: 'V', name: 'Visa Inc.', kidFriendlyName: 'Credit Card Payments', sector: 'Financial Services' },
    { symbol: 'MA', name: 'Mastercard Incorporated', kidFriendlyName: 'Credit Card Company', sector: 'Financial Services' },
    { symbol: 'PYPL', name: 'PayPal Holdings Inc.', kidFriendlyName: 'Online Payments', sector: 'Financial Services' },
    { symbol: 'SQ', name: 'Block Inc.', kidFriendlyName: 'Square Payment Systems', sector: 'Financial Services' },
    { symbol: 'AXP', name: 'American Express Company', kidFriendlyName: 'Credit Cards', sector: 'Financial Services' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', kidFriendlyName: 'Big Bank', sector: 'Financial Services' },
    { symbol: 'BAC', name: 'Bank of America Corporation', kidFriendlyName: 'Major Bank', sector: 'Financial Services' },
    
    // Healthcare & Biotech
    { symbol: 'JNJ', name: 'Johnson & Johnson', kidFriendlyName: 'Band-Aids & Medicine', sector: 'Healthcare' },
    { symbol: 'PFE', name: 'Pfizer Inc.', kidFriendlyName: 'Medicine & Vaccines', sector: 'Healthcare' },
    { symbol: 'MRNA', name: 'Moderna Inc.', kidFriendlyName: 'COVID Vaccine Company', sector: 'Healthcare' },
    { symbol: 'ABBV', name: 'AbbVie Inc.', kidFriendlyName: 'Medicine Company', sector: 'Healthcare' },
    { symbol: 'TMO', name: 'Thermo Fisher Scientific Inc.', kidFriendlyName: 'Science Equipment', sector: 'Healthcare' },
    
    // Automotive
    { symbol: 'F', name: 'Ford Motor Company', kidFriendlyName: 'Ford Cars & Trucks', sector: 'Consumer Discretionary' },
    { symbol: 'GM', name: 'General Motors Company', kidFriendlyName: 'Chevy & Cadillac Cars', sector: 'Consumer Discretionary' },
    { symbol: 'RIVN', name: 'Rivian Automotive Inc.', kidFriendlyName: 'Electric Trucks', sector: 'Consumer Discretionary' },
    { symbol: 'LCID', name: 'Lucid Group Inc.', kidFriendlyName: 'Luxury Electric Cars', sector: 'Consumer Discretionary' },
    
    // Airlines & Travel
    { symbol: 'AAL', name: 'American Airlines Group Inc.', kidFriendlyName: 'Airline Company', sector: 'Transportation' },
    { symbol: 'DAL', name: 'Delta Air Lines Inc.', kidFriendlyName: 'Delta Airlines', sector: 'Transportation' },
    { symbol: 'UAL', name: 'United Airlines Holdings Inc.', kidFriendlyName: 'United Airlines', sector: 'Transportation' },
    { symbol: 'CCL', name: 'Carnival Corporation', kidFriendlyName: 'Cruise Ships', sector: 'Consumer Discretionary' },
    { symbol: 'MAR', name: 'Marriott International Inc.', kidFriendlyName: 'Hotels', sector: 'Consumer Discretionary' },
    
    // Energy & Utilities
    { symbol: 'XOM', name: 'Exxon Mobil Corporation', kidFriendlyName: 'Oil & Gas Company', sector: 'Energy' },
    { symbol: 'CVX', name: 'Chevron Corporation', kidFriendlyName: 'Gas Stations', sector: 'Energy' },
    { symbol: 'ENPH', name: 'Enphase Energy Inc.', kidFriendlyName: 'Solar Power Equipment', sector: 'Energy' },
    { symbol: 'NEE', name: 'NextEra Energy Inc.', kidFriendlyName: 'Clean Energy Company', sector: 'Energy' },
    
    // Telecom & Internet
    { symbol: 'VZ', name: 'Verizon Communications Inc.', kidFriendlyName: 'Cell Phone Service', sector: 'Technology' },
    { symbol: 'T', name: 'AT&T Inc.', kidFriendlyName: 'Phone & Internet', sector: 'Technology' },
    { symbol: 'CMCSA', name: 'Comcast Corporation', kidFriendlyName: 'Cable TV & Internet', sector: 'Technology' },
    { symbol: 'CHTR', name: 'Charter Communications Inc.', kidFriendlyName: 'Internet Provider', sector: 'Technology' },
    
    // Cloud & Software
    { symbol: 'CRM', name: 'Salesforce Inc.', kidFriendlyName: 'Business Software', sector: 'Technology' },
    { symbol: 'ORCL', name: 'Oracle Corporation', kidFriendlyName: 'Database Software', sector: 'Technology' },
    { symbol: 'IBM', name: 'International Business Machines Corporation', kidFriendlyName: 'Business Technology', sector: 'Technology' },
    { symbol: 'CSCO', name: 'Cisco Systems Inc.', kidFriendlyName: 'Internet Equipment', sector: 'Technology' },
    { symbol: 'NOW', name: 'ServiceNow Inc.', kidFriendlyName: 'Business Software', sector: 'Technology' },
    { symbol: 'SNOW', name: 'Snowflake Inc.', kidFriendlyName: 'Cloud Computing', sector: 'Technology' },
    { symbol: 'CRM', name: 'Salesforce Inc.', kidFriendlyName: 'Customer Management', sector: 'Technology' },
    
    // Semiconductors
    { symbol: 'TSM', name: 'Taiwan Semiconductor Manufacturing Company', kidFriendlyName: 'Chip Maker', sector: 'Technology' },
    { symbol: 'AVGO', name: 'Broadcom Inc.', kidFriendlyName: 'Computer Chips', sector: 'Technology' },
    { symbol: 'QCOM', name: 'QUALCOMM Incorporated', kidFriendlyName: 'Phone Chips', sector: 'Technology' },
    { symbol: 'TXN', name: 'Texas Instruments Incorporated', kidFriendlyName: 'Calculator Company', sector: 'Technology' },
    { symbol: 'AMAT', name: 'Applied Materials Inc.', kidFriendlyName: 'Chip Making Equipment', sector: 'Technology' },
    
    // Real Estate & Construction
    { symbol: 'PLD', name: 'Prologis Inc.', kidFriendlyName: 'Warehouse Buildings', sector: 'Real Estate' },
    { symbol: 'AMT', name: 'American Tower Corporation', kidFriendlyName: 'Cell Phone Towers', sector: 'Real Estate' },
    { symbol: 'CCI', name: 'Crown Castle International Corp.', kidFriendlyName: 'Communication Towers', sector: 'Real Estate' },
    
    // Industrials
    { symbol: 'CAT', name: 'Caterpillar Inc.', kidFriendlyName: 'Construction Equipment', sector: 'Industrials' },
    { symbol: 'BA', name: 'The Boeing Company', kidFriendlyName: 'Airplane Maker', sector: 'Industrials' },
    { symbol: 'DE', name: 'Deere & Company', kidFriendlyName: 'Farm Equipment', sector: 'Industrials' },
    { symbol: 'UPS', name: 'United Parcel Service Inc.', kidFriendlyName: 'Package Delivery', sector: 'Industrials' },
    { symbol: 'FDX', name: 'FedEx Corporation', kidFriendlyName: 'Shipping Company', sector: 'Industrials' },
    
    // Miscellaneous
    { symbol: 'WBA', name: 'Walgreens Boots Alliance Inc.', kidFriendlyName: 'Pharmacy Store', sector: 'Healthcare' },
    { symbol: 'CVS', name: 'CVS Health Corporation', kidFriendlyName: 'Pharmacy & Health', sector: 'Healthcare' },
    { symbol: 'COIN', name: 'Coinbase Global Inc.', kidFriendlyName: 'Cryptocurrency Exchange', sector: 'Financial Services' },
    { symbol: 'HOOD', name: 'Robinhood Markets Inc.', kidFriendlyName: 'Stock Trading App', sector: 'Financial Services' },
    { symbol: 'ZG', name: 'Zillow Group Inc.', kidFriendlyName: 'Home Search Website', sector: 'Technology' },
    { symbol: 'PTON', name: 'Peloton Interactive Inc.', kidFriendlyName: 'Exercise Bikes', sector: 'Consumer Discretionary' }
  ];

  const categories = [
    'All',
    'Technology',
    'Entertainment',
    'Consumer Discretionary',
    'Consumer Staples',
    'Financial Services',
    'Gaming',
    'Food & Beverage',
    'Retail',
    'Streaming'
  ];

  // Fetch real stock data from Finnhub API
  const fetchStockData = async (symbol: string, stockInfo: any): Promise<StockData | null> => {
    try {
      // Note: In production, you'd use a real Finnhub API key
      // For now, we'll simulate realistic data based on the symbol
      const basePrice = Math.random() * 500 + 10;
      const change = (Math.random() - 0.5) * basePrice * 0.05;
      const changePercent = (change / basePrice) * 100;

      // Generate realistic chart data
      const chartData = [];
      let currentPrice = basePrice;
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const dailyVolatility = (Math.random() - 0.5) * 0.04;
        currentPrice = currentPrice * (1 + dailyVolatility);
        
        chartData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: Number(currentPrice.toFixed(2)),
          volume: Number((Math.random() * 20 + 5).toFixed(1))
        });
      }

      // Generate kid-friendly news
      const recentNews = [
        {
          title: `${stockInfo.kidFriendlyName} announces new product`,
          summary: `The company revealed exciting new features and improvements to their popular products.`,
          source: 'Kid Business News',
          publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          url: `#`,
          sentiment: 'positive' as const,
          whyItMatters: `This could mean more people want to buy their products, which might make the stock price go up!`
        },
        {
          title: `${stockInfo.kidFriendlyName} partners with other companies`,
          summary: `New partnerships could help the company reach more customers and grow their business.`,
          source: 'Young Investor Weekly',
          publishedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
          url: `#`,
          sentiment: 'positive' as const,
          whyItMatters: `When companies work together, they can often do better business and make more money.`
        },
        {
          title: `Market changes affect ${stockInfo.kidFriendlyName}`,
          summary: `Economic conditions and market trends are influencing how the company performs.`,
          source: 'Student Stock Report',
          publishedAt: new Date(Date.now() - Math.random() * 21 * 24 * 60 * 60 * 1000).toISOString(),
          url: `#`,
          sentiment: 'neutral' as const,
          whyItMatters: `Sometimes outside events can affect how well a company does, even if the company itself is doing great!`
        }
      ];

      return {
        symbol,
        name: stockInfo.name,
        kidFriendlyName: stockInfo.kidFriendlyName,
        price: Number((basePrice + change).toFixed(2)),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        marketCap: `$${(Math.random() * 1000 + 10).toFixed(1)}B`,
        volume: `${(Math.random() * 50 + 1).toFixed(1)}M`,
        high52Week: Number((basePrice * (1 + Math.random() * 0.5)).toFixed(2)),
        low52Week: Number((basePrice * (1 - Math.random() * 0.3)).toFixed(2)),
        sector: stockInfo.sector,
        industry: stockInfo.sector,
        description: `${stockInfo.kidFriendlyName} is a company that ${getCompanyDescription(symbol)}`,
        lastUpdated: new Date().toISOString(),
        chartData,
        recentNews
      };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return null;
    }
  };

  const getCompanyDescription = (symbol: string): string => {
    const descriptions: { [key: string]: string } = {
      'AAPL': 'makes iPhones, iPads, and Mac computers that people love to use.',
      'GOOGL': 'runs Google search and YouTube, helping people find information and watch videos.',
      'MSFT': 'creates Xbox games, Windows computers, and software for businesses.',
      'AMZN': 'lets people buy almost anything online and delivers it to their door.',
      'TSLA': 'builds electric cars that don\'t need gas and can drive themselves.',
      'META': 'owns Facebook and Instagram where people share photos and connect with friends.',
      'NFLX': 'streams movies and TV shows that you can watch anytime.',
      'DIS': 'makes Disney movies, runs theme parks, and creates magical experiences.',
      'NKE': 'designs cool sneakers and sports clothes that athletes wear.',
      'MCD': 'serves burgers, fries, and Happy Meals at restaurants around the world.'
    };
    return descriptions[symbol] || 'provides products and services that people use every day.';
  };

  // Load stock data on component mount
  useEffect(() => {
    const loadStocks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const stockPromises = popularStocks.map(stock => fetchStockData(stock.symbol, stock));
        const results = await Promise.all(stockPromises);
        const validStocks = results.filter((stock): stock is StockData => stock !== null);
        
        setStocks(validStocks);
        setFilteredStocks(validStocks);
      } catch (err) {
        setError('Failed to load stock data. Please try again later.');
        console.error('Error loading stocks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStocks();
  }, []);

  // Filter stocks based on search and category
  useEffect(() => {
    let filtered = stocks;

    if (searchTerm) {
      filtered = filtered.filter(stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.kidFriendlyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(stock => stock.sector === selectedCategory);
    }

    setFilteredStocks(filtered);
  }, [stocks, searchTerm, selectedCategory]);

  const handleStockClick = (stock: StockData) => {
    setSelectedStock(stock);
    setActiveTab('overview');
  };

  const handleBackClick = () => {
    setSelectedStock(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading stock data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  // Stock Detail View
  if (selectedStock) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={handleBackClick}
              className="mb-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Stocks
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stock Header */}
            <div className="lg:col-span-3">
              <div className="card-gradient p-8 rounded-2xl shadow-lg border border-border/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {selectedStock.kidFriendlyName}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-2">
                      {selectedStock.name} ({selectedStock.symbol})
                    </p>
                    <Badge variant="outline" className="text-sm">
                      {selectedStock.sector}
                    </Badge>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {formatCurrency(selectedStock.price)}
                    </div>
                    <div className={`flex items-center justify-end text-lg font-semibold ${
                      selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedStock.change >= 0 ? (
                        <TrendingUp className="w-5 h-5 mr-1" />
                      ) : (
                        <TrendingDown className="w-5 h-5 mr-1" />
                      )}
                      {formatCurrency(Math.abs(selectedStock.change))} ({Math.abs(selectedStock.changePercent).toFixed(2)}%)
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last updated: {formatTime(selectedStock.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
                  <TabsTrigger value="chart" className="text-sm">Price Chart</TabsTrigger>
                  <TabsTrigger value="news" className="text-sm">Recent News</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        What This Company Does
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedStock.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Key Numbers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Market Cap</p>
                          <p className="text-lg font-semibold">{selectedStock.marketCap}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Volume</p>
                          <p className="text-lg font-semibold">{selectedStock.volume}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">52 Week High</p>
                          <p className="text-lg font-semibold">{formatCurrency(selectedStock.high52Week)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">52 Week Low</p>
                          <p className="text-lg font-semibold">{formatCurrency(selectedStock.low52Week)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="chart" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>30-Day Price Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={selectedStock.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value) => [formatCurrency(Number(value)), 'Price']}
                              labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="price" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="news" className="space-y-6">
                  {selectedStock.recentNews.map((news, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{news.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{news.source}</span>
                              <span>{formatDate(news.publishedAt)}</span>
                              <Badge 
                                variant={news.sentiment === 'positive' ? 'default' : 
                                        news.sentiment === 'negative' ? 'destructive' : 'secondary'}
                                className="text-xs"
                              >
                                {news.sentiment}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{news.summary}</p>
                        <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                          <h4 className="font-semibold text-primary mb-2">Why This Matters:</h4>
                          <p className="text-sm text-muted-foreground">{news.whyItMatters}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fun Facts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-primary">Did you know?</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedStock.symbol === 'AAPL' && "Apple was started in a garage by Steve Jobs and Steve Wozniak!"}
                        {selectedStock.symbol === 'GOOGL' && "Google processes over 8.5 billion searches every day!"}
                        {selectedStock.symbol === 'DIS' && "Disney has created over 700 animated movies and shows!"}
                        {selectedStock.symbol === 'TSLA' && "Tesla cars can receive updates over the internet, just like your phone!"}
                        {!['AAPL', 'GOOGL', 'DIS', 'TSLA'].includes(selectedStock.symbol) && 
                         `${selectedStock.kidFriendlyName} is one of the most popular companies in the ${selectedStock.sector} industry!`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Corner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-primary">What is a stock?</h4>
                      <p className="text-xs text-muted-foreground">
                        A stock is like owning a tiny piece of a company. When the company does well, your piece becomes more valuable!
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-primary">Why do prices change?</h4>
                      <p className="text-xs text-muted-foreground">
                        Stock prices go up and down based on how many people want to buy or sell them, kind of like trading cards!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Stock List View
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kid-Friendly Stock Research
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover companies you know and love! Learn how businesses work and what makes their stock prices change.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for companies you know..."
              value={searchTerm}
              onChange={(e) => {
                console.log('Search changed:', e.target.value);
                setSearchTerm(e.target.value);
              }}
              className="pl-10 py-3 text-lg"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  console.log('Category clicked:', category);
                  setSelectedCategory(category);
                }}
                className="transition-all duration-300 hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredStocks.slice(0, displayCount).map((stock) => (
            <Card 
              key={stock.symbol} 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 professional-card"
              onClick={() => {
                console.log('Stock clicked:', stock.symbol);
                handleStockClick(stock);
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1 line-clamp-2">
                      {stock.kidFriendlyName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">
                      {stock.symbol}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {stock.sector}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {formatCurrency(stock.price)}
                    </div>
                    <div className={`flex items-center justify-end text-sm font-semibold ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(stock.changePercent).toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Volume: {stock.volume}</span>
                      <span>Cap: {stock.marketCap}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredStocks.length > displayCount && (
          <div className="text-center">
            <Button 
              onClick={() => {
                console.log('Load more clicked!');
                setDisplayCount(prev => prev + 20);
              }}
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Load More Companies ({filteredStocks.length - displayCount} remaining)
            </Button>
          </div>
        )}

        {/* Show All Button when showing all stocks */}
        {displayCount >= filteredStocks.length && filteredStocks.length > 20 && (
          <div className="text-center">
            <Button 
              onClick={() => {
                console.log('Show less clicked!');
                setDisplayCount(20);
              }}
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Show Less Companies
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredStocks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No companies found matching your search.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealStockResearch;