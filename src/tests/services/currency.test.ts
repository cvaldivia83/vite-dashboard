import { CurrencyService } from "../../services/currency";
import { describe, it , expect, vi, beforeEach, afterEach } from 'vitest';

const mockCurrency = {
    BTCBRL: {
        code: "BTC",
        codein: "BRL",
        name: "Bitcoin/Real Brasileiro",
        high: "671238",
        low: "636349",
        varBid: "-18162",
        pctChange: "-2.756",
        bid: "640901",
        ask: "640902",
        timestamp: "1755198562",
        create_date: "2025-08-14 16:09:22"
    }
}

describe('Currency Service', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  })

  afterEach(() => {
    vi.resetAllMocks();
  })

  it('#getCurrencyConversion should fetch conversion', async () => {
    // @ts-expect-error(500)
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockCurrency)});

    const result = await CurrencyService.getCurrencyConversion();

    expect(fetch).toHaveBeenCalledWith(`https://economia.awesomeapi.com.br/json/last/BTC-BRL?token=${import.meta.env.VITE_AWESOME_API_KEY}`)
    expect(result).toEqual(mockCurrency);
  })
  
})