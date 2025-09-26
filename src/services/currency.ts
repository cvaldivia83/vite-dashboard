import { currencyResponse } from "../types/currency";


export class CurrencyService {

  // Converter BTC para moeda escolhida
  static async getCurrencyConversion(): Promise<currencyResponse> {
    const API_URL=`https://economia.awesomeapi.com.br/json/last/BTC-BRL?token=${import.meta.env.VITE_AWESOME_API_KEY}`

    try {
      const response = await fetch(API_URL);
      return await response.json();
    } catch(error) {
      console.log('Unable to get currency data', error);
      throw error;
    }
  }
}