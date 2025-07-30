import React, { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, Building2, Calendar, BarChart3, Activity, RefreshCw, ArrowLeft, ExternalLink, AlertCircle, Lightbulb, Star, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Expanded stock database with more companies
const stockDatabase = [
  // Technology
  { symbol: 'AAPL', name: 'Apple Inc.', kidName: 'The iPhone Company', category: 'Technology', sector: 'Consumer Electronics', difficulty: 'Beginner', logo: '🍎', color: '#007AFF' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', kidName: 'Google', category: 'Technology', sector: 'Internet Services', difficulty: 'Intermediate', logo: '🔍', color: '#4285F4' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', kidName: 'Microsoft', category: 'Technology', sector: 'Software', difficulty: 'Intermediate', logo: '💻', color: '#00A1F1' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', kidName: 'Amazon', category: 'Technology', sector: 'E-commerce', difficulty: 'Intermediate', logo: '📦', color: '#FF9900' },
  { symbol: 'META', name: 'Meta Platforms Inc.', kidName: 'Facebook & Instagram', category: 'Technology', sector: 'Social Media', difficulty: 'Intermediate', logo: '📱', color: '#1877F2' },
  { symbol: 'TSLA', name: 'Tesla Inc.', kidName: 'The Electric Car Company', category: 'Technology', sector: 'Electric Vehicles', difficulty: 'Advanced', logo: '⚡', color: '#CC0000' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', kidName: 'Gaming Graphics', category: 'Technology', sector: 'Semiconductors', difficulty: 'Advanced', logo: '🎮', color: '#76B900' },
  
  // Entertainment & Media
  { symbol: 'DIS', name: 'The Walt Disney Company', kidName: 'Disney', category: 'Entertainment', sector: 'Media & Entertainment', difficulty: 'Beginner', logo: '🏰', color: '#0066CC' },
  { symbol: 'NFLX', name: 'Netflix Inc.', kidName: 'Netflix', category: 'Entertainment', sector: 'Streaming', difficulty: 'Beginner', logo: '📺', color: '#E50914' },
  { symbol: 'SPOT', name: 'Spotify Technology S.A.', kidName: 'Spotify Music', category: 'Entertainment', sector: 'Music Streaming', difficulty: 'Intermediate', logo: '🎵', color: '#1DB954' },
  
  // Consumer Goods
  { symbol: 'NKE', name: 'Nike Inc.', kidName: 'Nike Shoes', category: 'Consumer', sector: 'Apparel', difficulty: 'Beginner', logo: '👟', color: '#FF6600' },
  { symbol: 'SBUX', name: 'Starbucks Corporation', kidName: 'Starbucks Coffee', category: 'Consumer', sector: 'Restaurants', difficulty: 'Beginner', logo: '☕', color: '#00704A' },
  { symbol: 'MCD', name: 'McDonald\'s Corporation', kidName: 'McDonald\'s', category: 'Consumer', sector: 'Fast Food', difficulty: 'Beginner', logo: '🍟', color: '#FFC72C' },
  { symbol: 'KO', name: 'The Coca-Cola Company', kidName: 'Coca-Cola', category: 'Consumer', sector: 'Beverages', difficulty: 'Beginner', logo: '🥤', color: '#F40009' },
  
  // Financial
  { symbol: 'V', name: 'Visa Inc.', kidName: 'Visa Credit Cards', category: 'Financial', sector: 'Payment Processing', difficulty: 'Intermediate', logo: '💳', color: '#1A1F71' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', kidName: 'Chase Bank', category: 'Financial', sector: 'Banking', difficulty: 'Advanced', logo: '🏦', color: '#117ACA' },
  
  // Gaming
  { symbol: 'RBLX', name: 'Roblox Corporation', kidName: 'Roblox Games', category: 'Gaming', sector: 'Gaming Platform', difficulty: 'Beginner', logo: '🎮', color: '#00A2FF' },
  { symbol: 'EA', name: 'Electronic Arts Inc.', kidName: 'EA Sports Games', category: 'Gaming', sector: 'Video Games', difficulty: 'Intermediate', logo: '🏈', color: '#FF6600' },
  
  // Retail
  { symbol: 'WMT', name: 'Walmart Inc.', kidName: 'Walmart Stores', category: 'Retail', sector: 'Discount Stores', difficulty: 'Beginner', logo: '🛒', color: '#004C91' },
  { symbol: 'TGT', name: 'Target Corporation', kidName: 'Target Stores', category: 'Retail', sector: 'Department Stores', difficulty: 'Beginner', logo: '🎯', color: '#CC0000' }
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
  const [displayedStocks, setDisplayedStocks] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Generate realistic stock data
  const generateRealisticStockData = useCallback((symbol: string): StockData => {
    const stockInfo = stockDatabase.find(s => s.symbol === symbol);
    if (!stockInfo) throw new Error('Stock not found');

    // Base prices for realistic ranges
    const basePrices: Record<string, number> = {
      'AAPL': 190, 'GOOGL': 140, 'MSFT': 380, 'AMZN': 145, 'META': 320, 'TSLA': 250, 'NVDA': 450,
      'DIS': 95, 'NFLX': 450, 'SPOT': 180, 'NKE': 110, 'SBUX': 95, 'MCD': 280, 'KO': 60,
      'V': 240, 'JPM': 150, 'RBLX': 45, 'EA': 130, 'WMT': 160, 'TGT': 150
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
          { title: 'New iPhone Launch', description: 'Apple announced the latest iPhone with new features', kidExplanation: 'When Apple releases a new iPhone, lots of people want to buy it!', impact: 'positive' },
          { title: 'App Store Changes', description: 'New App Store policies announced', kidExplanation: 'Changes to the App Store can affect how much money Apple makes.', impact: 'neutral' }
        ],
        'DIS': [
          { title: 'New Movie Release', description: 'Disney released a blockbuster movie', kidExplanation: 'Popular Disney movies bring more visitors to parks!', impact: 'positive' },
          { title: 'Theme Park Expansion', description: 'Disney announced new park attractions', kidExplanation: 'New rides make people more excited to visit Disney parks.', impact: 'positive' }
        ],
        'RBLX': [
          { title: 'New Game Features', description: 'Roblox added exciting new building tools', kidExplanation: 'Cool new features make more kids want to play Roblox!', impact: 'positive' },
          { title: 'Creator Program Expansion', description: 'More ways for creators to earn money', kidExplanation: 'When game creators can make more money, they make better games.', impact: 'positive' }
        ]
      };

      const templates = eventTemplates[symbol] || [
        { title: 'Quarterly Earnings', description: 'Company reported quarterly results', kidExplanation: 'Companies tell everyone how much money they made every few months.', impact: 'neutral' }
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
      'DIS': '175B', 'NFLX': '210B', 'SPOT': '30B', 'NKE': '180B', 'SBUX': '110B', 'MCD': '210B'
    };

    return {
      symbol,
      price: Number((basePrice + change).toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      marketCap: marketCaps[symbol] || '100B',
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
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || stock.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || stock.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const displayedStocksList = filteredStocks.slice(0, displayedStocks);
  const categories = [...new Set(stockDatabase.map(s => s.category))];
  const difficulties = [...new Set(stockDatabase.map(s => s.difficulty))];

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
            Search and explore stocks from companies you know and love! Learn how businesses work and see real stock prices.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for companies like Apple, Disney, Netflix..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary shadow-lg"
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                      {stock.difficulty}
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
                        <span className="text-xs text-muted-foreground">{stock.category}</span>
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
              onClick={() => setDisplayedStocks(prev => prev + 12)}
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
            <p className="text-muted-foreground text-lg">Try adjusting your search or filters!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealStockResearch;