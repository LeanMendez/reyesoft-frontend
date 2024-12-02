
//------ Systems --------
export interface MetaData {
    page:      number;
    resources_per_page:  number;
    count:     number;
    total_resources: number;
}

export interface Systems {
    type:          string;
    id:            string;
    attributes:    Attributes;
    relationships: Relationships;
}

export interface Attributes {
    name:                     string;
    replacement_system_id:    string;
    alternative_name:         string;
    amount:                   null;
    currency:                 string;
    default_network_id:       null;
    decimal_places:           number;
    can_send:                 boolean;
    can_receive:              boolean;
    fee_send:                 number;
    fee_receive:              number;
    fixed_fee_send:           number;
    fixed_fee_receive:        number;
    account_required_send:    boolean;
    account_required_receive: boolean;
    minimum_amount_send:      number;
    minimum_amount_receive:   number;
    maximum_amount_send:      number;
    maximum_amount_receive:   number;
    account_type:             string;
    group_id:                 string;
    market:                   string;
    trend:                    number;
}

export interface Relationships {
    rates:              Networks;
    system_information: Networks;
    currency:           Currency;
    networks:           Networks;
}

export interface Currency {
    data: DAT;
}

export interface DAT {
    type: Type;
    id:   string;
}

export enum Type {
    Currencies = "currencies",
    Rates = "rates",
}

export interface Networks {
    data: DAT[];
}

//------ Rates --------
export interface Rates {
    bitcoin?: Bitcoin;
    dai?:     Dai;
    usdt?:    Usdt;
}

export interface Bitcoin {
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

export interface Dai {
    ask:           number;
    bid:           number;
    ask_fixed_fee: number;
    bid_fixed_fee: number;
    currency:      string;
    bid_url:       string;
    ask_url:       string;
    networks:      DaiNetworks;
}

export interface DaiNetworks {
    bnb:      Network;
    ethereum: Network;
}

export interface Usdt {
    ask:           number;
    bid:           number;
    ask_fixed_fee: number;
    bid_fixed_fee: number;
    currency:      string;
    bid_url:       string;
    ask_url:       string;
    networks:      UsdtNetworks;
}

export interface UsdtNetworks {
    bnb:  Network;
    tron: Network;
}