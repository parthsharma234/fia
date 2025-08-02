import axios from 'axios';

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'demo';

export interface FinnhubQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

export interface FinnhubProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

export interface FinnhubNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface FinnhubCandle {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string; // Status
  t: number[]; // Timestamps
  v: number[]; // Volumes
}

class StockApiService {
  private async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    try {
      const response = await axios.get(`${FINNHUB_BASE_URL}${endpoint}`, {
        params: {
          ...params,
          token: API_KEY
        },
        timeout: 10000
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getQuote(symbol: string): Promise<FinnhubQuote> {
    return this.makeRequest('/quote', { symbol });
  }

  async getProfile(symbol: string): Promise<FinnhubProfile> {
    return this.makeRequest('/stock/profile2', { symbol });
  }

  async getNews(symbol: string, from: string, to: string): Promise<FinnhubNews[]> {
    return this.makeRequest('/company-news', { symbol, from, to });
  }

  async getCandles(symbol: string, resolution: string, from: number, to: number): Promise<FinnhubCandle> {
    return this.makeRequest('/stock/candle', { 
      symbol, 
      resolution, 
      from: from.toString(), 
      to: to.toString() 
    });
  }

  async getSymbols(exchange: string = 'US'): Promise<Array<{ symbol: string; description: string; displaySymbol: string; type: string; }>> {
    return this.makeRequest('/stock/symbol', { exchange });
  }

  // Get market status
  async getMarketStatus(exchange: string = 'US'): Promise<{ isOpen: boolean; session: string; timezone: string; }> {
    return this.makeRequest('/stock/market-status', { exchange });
  }

  // Search for symbols
  async searchSymbols(query: string): Promise<{ count: number; result: Array<{ description: string; displaySymbol: string; symbol: string; type: string; }> }> {
    return this.makeRequest('/search', { q: query });
  }
}

export const stockApi = new StockApiService();