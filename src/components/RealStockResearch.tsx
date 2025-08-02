import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, TrendingDown, DollarSign, BarChart3, Calendar, Clock, ArrowLeft, ExternalLink, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { stockApi, FinnhubQuote, FinnhubProfile, FinnhubNews, FinnhubCandle } from '@/services/stockApi';
import { popularStocks, getStocksByCategory, searchStocks, getUniqueCategories, PopularStock } from '@/data/popularStocks';

interface EnhancedStockData extends PopularStock {
  quote?: FinnhubQuote;
  profile?: FinnhubProfile;
  news?: FinnhubNews[];
  chartData?: Array<{
    date: string;
    price: number;
    volume: number;
  }>;
  lastUpdated?: string;
  loading?: boolean;
  error?: string;
}

const RealStockResearch = () => {
  const [stocks, setStocks] = useState<EnhancedStockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<EnhancedStockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<EnhancedStockData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(20);
  const [activeTab, setActiveTab] = useState('overview');
  const [loadingStockDetail, setLoadingStockDetail] = useState(false);

  const categories = getUniqueCategories();

  // Initialize stocks with basic data
  useEffect(() => {
    console.log('Initializing stocks...');
    const initialStocks = popularStocks.map(stock => ({
      ...stock,
      loading: false,
      error: undefined
    }));
    setStocks(initialStocks);
    setFilteredStocks(initialStocks);
    setLoading(false);
  }, []);

  // Filter stocks based on search and category
  useEffect(() => {
    console.log('Filtering stocks...', { searchTerm, selectedCategory });
    let filtered: EnhancedStockData[] = [];

    if (searchTerm) {
      const searchResults = searchStocks(searchTerm);
      filtered = stocks.filter(stock => 
        searchResults.some(result => result.symbol === stock.symbol)
      );
    } else {
      filtered = getStocksByCategory(selectedCategory).map(categoryStock => 
        stocks.find(stock => stock.symbol === categoryStock.symbol) || categoryStock
      );
    }

    console.log('Filtered results:', filtered.length);
    setFilteredStocks(filtered);
  }, [stocks, searchTerm, selectedCategory]);

  // Fetch real stock data for a specific stock
  const fetchStockData = async (stock: EnhancedStockData): Promise<EnhancedStockData> => {
    console.log(`Fetching real data for ${stock.symbol}...`);
    
    try {
      // Update loading state
      setStocks(prev => prev.map(s => 
        s.symbol === stock.symbol ? { ...s, loading: true, error: undefined } : s
      ));

      const [quote, profile, news, candles] = await Promise.allSettled([
        stockApi.getQuote(stock.symbol),
        stockApi.getProfile(stock.symbol),
        stockApi.getNews(
          stock.symbol, 
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          new Date().toISOString().split('T')[0]
        ),
        stockApi.getCandles(
          stock.symbol,
          'D',
          Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000),
          Math.floor(Date.now() / 1000)
        )
      ]);

      // Process chart data
      let chartData: Array<{ date: string; price: number; volume: number; }> = [];
      if (candles.status === 'fulfilled' && candles.value.s === 'ok') {
        const candleData = candles.value;
        chartData = candleData.t.map((timestamp, index) => ({
          date: new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: candleData.c[index],
          volume: candleData.v[index] / 1000000 // Convert to millions
        }));
      }

      const enhancedStock: EnhancedStockData = {
        ...stock,
        quote: quote.status === 'fulfilled' ? quote.value : undefined,
        profile: profile.status === 'fulfilled' ? profile.value : undefined,
        news: news.status === 'fulfilled' ? news.value.slice(0, 5) : undefined,
        chartData,
        lastUpdated: new Date().toISOString(),
        loading: false,
        error: undefined
      };

      console.log(`Successfully fetched data for ${stock.symbol}`);
      return enhancedStock;

    } catch (error) {
      console.error(`Error fetching data for ${stock.symbol}:`, error);
      
      const errorStock: EnhancedStockData = {
        ...stock,
        loading: false,
        error: 'Failed to load real-time data'
      };

      return errorStock;
    }
  };

  const handleStockClick = async (stock: EnhancedStockData) => {
    console.log('Stock clicked:', stock.symbol);
    setLoadingStockDetail(true);
    
    try {
      // If we don't have real data yet, fetch it
      if (!stock.quote) {
        const enhancedStock = await fetchStockData(stock);
        setSelectedStock(enhancedStock);
        
        // Update the stock in our main list
        setStocks(prev => prev.map(s => 
          s.symbol === stock.symbol ? enhancedStock : s
        ));
      } else {
        setSelectedStock(stock);
      }
      
      setActiveTab('overview');
    } catch (error) {
      console.error('Error loading stock details:', error);
      setSelectedStock(stock);
    } finally {
      setLoadingStockDetail(false);
    }
  };

  const handleBackClick = () => {
    console.log('Back button clicked');
    setSelectedStock(null);
  };

  const handleCategoryClick = (category: string) => {
    console.log('Category clicked:', category);
    setSelectedCategory(category);
  };

  const handleSearchChange = (value: string) => {
    console.log('Search changed:', value);
    setSearchTerm(value);
  };

  const handleLoadMore = () => {
    console.log('Load more clicked');
    setDisplayCount(prev => prev + 20);
  };

  const handleShowLess = () => {
    console.log('Show less clicked');
    setDisplayCount(20);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    console.log('Clear filters clicked');
    setSearchTerm('');
    setSelectedCategory('All');
  };

  const handleRefreshStock = async (stock: EnhancedStockData) => {
    console.log('Refresh stock clicked:', stock.symbol);
    const refreshedStock = await fetchStockData(stock);
    setStocks(prev => prev.map(s => 
      s.symbol === stock.symbol ? refreshedStock : s
    ));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  const formatDate = (dateString: string | number) => {
    const date = typeof dateString === 'number' ? new Date(dateString * 1000) : new Date(dateString);
    return date.toLocaleDateString('en-US', {
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

  const getKidFriendlyNewsExplanation = (headline: string, symbol: string) => {
    const explanations = [
      `This news about ${symbol} could affect how many people want to buy their stock. Good news usually makes stock prices go up!`,
      `When companies make announcements, it can change how investors feel about the stock. This might make the price move up or down.`,
      `News like this helps investors understand how well the company is doing. Strong companies usually have higher stock prices.`,
      `This type of news can influence whether people think the company will make more money in the future.`,
      `Stock prices often change when there's news about the company. Investors read news to decide if they want to buy or sell.`
    ];
    return explanations[Math.floor(Math.random() * explanations.length)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
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
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 w-4 h-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Stock Detail View
  if (selectedStock) {
    const currentPrice = selectedStock.quote?.c || 0;
    const change = selectedStock.quote?.d || 0;
    const changePercent = selectedStock.quote?.dp || 0;
    const marketCap = selectedStock.profile?.marketCapitalization || 0;

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

          {loadingStockDetail && (
            <div className="text-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">Loading detailed stock information...</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stock Header */}
            <div className="lg:col-span-3">
              <div className="card-gradient p-8 rounded-2xl shadow-lg border border-border/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {selectedStock.profile?.logo && (
                      <img 
                        src={selectedStock.profile.logo} 
                        alt={`${selectedStock.name} logo`}
                        className="w-16 h-16 rounded-lg object-contain bg-white p-2"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        {selectedStock.kidFriendlyName}
                      </h1>
                      <p className="text-lg text-muted-foreground mb-2">
                        {selectedStock.name} ({selectedStock.symbol})
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-sm">
                          {selectedStock.sector}
                        </Badge>
                        <Badge variant="secondary" className="text-sm">
                          {selectedStock.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {currentPrice > 0 ? formatCurrency(currentPrice) : 'Loading...'}
                    </div>
                    {currentPrice > 0 && (
                      <div className={`flex items-center justify-end text-lg font-semibold ${
                        change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {change >= 0 ? (
                          <TrendingUp className="w-5 h-5 mr-1" />
                        ) : (
                          <TrendingDown className="w-5 h-5 mr-1" />
                        )}
                        {formatCurrency(Math.abs(change))} ({Math.abs(changePercent).toFixed(2)}%)
                      </div>
                    )}
                    {selectedStock.lastUpdated && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Last updated: {formatTime(selectedStock.lastUpdated)}
                      </p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRefreshStock(selectedStock)}
                      disabled={selectedStock.loading}
                      className="mt-2"
                    >
                      {selectedStock.loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger 
                    value="overview" 
                    className="text-sm"
                    onClick={() => {
                      console.log('Overview tab clicked');
                      setActiveTab('overview');
                    }}
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="chart" 
                    className="text-sm"
                    onClick={() => {
                      console.log('Chart tab clicked');
                      setActiveTab('chart');
                    }}
                  >
                    Price Chart
                  </TabsTrigger>
                  <TabsTrigger 
                    value="news" 
                    className="text-sm"
                    onClick={() => {
                      console.log('News tab clicked');
                      setActiveTab('news');
                    }}
                  >
                    Recent News
                  </TabsTrigger>
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
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {selectedStock.description}
                      </p>
                      <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                        <h4 className="font-semibold text-primary mb-2">Why Kids Know This Company:</h4>
                        <p className="text-sm text-muted-foreground">{selectedStock.whyKidsKnow}</p>
                      </div>
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
                          <p className="text-lg font-semibold">
                            {marketCap > 0 ? formatLargeNumber(marketCap) : 'Loading...'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Today's High</p>
                          <p className="text-lg font-semibold">
                            {selectedStock.quote?.h ? formatCurrency(selectedStock.quote.h) : 'Loading...'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Today's Low</p>
                          <p className="text-lg font-semibold">
                            {selectedStock.quote?.l ? formatCurrency(selectedStock.quote.l) : 'Loading...'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Previous Close</p>
                          <p className="text-lg font-semibold">
                            {selectedStock.quote?.pc ? formatCurrency(selectedStock.quote.pc) : 'Loading...'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedStock.profile && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Company Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Country:</span>
                            <span className="font-medium">{selectedStock.profile.country}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Exchange:</span>
                            <span className="font-medium">{selectedStock.profile.exchange}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Industry:</span>
                            <span className="font-medium">{selectedStock.profile.finnhubIndustry}</span>
                          </div>
                          {selectedStock.profile.weburl && (
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Website:</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(selectedStock.profile?.weburl, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Visit
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="chart" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>30-Day Price Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedStock.chartData && selectedStock.chartData.length > 0 ? (
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={selectedStock.chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip 
                                formatter={(value, name) => [
                                  name === 'price' ? formatCurrency(Number(value)) : `${Number(value).toFixed(1)}M`,
                                  name === 'price' ? 'Price' : 'Volume'
                                ]}
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
                      ) : (
                        <div className="h-80 flex items-center justify-center">
                          <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Chart data loading...</p>
                            <Button
                              variant="outline"
                              onClick={() => handleRefreshStock(selectedStock)}
                              className="mt-4"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Load Chart Data
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="news" className="space-y-6">
                  {selectedStock.news && selectedStock.news.length > 0 ? (
                    selectedStock.news.map((newsItem, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2 line-clamp-2">
                                {newsItem.headline}
                              </CardTitle>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{newsItem.source}</span>
                                <span>{formatDate(newsItem.datetime)}</span>
                                <Badge variant="outline" className="text-xs">
                                  {newsItem.category}
                                </Badge>
                              </div>
                            </div>
                            {newsItem.image && (
                              <img 
                                src={newsItem.image} 
                                alt="News"
                                className="w-20 h-20 rounded-lg object-cover ml-4"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {newsItem.summary}
                          </p>
                          <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                            <h4 className="font-semibold text-primary mb-2">Why This Matters for Kids:</h4>
                            <p className="text-sm text-muted-foreground">
                              {getKidFriendlyNewsExplanation(newsItem.headline, selectedStock.symbol)}
                            </p>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(newsItem.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Read Full Article
                            </Button>
                            <span className="text-xs text-muted-foreground">
                              ID: {newsItem.id}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Loading News...</h3>
                        <p className="text-muted-foreground mb-4">
                          We're fetching the latest news about {selectedStock.kidFriendlyName}
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => handleRefreshStock(selectedStock)}
                          disabled={selectedStock.loading}
                        >
                          {selectedStock.loading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <RefreshCw className="w-4 h-4 mr-2" />
                          )}
                          Load News
                        </Button>
                      </CardContent>
                    </Card>
                  )}
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
                        {selectedStock.funFact}
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
                    <div>
                      <h4 className="font-semibold text-sm text-primary">What is market cap?</h4>
                      <p className="text-xs text-muted-foreground">
                        Market cap is the total value of all the company's stock. It tells us how big the company is!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedStock.error && (
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Data Error
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-600 mb-3">{selectedStock.error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRefreshStock(selectedStock)}
                      className="w-full"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              )}
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
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Real-time data from Finnhub</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{popularStocks.length} companies</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for companies you know..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(category)}
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
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 professional-card group"
              onClick={() => handleStockClick(stock)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {stock.kidFriendlyName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">
                      {stock.symbol} • {stock.name}
                    </p>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs">
                        {stock.category}
                      </Badge>
                    </div>
                  </div>
                  {stock.loading && (
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-right">
                    {stock.quote ? (
                      <>
                        <div className="text-2xl font-bold text-foreground">
                          {formatCurrency(stock.quote.c)}
                        </div>
                        <div className={`flex items-center justify-end text-sm font-semibold ${
                          stock.quote.d >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.quote.d >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {Math.abs(stock.quote.dp).toFixed(2)}%
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <div className="text-lg font-bold text-muted-foreground">Click to load</div>
                        <div className="text-sm text-muted-foreground">real-time price</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {stock.description}
                    </p>
                  </div>

                  {stock.error && (
                    <div className="text-center">
                      <AlertCircle className="w-4 h-4 text-red-500 mx-auto mb-1" />
                      <p className="text-xs text-red-500">Data unavailable</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredStocks.length > displayCount && (
          <div className="text-center">
            <Button 
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Load More Companies ({filteredStocks.length - displayCount} remaining)
            </Button>
          </div>
        )}

        {/* Show Less Button */}
        {displayCount >= filteredStocks.length && filteredStocks.length > 20 && (
          <div className="text-center">
            <Button 
              onClick={handleShowLess}
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
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-4">
              No companies found matching "{searchTerm}"
            </p>
            <p className="text-muted-foreground mb-6">
              Try searching for companies like "Apple", "Disney", "Netflix", or "McDonald's"
            </p>
            <Button 
              onClick={handleClearFilters}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* API Status */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Connected to Finnhub API • Real-time stock data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealStockResearch;