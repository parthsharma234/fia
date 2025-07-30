import React, { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, Building2, Calendar, BarChart3, Activity, RefreshCw, ArrowLeft, ExternalLink, AlertCircle, Lightbulb, Star, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Expanded stock database with more companies kids would recognize
const stockDatabase = [
  // Technology & Social Media
  { symbol: 'AAPL', name: 'Apple Inc.', kidName: 'iPhone & iPad Maker', category: 'Technology', sector: 'Consumer Electronics', logo: '🍎', color: '#007AFF' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', kidName: 'Google & YouTube', category: 'Technology', sector: 'Internet Services', logo: '🔍', color: '#4285F4' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', kidName: 'Xbox & Windows', category: 'Technology', sector: 'Software', logo: '💻', color: '#00A1F1' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', kidName: 'Amazon Shopping', category: 'Technology', sector: 'E-commerce', logo: '📦', color: '#FF9900' },
  { symbol: 'META', name: 'Meta Platforms Inc.', kidName: 'Facebook & Instagram', category: 'Technology', sector: 'Social Media', logo: '📱', color: '#1877F2' },
  { symbol: 'TSLA', name: 'Tesla Inc.', kidName: 'Electric Cars & SpaceX', category: 'Automotive', sector: 'Electric Vehicles', logo: '⚡', color: '#CC0000' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', kidName: 'Gaming Graphics Cards', category: 'Technology', sector: 'Semiconductors', logo: '🎮', color: '#76B900' },
  { symbol: 'SNAP', name: 'Snap Inc.', kidName: 'Snapchat', category: 'Technology', sector: 'Social Media', logo: '👻', color: '#FFFC00' },
  { symbol: 'TWTR', name: 'Twitter Inc.', kidName: 'Twitter/X', category: 'Technology', sector: 'Social Media', logo: '🐦', color: '#1DA1F2' },
  
  // Entertainment & Media
  { symbol: 'DIS', name: 'The Walt Disney Company', kidName: 'Disney Movies & Parks', category: 'Entertainment', sector: 'Media & Entertainment', logo: '🏰', color: '#0066CC' },
  { symbol: 'NFLX', name: 'Netflix Inc.', kidName: 'Netflix Streaming', category: 'Entertainment', sector: 'Streaming', logo: '📺', color: '#E50914' },
  { symbol: 'SPOT', name: 'Spotify Technology S.A.', kidName: 'Spotify Music', category: 'Entertainment', sector: 'Music Streaming', logo: '🎵', color: '#1DB954' },
  { symbol: 'WBD', name: 'Warner Bros. Discovery', kidName: 'HBO Max & DC Movies', category: 'Entertainment', sector: 'Media', logo: '🎬', color: '#B535F6' },
  
  // Gaming
  { symbol: 'RBLX', name: 'Roblox Corporation', kidName: 'Roblox Games', category: 'Gaming', sector: 'Gaming Platform', logo: '🎮', color: '#00A2FF' },
  { symbol: 'EA', name: 'Electronic Arts Inc.', kidName: 'FIFA & Madden Games', category: 'Gaming', sector: 'Video Games', logo: '🏈', color: '#FF6600' },
  { symbol: 'ATVI', name: 'Activision Blizzard', kidName: 'Call of Duty & Candy Crush', category: 'Gaming', sector: 'Video Games', logo: '🎯', color: '#F99500' },
  { symbol: 'TTWO', name: 'Take-Two Interactive', kidName: 'Grand Theft Auto & NBA 2K', category: 'Gaming', sector: 'Video Games', logo: '🏀', color: '#FF6B35' },
  
  // Food & Beverages
  { symbol: 'MCD', name: 'McDonald\'s Corporation', kidName: 'McDonald\'s Fast Food', category: 'Food & Beverage', sector: 'Fast Food', logo: '🍟', color: '#FFC72C' },
  { symbol: 'SBUX', name: 'Starbucks Corporation', kidName: 'Starbucks Coffee', category: 'Food & Beverage', sector: 'Coffee', logo: '☕', color: '#00704A' },
  { symbol: 'KO', name: 'The Coca-Cola Company', kidName: 'Coca-Cola Drinks', category: 'Food & Beverage', sector: 'Beverages', logo: '🥤', color: '#F40009' },
  { symbol: 'PEP', name: 'PepsiCo Inc.', kidName: 'Pepsi & Doritos', category: 'Food & Beverage', sector: 'Beverages & Snacks', logo: '🥤', color: '#004B93' },
  { symbol: 'YUM', name: 'Yum! Brands Inc.', kidName: 'KFC, Taco Bell & Pizza Hut', category: 'Food & Beverage', sector: 'Fast Food', logo: '🍕', color: '#E31837' },
  
  // Retail & Fashion
  { symbol: 'NKE', name: 'Nike Inc.', kidName: 'Nike Shoes & Sports', category: 'Retail & Fashion', sector: 'Apparel', logo: '👟', color: '#FF6600' },
  { symbol: 'ADDYY', name: 'Adidas AG', kidName: 'Adidas Sports Gear', category: 'Retail & Fashion', sector: 'Apparel', logo: '👟', color: '#000000' },
  { symbol: 'WMT', name: 'Walmart Inc.', kidName: 'Walmart Stores', category: 'Retail & Fashion', sector: 'Discount Stores', logo: '🛒', color: '#004C91' },
  { symbol: 'TGT', name: 'Target Corporation', kidName: 'Target Stores', category: 'Retail & Fashion', sector: 'Department Stores', logo: '🎯', color: '#CC0000' },
  { symbol: 'COST', name: 'Costco Wholesale', kidName: 'Costco Bulk Shopping', category: 'Retail & Fashion', sector: 'Warehouse Clubs', logo: '🏪', color: '#E31837' },
  
  // Transportation
  { symbol: 'UBER', name: 'Uber Technologies', kidName: 'Uber Rides & Food Delivery', category: 'Transportation', sector: 'Ride Sharing', logo: '🚗', color: '#000000' },
  { symbol: 'LYFT', name: 'Lyft Inc.', kidName: 'Lyft Rides', category: 'Transportation', sector: 'Ride Sharing', logo: '🚗', color: '#FF00BF' },
  { symbol: 'AAL', name: 'American Airlines', kidName: 'American Airlines', category: 'Transportation', sector: 'Airlines', logo: '✈️', color: '#C8102E' },
  
  // Financial Services
  { symbol: 'V', name: 'Visa Inc.', kidName: 'Visa Credit Cards', category: 'Financial', sector: 'Payment Processing', logo: '💳', color: '#1A1F71' },
  { symbol: 'MA', name: 'Mastercard Inc.', kidName: 'Mastercard Credit Cards', category: 'Financial', sector: 'Payment Processing', logo: '💳', color: '#EB001B' },
  { symbol: 'PYPL', name: 'PayPal Holdings', kidName: 'PayPal Online Payments', category: 'Financial', sector: 'Digital Payments', logo: '💰', color: '#0070BA' },
  
  // Health & Beauty
  { symbol: 'JNJ', name: 'Johnson & Johnson', kidName: 'Band-Aids & Baby Products', category: 'Health & Beauty', sector: 'Healthcare', logo: '🏥', color: '#D51920' },
  { symbol: 'PG', name: 'Procter & Gamble', kidName: 'Tide, Crest & Pampers', category: 'Health & Beauty', sector: 'Consumer Goods', logo: '🧴', color: '#003DA5' },
  
  // Toys & Education
  { symbol: 'MAT', name: 'Mattel Inc.', kidName: 'Barbie & Hot Wheels', category: 'Toys & Education', sector: 'Toys', logo: '🪆', color: '#E22B8A' },
  { symbol: 'HAS', name: 'Hasbro Inc.', kidName: 'Monopoly & Transformers', category: 'Toys & Education', sector: 'Toys', logo: '🎲', color: '#0066CC' }
];

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  high52Week: number;
  low52Week: number;
  peRatio: number;
  dividend: number;
  lastUpdated: Date;
  chartData: Array<{
    date: string;
    price: number;
    volume: number;
  }>;
  keyEvents: Array<{
    date: string;
    title: string;
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
    kidExplanation: string;
  }>;
}

const RealStockResearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [stockData, setStockData] = useState<Record<string, StockData>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [displayedStocks, setDisplayedStocks] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Generate realistic stock data
  const generateRealisticStockData = useCallback((symbol: string): StockData => {
    const stockInfo = stockDatabase.find(s => s.symbol === symbol);
    if (!stockInfo) throw new Error('Stock not found');

    // Base prices for realistic ranges
    const basePrices: Record<string, number> = {
      'AAPL': 190, 'GOOGL': 140, 'MSFT': 380, 'AMZN': 145, 'META': 320, 'TSLA': 250, 'NVDA': 450,
      'DIS': 95, 'NFLX': 450, 'SPOT': 180, 'NKE': 110, 'SBUX': 95, 'MCD': 280, 'KO': 60,
      'V': 240, 'JPM': 150, 'RBLX': 45, 'EA': 130, 'WMT': 160, 'TGT': 150, 'SNAP': 12,
      'PEP': 170, 'UBER': 65, 'LYFT': 15, 'PYPL': 75, 'MA': 400, 'JNJ': 160, 'PG': 155,
      'MAT': 20, 'HAS': 55, 'YUM': 135, 'COST': 550, 'AAL': 15, 'ATVI': 95, 'TTWO': 150
    };
    
    const basePrice = basePrices[symbol] || 100;
    const change = (Math.random() - 0.5) * 8;
    const changePercent = (change / basePrice) * 100;
    
    // Generate chart data
    const chartData = [];
    let currentPrice = basePrice;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const dailyChange = (Math.random() - 0.5) * 0.06;
      const trendFactor = Math.sin(i * 0.1) * 0.02;
      currentPrice = currentPrice * (1 + dailyChange + trendFactor);
      
      chartData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: Number(currentPrice.toFixed(2)),
        volume: Math.random() * 15 + 5
      });
    }

    // Generate key events based on company
    const generateEvents = (symbol: string) => {
      const eventTemplates: Record<string, any> = {
        'AAPL': [
          { title: 'New iPhone 15 Launch', description: 'Apple unveiled the iPhone 15 with USB-C and improved cameras', kidExplanation: 'When Apple releases a new iPhone, millions of people want to buy it, which makes the company more money!', impact: 'positive' },
          { title: 'App Store Policy Changes', description: 'Apple announced new App Store commission structure', kidExplanation: 'Changes to how Apple charges app developers can affect how much money they make from the App Store.', impact: 'neutral' },
          { title: 'Record Holiday Sales', description: 'Apple reported strong iPhone and Mac sales during holiday season', kidExplanation: 'During holidays, people buy more Apple products as gifts, making Apple earn more money.', impact: 'positive' }
        ],
        'DIS': [
          { title: 'Guardians of the Galaxy 3 Success', description: 'Disney\'s latest Marvel movie broke box office records', kidExplanation: 'When Disney movies are super popular, more people go to theaters and buy Disney merchandise!', impact: 'positive' },
          { title: 'Disney+ Subscriber Growth', description: 'Disney+ added 5 million new subscribers this quarter', kidExplanation: 'More people signing up for Disney+ means more monthly money for Disney.', impact: 'positive' },
          { title: 'Theme Park Expansion', description: 'Disney announced new attractions at Disney World', kidExplanation: 'New rides and attractions make people more excited to visit Disney parks and spend money.', impact: 'positive' }
        ],
        'RBLX': [
          { title: 'New Creator Tools Launch', description: 'Roblox introduced advanced building and scripting tools', kidExplanation: 'Better tools help creators make cooler games, which brings more players to Roblox!', impact: 'positive' },
          { title: 'Partnership with Nike', description: 'Nike opened a virtual store in Roblox metaverse', kidExplanation: 'When big brands like Nike join Roblox, it shows that Roblox is becoming really important.', impact: 'positive' },
          { title: 'Safety Features Update', description: 'Roblox enhanced parental controls and safety measures', kidExplanation: 'Better safety features make parents more comfortable letting their kids play Roblox.', impact: 'positive' }
        ],
        'NFLX': [
          { title: 'Stranger Things 4 Breaks Records', description: 'Netflix\'s hit show became the most-watched series ever', kidExplanation: 'Popular shows keep people subscribed to Netflix and attract new viewers!', impact: 'positive' },
          { title: 'Password Sharing Crackdown', description: 'Netflix started charging for password sharing', kidExplanation: 'Netflix wants people who share passwords to pay for their own accounts to make more money.', impact: 'neutral' },
          { title: 'Ad-Supported Tier Launch', description: 'Netflix introduced cheaper plan with advertisements', kidExplanation: 'A cheaper option with ads helps more people afford Netflix while companies pay for advertising.', impact: 'positive' }
        ],
        'TSLA': [
          { title: 'Model Y Price Cut', description: 'Tesla reduced prices on popular Model Y SUV', kidExplanation: 'Lower prices make Tesla cars more affordable, so more people might buy them!', impact: 'positive' },
          { title: 'Supercharger Network Expansion', description: 'Tesla opened charging stations to other car brands', kidExplanation: 'Letting other cars use Tesla chargers creates a new way for Tesla to make money.', impact: 'positive' },
          { title: 'Full Self-Driving Update', description: 'Tesla released new autonomous driving features', kidExplanation: 'Better self-driving technology makes Tesla cars more special and valuable.', impact: 'positive' }
        ],
        'MCD': [
          { title: 'McPlant Burger Expansion', description: 'McDonald\'s expanded plant-based burger to more locations', kidExplanation: 'New menu items can attract customers who want healthier or different food options.', impact: 'positive' },
          { title: 'Mobile App Promotions', description: 'McDonald\'s increased digital deals and rewards', kidExplanation: 'Apps with special deals encourage people to order more often and spend more money.', impact: 'positive' },
          { title: 'Supply Chain Challenges', description: 'McDonald\'s faced ingredient shortages in some regions', kidExplanation: 'When restaurants can\'t get ingredients, they might make less money temporarily.', impact: 'negative' }
        ]
      };

      const templates = eventTemplates[symbol] || [
        { title: 'Quarterly Earnings Report', description: 'Company reported quarterly financial results', kidExplanation: 'Every few months, companies tell everyone how much money they made and spent.', impact: 'neutral' },
        { title: 'New Product Launch', description: 'Company introduced new products or services', kidExplanation: 'New products can help companies make more money if customers like them.', impact: 'positive' },
        { title: 'Market Expansion', description: 'Company expanded to new markets or regions', kidExplanation: 'Selling products in new places can help companies reach more customers.', impact: 'positive' }
      ];

      return templates.slice(0, 3).map((template, index) => {
        const eventDate = new Date();
        eventDate.setDate(eventDate.getDate() - (index + 1) * 7);
        
        return {
          date: eventDate.toLocaleDateString(),
          title: template.title,
          description: template.description,
          kidExplanation: template.kidExplanation,
          impact: template.impact
        };
      });
    };

    const marketCaps: Record<string, string> = {
      'AAPL': '3.0T', 'GOOGL': '1.7T', 'MSFT': '2.8T', 'AMZN': '1.5T', 'META': '800B', 'TSLA': '790B',
      'DIS': '175B', 'NFLX': '210B', 'SPOT': '30B', 'NKE': '180B', 'SBUX': '110B', 'MCD': '210B',
      'RBLX': '25B', 'UBER': '85B', 'SNAP': '18B', 'V': '500B', 'MA': '380B', 'PYPL': '85B'
    };

    return {
      symbol,
      price: Number((basePrice + change).toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      marketCap: marketCaps[symbol] || '50B',
      volume: `${(Math.random() * 50 + 10).toFixed(1)}M`,
      high52Week: Number((basePrice * 1.4).toFixed(2)),
      low52Week: Number((basePrice * 0.6).toFixed(2)),
      peRatio: Number((Math.random() * 25 + 15).toFixed(1)),
      dividend: Number((Math.random() * 2).toFixed(2)),
      lastUpdated: new Date(),
      chartData,
      keyEvents: generateEvents(symbol)
    };
  }, []);

  // Fetch stock data
  const fetchStockData = useCallback(async (symbol: string) => {
    if (stockData[symbol] && Date.now() - stockData[symbol].lastUpdated.getTime() < 60000) {
      return;
    }
    
    setLoading(prev => ({ ...prev, [symbol]: true }));
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      const mockData = generateRealisticStockData(symbol);
      
      setStockData(prev => ({
        ...prev,
        [symbol]: mockData
      }));
      
      setLastUpdate(new Date());
    } catch (err) {
      setError('Could not fetch stock data. Please try again.');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(prev => ({ ...prev, [symbol]: false }));
    }
  }, [stockData, generateRealisticStockData]);

  // Filter stocks based on search and filters
  const filteredStocks = stockDatabase.filter(stock => {
    const matchesSearch = searchTerm === '' || 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.kidName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.sector.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || stock.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const displayedStocksList = filteredStocks.slice(0, displayedStocks);
  const categories = [...new Set(stockDatabase.map(s => s.category))];

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatChange = (change: number) => change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  const formatPercent = (percent: number) => `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;

  if (selectedStock) {
    const stockInfo = stockDatabase.find(s => s.symbol === selectedStock);
    const data = stockData[selectedStock];
    
    if (!stockInfo) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-12 pt-32">
        <div className="container mx-auto px-4">
          <Button
            variant="outline"
            onClick={() => setSelectedStock(null)}
            className="mb-6 hover-scale"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stock Explorer
          </Button>

          {loading[selectedStock] ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-lg font-medium">Loading stock data...</p>
              </div>
            </div>
          ) : data ? (
            <div className="space-y-8 animate-fade-in">
              {/* Stock Header */}
              <Card className="border-2 border-primary/20 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div 
                        className="text-6xl p-4 rounded-2xl shadow-lg"
                        style={{ backgroundColor: `${stockInfo.color}20` }}
                      >
                        {stockInfo.logo}
                      </div>
                      <div>
                        <CardTitle className="text-4xl font-bold flex items-center gap-4 mb-2">
                          {stockInfo.kidName}
                          <Badge 
                            variant="secondary" 
                            className="text-sm px-3 py-1"
                            style={{ backgroundColor: stockInfo.color, color: 'white' }}
                          >
                            {stockInfo.category}
                          </Badge>
                        </CardTitle>
                        <p className="text-xl text-muted-foreground">{stockInfo.name} ({stockInfo.symbol})</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                      <div className="text-5xl font-bold mb-3" style={{ color: stockInfo.color }}>
                        {formatPrice(data.price)}
                      </div>
                      <div className={`flex items-center justify-center gap-3 text-2xl font-semibold ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.change >= 0 ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
                        <span>{formatChange(data.change)} ({formatPercent(data.changePercent)})</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg mb-4">📊 Key Numbers</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">Market Cap:</span>
                          <span className="font-bold text-primary">{data.marketCap}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">Volume:</span>
                          <span className="font-bold text-secondary">{data.volume}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-lg mb-4">📈 Price Range</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium">52W High:</span>
                          <span className="font-bold text-green-600">{formatPrice(data.high52Week)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                          <span className="font-medium">52W Low:</span>
                          <span className="font-bold text-red-600">{formatPrice(data.low52Week)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chart and Events */}
              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-14 text-lg">
                  <TabsTrigger value="chart" className="text-lg">📈 Price Chart</TabsTrigger>
                  <TabsTrigger value="events" className="text-lg">📰 Recent News</TabsTrigger>
                </TabsList>

                <TabsContent value="chart" className="space-y-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl">30-Day Price Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data.chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value: any) => [formatPrice(value), 'Price']} />
                            <Area 
                              type="monotone" 
                              dataKey="price" 
                              stroke={stockInfo.color} 
                              fill={`${stockInfo.color}30`}
                              strokeWidth={4}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="events" className="space-y-6">
                  <div className="grid gap-6">
                    {data.keyEvents.map((event, index) => (
                      <Card key={index} className={`border-l-4 shadow-lg ${
                        event.impact === 'positive' ? 'border-l-green-500 bg-green-50/50' :
                        event.impact === 'negative' ? 'border-l-red-500 bg-red-50/50' :
                        'border-l-blue-500 bg-blue-50/50'
                      }`}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">{event.date}</span>
                                <Badge variant={event.impact === 'positive' ? 'default' : event.impact === 'negative' ? 'destructive' : 'secondary'}>
                                  {event.impact === 'positive' ? '📈 Good News' : event.impact === 'negative' ? '📉 Challenging' : '📊 Neutral'}
                                </Badge>
                              </div>
                              <h4 className="font-bold text-xl mb-3">{event.title}</h4>
                              <p className="text-muted-foreground mb-4">{event.description}</p>
                              
                              <div className="bg-white p-4 rounded-lg border">
                                <h5 className="font-semibold text-primary mb-2">🤔 Why This Matters</h5>
                                <p className="text-gray-700">{event.kidExplanation}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="text-center py-16">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Could not load stock data</h3>
              <Button onClick={() => fetchStockData(selectedStock)} variant="premium" size="lg">
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-12 pt-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Kid-Friendly Stock Explorer
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            Discover stocks from companies you know and love! Search for your favorite brands and learn how they work as businesses.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for Apple, Disney, Netflix, Roblox, Nike..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary shadow-lg"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="rounded-full"
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Showing {displayedStocksList.length} of {filteredStocks.length} companies
          </p>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedStocksList.map((stock, index) => {
            const data = stockData[stock.symbol];
            const isLoading = loading[stock.symbol];
            
            return (
              <Card 
                key={stock.symbol} 
                className="hover-scale cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 hover:border-primary/50 group overflow-hidden"
                onClick={() => {
                  setSelectedStock(stock.symbol);
                  if (!data) fetchStockData(stock.symbol);
                }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="text-3xl p-2 rounded-xl shadow-lg"
                        style={{ backgroundColor: `${stock.color}20` }}
                      >
                        {stock.logo}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">{stock.symbol}</CardTitle>
                        <p className="text-sm text-muted-foreground">{stock.kidName}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stock.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {isLoading ? (
                    <div className="text-center py-4">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Loading...</p>
                    </div>
                  ) : data ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold" style={{ color: stock.color }}>
                          {formatPrice(data.price)}
                        </span>
                        <div className={`flex items-center gap-1 text-sm font-semibold ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {data.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          <span>{formatPercent(data.changePercent)}</span>
                        </div>
                      </div>
                      
                      <div className="h-12 -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={data.chartData.slice(-7)}>
                            <Line 
                              type="monotone" 
                              dataKey="price" 
                              stroke={stock.color} 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">{stock.sector}</span>
                        <Button variant="ghost" size="sm" className="text-primary">
                          Explore →
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        fetchStockData(stock.symbol);
                      }}>
                        Load Data
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More Button */}
        {displayedStocks < filteredStocks.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setDisplayedStocks(prev => prev + 20)}
              className="hover-scale"
            >
              <Plus className="h-5 w-5 mr-2" />
              Load More Companies ({filteredStocks.length - displayedStocks} remaining)
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredStocks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-4">No companies found</h3>
            <p className="text-muted-foreground text-lg">Try searching for different companies or adjusting your category filter!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealStockResearch;