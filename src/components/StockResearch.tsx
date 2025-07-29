import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, Building2, Gamepad2, ShoppingCart, Zap, Plane, Truck, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample stock data for the demo
const stockData = [
  { 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 192.53, 
    change: 2.41, 
    changePercent: 1.27,
    industry: 'Technology',
    description: 'Makes iPhones, iPads, and Mac computers',
    kidFriendly: 'The company that makes your iPhone and iPad!',
    marketCap: '3.0T',
    icon: 'tech'
  },
  { 
    symbol: 'TSLA', 
    name: 'Tesla Inc.', 
    price: 248.42, 
    change: -5.67, 
    changePercent: -2.23,
    industry: 'Automotive',
    description: 'Electric car company',
    kidFriendly: 'Makes super cool electric cars that drive themselves!',
    marketCap: '790B',
    icon: 'auto'
  },
  { 
    symbol: 'DIS', 
    name: 'The Walt Disney Company', 
    price: 95.32, 
    change: 1.85, 
    changePercent: 1.98,
    industry: 'Entertainment',
    description: 'Entertainment and media company',
    kidFriendly: 'The company behind Disney movies, theme parks, and Disney+!',
    marketCap: '175B',
    icon: 'entertainment'
  },
  { 
    symbol: 'NKE', 
    name: 'Nike Inc.', 
    price: 82.15, 
    change: 0.95, 
    changePercent: 1.17,
    industry: 'Consumer Goods',
    description: 'Sportswear and athletic equipment',
    kidFriendly: 'Makes your favorite sneakers and sports clothes!',
    marketCap: '127B',
    icon: 'consumer'
  },
  { 
    symbol: 'NFLX', 
    name: 'Netflix Inc.', 
    price: 487.73, 
    change: 12.34, 
    changePercent: 2.60,
    industry: 'Entertainment',
    description: 'Streaming service',
    kidFriendly: 'Where you watch all your favorite shows and movies!',
    marketCap: '210B',
    icon: 'entertainment'
  },
  { 
    symbol: 'AMZN', 
    name: 'Amazon.com Inc.', 
    price: 145.86, 
    change: -2.14, 
    changePercent: -1.45,
    industry: 'E-commerce',
    description: 'Online retail and cloud services',
    kidFriendly: 'The place where you order stuff online and it arrives at your door!',
    marketCap: '1.5T',
    icon: 'ecommerce'
  },
  { 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc.', 
    price: 138.21, 
    change: 1.67, 
    changePercent: 1.22,
    industry: 'Technology',
    description: 'Google search and technology',
    kidFriendly: 'The company that made Google search and YouTube!',
    marketCap: '1.7T',
    icon: 'tech'
  },
  { 
    symbol: 'MCD', 
    name: 'McDonald\'s Corporation', 
    price: 294.67, 
    change: 3.42, 
    changePercent: 1.17,
    industry: 'Food & Beverage',
    description: 'Fast food restaurant chain',
    kidFriendly: 'The golden arches! Your favorite place for Happy Meals!',
    marketCap: '215B',
    icon: 'food'
  },
  { 
    symbol: 'UAL', 
    name: 'United Airlines', 
    price: 58.94, 
    change: -0.87, 
    changePercent: -1.45,
    industry: 'Airlines',
    description: 'Major airline company',
    kidFriendly: 'Helps people fly to different places around the world!',
    marketCap: '19B',
    icon: 'airlines'
  },
  { 
    symbol: 'UPS', 
    name: 'United Parcel Service', 
    price: 129.45, 
    change: 2.18, 
    changePercent: 1.71,
    industry: 'Logistics',
    description: 'Package delivery service',
    kidFriendly: 'The brown trucks that deliver packages to your house!',
    marketCap: '110B',
    icon: 'logistics'
  },
  { 
    symbol: 'JNJ', 
    name: 'Johnson & Johnson', 
    price: 156.78, 
    change: 0.95, 
    changePercent: 0.61,
    industry: 'Healthcare',
    description: 'Healthcare and pharmaceutical company',
    kidFriendly: 'Makes band-aids, baby shampoo, and medicines to help people feel better!',
    marketCap: '375B',
    icon: 'healthcare'
  },
  { 
    symbol: 'PG', 
    name: 'Procter & Gamble', 
    price: 164.32, 
    change: 1.23, 
    changePercent: 0.75,
    industry: 'Consumer Goods',
    description: 'Consumer goods company',
    kidFriendly: 'Makes toothpaste, shampoo, and cleaning products your family uses!',
    marketCap: '385B',
    icon: 'consumer'
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

  const filteredStocks = useMemo(() => {
    return stockData.filter(stock => {
      const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.kidFriendly.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === 'All' || stock.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [searchTerm, selectedIndustry]);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatChange = (change: number) => change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  const formatPercent = (percent: number) => `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Stock Explorer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about companies you know and love! Discover what makes them valuable and how their stock prices change.
          </p>
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
                    <CardTitle className="text-lg font-bold">{stock.symbol}</CardTitle>
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

        {/* Stock Detail Modal/Panel */}
        {selectedStock && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                      {selectedStock.symbol}
                      <Badge variant="secondary">{selectedStock.industry}</Badge>
                    </CardTitle>
                    <p className="text-lg text-muted-foreground">{selectedStock.name}</p>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedStock(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-secondary/10 rounded-lg">
                  <div className="text-4xl font-bold mb-2">{formatPrice(selectedStock.price)}</div>
                  <div className={`flex items-center justify-center gap-2 text-lg ${selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedStock.change >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                    <span>{formatChange(selectedStock.change)} ({formatPercent(selectedStock.changePercent)})</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">What does this company do?</h4>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {selectedStock.kidFriendly}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Quick Facts</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm">Market Cap: {selectedStock.marketCap}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="text-sm">Industry: {selectedStock.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">💡 Learning Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      The stock price shows what investors think the company is worth. When more people want to buy the stock, the price goes up (green). When more people want to sell, it goes down (red).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockResearch;