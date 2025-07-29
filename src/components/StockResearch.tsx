import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, Building2, Gamepad2, ShoppingCart, Zap, Plane, Truck, Heart, Shield, Calendar, BarChart3, Activity, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Enhanced sample stock data with historical prices
const stockData = [
  { 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 192.53, 
    change: 2.41, 
    changePercent: 1.27,
    industry: 'Technology',
    description: 'Makes iPhones, iPads, and Mac computers',
    kidFriendly: 'The company that makes your iPhone and iPad! They design cool tech products that people love to use.',
    marketCap: '3.0T',
    volume: '45.2M',
    peRatio: 28.5,
    dividend: '0.96%',
    week52High: 199.62,
    week52Low: 164.08,
    icon: 'tech',
    lastUpdated: new Date(),
    historicalData: [
      { date: '9:30', price: 189.50, volume: 2.1 },
      { date: '10:00', price: 190.25, volume: 3.2 },
      { date: '10:30', price: 189.80, volume: 2.8 },
      { date: '11:00', price: 191.10, volume: 4.1 },
      { date: '11:30', price: 192.53, volume: 5.3 },
      { date: '12:00', price: 192.20, volume: 3.9 },
      { date: '12:30', price: 193.15, volume: 4.7 },
      { date: '1:00', price: 192.80, volume: 3.5 }
    ]
  },
  { 
    symbol: 'TSLA', 
    name: 'Tesla Inc.', 
    price: 248.42, 
    change: -5.67, 
    changePercent: -2.23,
    industry: 'Automotive',
    description: 'Electric car company',
    kidFriendly: 'Makes super cool electric cars that can drive themselves! They\'re helping make the world cleaner.',
    marketCap: '790B',
    volume: '89.7M',
    peRatio: 45.2,
    dividend: '0.00%',
    week52High: 299.29,
    week52Low: 138.80,
    icon: 'auto',
    lastUpdated: new Date(),
    historicalData: [
      { date: '9:30', price: 254.10, volume: 8.2 },
      { date: '10:00', price: 252.30, volume: 12.1 },
      { date: '10:30', price: 250.75, volume: 9.8 },
      { date: '11:00', price: 249.20, volume: 11.5 },
      { date: '11:30', price: 248.42, volume: 14.2 },
      { date: '12:00', price: 247.90, volume: 10.3 },
      { date: '12:30', price: 249.05, volume: 13.1 },
      { date: '1:00', price: 248.80, volume: 9.7 }
    ]
  },
  { 
    symbol: 'DIS', 
    name: 'The Walt Disney Company', 
    price: 95.32, 
    change: 1.85, 
    changePercent: 1.98,
    industry: 'Entertainment',
    description: 'Entertainment and media company',
    kidFriendly: 'The magical company behind Disney movies, theme parks, and Disney+! They create stories that make people smile.',
    marketCap: '175B',
    volume: '23.4M',
    peRatio: 18.7,
    dividend: '0.75%',
    week52High: 123.74,
    week52Low: 78.73,
    icon: 'entertainment',
    lastUpdated: new Date(),
    historicalData: [
      { date: '9:30', price: 93.47, volume: 1.8 },
      { date: '10:00', price: 94.20, volume: 2.3 },
      { date: '10:30', price: 94.85, volume: 2.1 },
      { date: '11:00', price: 95.10, volume: 2.9 },
      { date: '11:30', price: 95.32, volume: 3.4 },
      { date: '12:00', price: 95.15, volume: 2.7 },
      { date: '12:30', price: 95.40, volume: 3.1 },
      { date: '1:00', price: 95.25, volume: 2.5 }
    ]
  },
  { 
    symbol: 'NKE', 
    name: 'Nike Inc.', 
    price: 82.15, 
    change: 0.95, 
    changePercent: 1.17,
    industry: 'Consumer Goods',
    description: 'Sportswear and athletic equipment',
    kidFriendly: 'Makes your favorite sneakers and sports clothes! They help athletes perform their best.',
    marketCap: '127B',
    volume: '12.8M',
    peRatio: 22.1,
    dividend: '1.45%',
    week52High: 123.39,
    week52Low: 70.75,
    icon: 'consumer',
    lastUpdated: new Date(),
    historicalData: [
      { date: '9:30', price: 81.20, volume: 1.2 },
      { date: '10:00', price: 81.75, volume: 1.8 },
      { date: '10:30', price: 81.90, volume: 1.5 },
      { date: '11:00', price: 82.05, volume: 2.1 },
      { date: '11:30', price: 82.15, volume: 2.8 },
      { date: '12:00', price: 82.30, volume: 2.3 },
      { date: '12:30', price: 82.25, volume: 2.6 },
      { date: '1:00', price: 82.10, volume: 1.9 }
    ]
  },
  { 
    symbol: 'NFLX', 
    name: 'Netflix Inc.', 
    price: 487.73, 
    change: 12.34, 
    changePercent: 2.60,
    industry: 'Entertainment',
    description: 'Streaming service',
    kidFriendly: 'Where you watch all your favorite shows and movies! They make entertainment available anywhere.',
    marketCap: '210B',
    volume: '18.9M',
    peRatio: 35.4,
    dividend: '0.00%',
    week52High: 700.99,
    week52Low: 344.73,
    icon: 'entertainment',
    lastUpdated: new Date(),
    historicalData: [
      { date: '9:30', price: 475.39, volume: 1.9 },
      { date: '10:00', price: 478.20, volume: 2.4 },
      { date: '10:30', price: 482.15, volume: 2.1 },
      { date: '11:00', price: 485.50, volume: 2.8 },
      { date: '11:30', price: 487.73, volume: 3.9 },
      { date: '12:00', price: 486.90, volume: 3.2 },
      { date: '12:30', price: 488.25, volume: 3.7 },
      { date: '1:00', price: 487.50, volume: 2.9 }
    ]
  },
  { 
    symbol: 'AMZN', 
    name: 'Amazon.com Inc.', 
    price: 145.86, 
    change: -2.14, 
    changePercent: -1.45,
    industry: 'E-commerce',
    description: 'Online retail and cloud services',
    kidFriendly: 'The place where you order stuff online and it magically arrives at your door! They also power the internet.',
    marketCap: '1.5T',
    volume: '67.3M',
    peRatio: 52.8,
    dividend: '0.00%',
    week52High: 201.20,
    week52Low: 118.35,
    icon: 'ecommerce',
    lastUpdated: new Date(),
    historicalData: [
      { date: '9:30', price: 148.00, volume: 6.2 },
      { date: '10:00', price: 147.25, volume: 8.1 },
      { date: '10:30', price: 146.75, volume: 7.3 },
      { date: '11:00', price: 146.10, volume: 9.2 },
      { date: '11:30', price: 145.86, volume: 11.7 },
      { date: '12:00', price: 145.50, volume: 8.9 },
      { date: '12:30', price: 146.20, volume: 10.3 },
      { date: '1:00', price: 145.75, volume: 7.8 }
    ]
  }
];

