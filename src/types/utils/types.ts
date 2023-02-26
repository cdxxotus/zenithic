export type UtilsConfig = string[];

export type Utils = {
    [util: string]: {
        [method: string]: (...args: any[]) => any;
    }
}