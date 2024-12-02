export interface CurrencyRates {
    name:          string;
    ask:           number;
    bid:           number;
    ask_fixed_fee: number;
    bid_fixed_fee: number;
    currency:      string;
    bid_url:       string;
    ask_url:       string;
    networks:      { [key: string]: Network };
}

export interface Network {
    ask_fixed_fee: number;
    bid_fixed_fee: number;
    currency:      string;
    bid_url:       string;
    ask_url:       string;
}