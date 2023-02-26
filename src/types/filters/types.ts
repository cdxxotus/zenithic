export type Filter = (value: any, ...args: any[]) => unknown;

export type Filters = {
    [filter: string]: (...args: any[]) => unknown;
};

export type UppercaseFilter = (value: string) => string;

export type LowercaseFilter = (value: string) => string;

export type LimitToFilter = (array: any[], limit: number) => any[];

export type OrderByFilter = (array: any[], sortKey: string, reverse?: boolean) => any[];

export type DateFilter = (date: Date, format: string) => string;

export type CurrencyFilter = (value: number, currencyCode: string) => string;

export type CapitalizeFilter = (value: string) => string;

export type FiltersConfig = string[];