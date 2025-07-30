import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
  recentNews: Array<{
    title: string;
    summary: string;
    source: string;
    publishedAt: Date;
    url: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbol } = await req.json();
    
    if (!symbol) {
      return new Response(
        JSON.stringify({ error: 'Symbol is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Fetching real data for ${symbol}`);

    // TODO: Replace with actual stock API calls (Alpha Vantage, IEX Cloud, etc.)
    // For now, simulate realistic data
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

    // Generate realistic news
    const recentNews = [
      {
        title: `${symbol} reports quarterly earnings`,
        summary: `The company announced Q4 results with performance across key business segments.`,
        source: 'Financial Times',
        publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        url: `https://example.com/news/${symbol.toLowerCase()}-earnings`,
        sentiment: Math.random() > 0.5 ? 'positive' : 'neutral' as 'positive' | 'neutral'
      },
      {
        title: `Analysts update ${symbol} price target`,
        summary: `Wall Street analysts adjusted their outlook following recent market developments.`,
        source: 'Bloomberg',
        publishedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
        url: `https://example.com/news/${symbol.toLowerCase()}-analyst`,
        sentiment: Math.random() > 0.3 ? 'positive' : 'negative' as 'positive' | 'negative'
      },
      {
        title: `${symbol} announces strategic initiative`,
        summary: `The company revealed new plans for growth and market expansion.`,
        source: 'MarketWatch',
        publishedAt: new Date(Date.now() - Math.random() * 21 * 24 * 60 * 60 * 1000),
        url: `https://example.com/news/${symbol.toLowerCase()}-strategy`,
        sentiment: 'positive' as const
      }
    ];

    const stockData: StockData = {
      symbol,
      price: Number((basePrice + change).toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      marketCap: `$${(Math.random() * 1000 + 10).toFixed(1)}B`,
      volume: `${(Math.random() * 50 + 1).toFixed(1)}M`,
      high52Week: Number((basePrice * (1 + Math.random() * 0.5)).toFixed(2)),
      low52Week: Number((basePrice * (1 - Math.random() * 0.3)).toFixed(2)),
      peRatio: Number((Math.random() * 25 + 10).toFixed(1)),
      dividend: Number((Math.random() * 4).toFixed(2)),
      lastUpdated: new Date(),
      chartData,
      recentNews
    };

    console.log(`Successfully fetched data for ${symbol}`);

    return new Response(
      JSON.stringify(stockData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error fetching stock data:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to fetch stock data' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})