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
    try {
      return await this.makeRequest('/quote', { symbol });
    } catch (error) {
      console.warn(`Failed to fetch quote for ${symbol}, returning mock data:`, error);
      // Return mock data when API fails
      const mockQuote: FinnhubQuote = {
        c: 150.25, // Current price
        d: 2.15, // Change
        dp: 1.45, // Percent change
        h: 152.80, // High price of the day
        l: 148.90, // Low price of the day
        o: 149.50, // Open price of the day
        pc: 148.10, // Previous close price
        t: Date.now() / 1000 // Current timestamp
      };
      return mockQuote;
    }
  }

  async getProfile(symbol: string): Promise<FinnhubProfile> {
    try {
      return await this.makeRequest('/stock/profile2', { symbol });
    } catch (error) {
      console.warn(`Failed to fetch profile for ${symbol}, returning mock data:`, error);
      // Return mock data when API fails
      const mockProfile: FinnhubProfile = {
        country: 'US',
        currency: 'USD',
        exchange: 'NASDAQ',
        ipo: '1980-12-12',
        marketCapitalization: 2500000,
        name: `${symbol} Corporation`,
        phone: '555-0123',
        shareOutstanding: 16000000,
        ticker: symbol,
        weburl: 'https://example.com',
        logo: 'https://via.placeholder.com/100',
        finnhubIndustry: 'Technology'
      };
      return mockProfile;
    }
  }

  async getNews(symbol: string, from: string, to: string): Promise<FinnhubNews[]> {
    return this.makeRequest('/company-news', { symbol, from, to });
  }

  async getCandles(symbol: string, resolution: string, from: number, to: number): Promise<FinnhubCandle> {
    try {
      return await this.makeRequest('/stock/candle', { 
        symbol, 
        resolution, 
        from: from.toString(), 
        to: to.toString() 
      });
    } catch (error) {
      console.warn(`Failed to fetch candle data for ${symbol}, returning mock data:`, error);
      // Return mock data when API fails
      const mockData: FinnhubCandle = {
        c: [100, 102, 98, 105, 103], // Close prices
        h: [105, 106, 102, 108, 107], // High prices
        l: [98, 100, 95, 103, 101], // Low prices
        o: [99, 101, 99, 104, 102], // Open prices
        s: 'ok',
        t: [from, from + 86400, from + 172800, from + 259200, from + 345600], // Timestamps
        v: [1000000, 1200000, 800000, 1500000, 1100000] // Volumes
      };
      return mockData;
    }
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