const industries = [
  { name: 'All', icon: Building2, color: 'bg-primary/10 text-primary' },
  { name: 'Technology', icon: Zap, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' },
  { name: 'Entertainment', icon: Gamepad2, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' },
  { name: 'Consumer Goods', icon: ShoppingCart, color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' },
  { name: 'E-commerce', icon: ShoppingCart, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' },
  { name: 'Food & Beverage', icon: Heart, color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' },
  { name: 'Automotive', icon: Truck, color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300' },
  { name: 'Airlines', icon: Plane, color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300' },
  { name: 'Logistics', icon: Truck, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300' },
  { name: 'Healthcare', icon: Shield, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' }
];

const StockResearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedStock, setSelectedStock] = useState<typeof stockData[0] | null>(null);
  const [stocksData, setStocksData] = useState(stockData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time data updates
  const updateStockData = useCallback(() => {
    setStocksData(prevData => 
      prevData.map(stock => {
        // Simulate price fluctuations (±2%)
        const fluctuation = (Math.random() - 0.5) * 0.04;
        const newPrice = stock.price * (1 + fluctuation);
        const priceChange = newPrice - stock.price;
        const percentChange = (priceChange / stock.price) * 100;
        
        // Add new data point to historical data
        const newDataPoint = {
          date: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          price: newPrice,
          volume: Math.random() * 10 + 1
        };
        
        return {
          ...stock,
          price: newPrice,
          change: priceChange,
          changePercent: percentChange,
          lastUpdated: new Date(),
          historicalData: [...stock.historicalData.slice(-7), newDataPoint]
        };
      })
    );
    setLastUpdate(new Date());
  }, []);

  // Auto-refresh data every 10 seconds (simulating real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      updateStockData();
    }, 10000);

    return () => clearInterval(interval);
  }, [updateStockData]);

  // Manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    updateStockData();
    setIsRefreshing(false);
  };

  const filteredStocks = useMemo(() => {
    return stocksData.filter(stock => {
      const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.kidFriendly.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === 'All' || stock.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [searchTerm, selectedIndustry, stocksData]);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatChange = (change: number) => change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  const formatPercent = (percent: number) => `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  const formatVolume = (volume: string) => volume;
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    return num.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Live Stock Explorer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Learn about companies you know and love! Watch their stock prices change in real-time and explore interactive charts.
          </p>
          
          {/* Live update indicator */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="ml-2"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for companies you know..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Industry Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {industries.map((industry) => {
              const IconComponent = industry.icon;
              return (
                <Button
                  key={industry.name}
                  variant={selectedIndustry === industry.name ? "default" : "outline"}
                  onClick={() => setSelectedIndustry(industry.name)}
                  className="flex items-center gap-2 hover-scale"
                >
                  <IconComponent className="h-4 w-4" />
                  {industry.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredStocks.map((stock, index) => (
            <Card 
              key={stock.symbol} 
              className="hover-scale cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50"
              onClick={() => setSelectedStock(stock)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      {stock.symbol}
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-1">{stock.name}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stock.industry}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{formatPrice(stock.price)}</span>
                    <div className={`flex items-center gap-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="text-sm font-medium">
                        {formatChange(stock.change)} ({formatPercent(stock.changePercent)})
                      </span>
                    </div>
                  </div>
                  
                  {/* Mini chart */}
                  <div className="h-12 -mx-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stock.historicalData.slice(-4)}>
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke={stock.change >= 0 ? '#22c55e' : '#ef4444'} 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {stock.kidFriendly}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    <span>Market Cap: {stock.marketCap}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredStocks.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-2">No companies found</h3>
            <p className="text-muted-foreground">Try searching for something else or selecting a different industry!</p>
          </div>
        )}

        {/* Enhanced Stock Detail Modal */}
        {selectedStock && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <Card className="max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <CardTitle className="text-3xl font-bold flex items-center gap-3">
                        {selectedStock.symbol}
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <Badge variant="secondary">{selectedStock.industry}</Badge>
                      </CardTitle>
                      <p className="text-lg text-muted-foreground">{selectedStock.name}</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedStock(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Header */}
                <div className="text-center p-6 bg-secondary/10 rounded-lg">
                  <div className="text-5xl font-bold mb-2">{formatPrice(selectedStock.price)}</div>
                  <div className={`flex items-center justify-center gap-2 text-xl ${selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedStock.change >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
                    <span>{formatChange(selectedStock.change)} ({formatPercent(selectedStock.changePercent)})</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Last updated: {selectedStock.lastUpdated.toLocaleTimeString()}
                  </p>
                </div>

                <Tabs defaultValue="chart" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chart" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Live Chart
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Key Stats
                    </TabsTrigger>
                    <TabsTrigger value="about" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      About
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="chart" className="space-y-6">
                    <div className="h-80">
                      <h4 className="font-semibold text-lg mb-4">Today's Trading Activity</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={selectedStock.historicalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                          <Tooltip 
                            formatter={(value: any) => [formatPrice(value), 'Price']}
                            labelStyle={{ color: 'black' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="price" 
                            stroke={selectedStock.change >= 0 ? '#22c55e' : '#ef4444'} 
                            fill={selectedStock.change >= 0 ? '#22c55e20' : '#ef444420'}
                            strokeWidth={3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="h-60">
                      <h4 className="font-semibold text-lg mb-4">Trading Volume</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={selectedStock.historicalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: any) => [formatLargeNumber(value), 'Volume (M)']}
                            labelStyle={{ color: 'black' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="volume" 
                            stroke="hsl(var(--primary))" 
                            fill="hsl(var(--primary) / 0.2)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="stats" className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-secondary/10 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{selectedStock.marketCap}</div>
                        <div className="text-sm text-muted-foreground">Market Cap</div>
                      </div>
                      <div className="bg-secondary/10 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{formatVolume(selectedStock.volume)}</div>
                        <div className="text-sm text-muted-foreground">Volume</div>
                      </div>
                      <div className="bg-secondary/10 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{selectedStock.peRatio}</div>
                        <div className="text-sm text-muted-foreground">P/E Ratio</div>
                      </div>
                      <div className="bg-secondary/10 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{selectedStock.dividend}</div>
                        <div className="text-sm text-muted-foreground">Dividend</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">52-Week Range</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>High:</span>
                            <span className="font-semibold text-green-600">{formatPrice(selectedStock.week52High)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Low:</span>
                            <span className="font-semibold text-red-600">{formatPrice(selectedStock.week52Low)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Current:</span>
                            <span className="font-semibold">{formatPrice(selectedStock.price)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Quick Facts</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Industry:</span>
                            <span className="font-semibold">{selectedStock.industry}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Market Cap:</span>
                            <span className="font-semibold">{selectedStock.marketCap}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>P/E Ratio:</span>
                            <span className="font-semibold">{selectedStock.peRatio}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="about" className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">What does this company do?</h4>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        {selectedStock.kidFriendly}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedStock.description}
                      </p>
                    </div>

                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        💡 Learning Tips
                      </h4>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                          <strong>Stock Price:</strong> Shows what investors think the company is worth. When more people want to buy the stock, the price goes up (green). When more people want to sell, it goes down (red).
                        </p>
                        <p>
                          <strong>Volume:</strong> How many shares were traded. High volume often means big news or events affecting the company.
                        </p>
                        <p>
                          <strong>Market Cap:</strong> The total value of all the company's shares. It tells you how big the company is compared to others.
                        </p>
                        <p>
                          <strong>P/E Ratio:</strong> Price divided by earnings. Lower numbers might mean the stock is a good deal, but it depends on the industry.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockResearch;