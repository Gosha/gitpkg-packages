import { Level, Type } from "./types";
declare const errors: {
    "": {
        text: (context: any) => string;
        level: Level;
    };
    95312: {
        text: (context: any) => string;
        level: Level;
        docsUrl: string;
    };
    95313: {
        text: (context: any) => string;
        level: Level;
        docsUrl: string;
    };
    98123: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    98124: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85901: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85907: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85908: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85909: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85910: {
        text: (context: any) => string;
        type: Type;
        level: Level;
        docsUrl: string;
    };
    85911: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85912: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85913: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85914: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85915: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85916: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85917: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85918: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85919: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85920: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85921: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85922: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85923: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85924: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85925: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85926: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    85927: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    10122: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    10123: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    10124: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    10125: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    10126: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    10226: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    11321: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    11322: {
        text: (context: any) => string;
        level: Level;
    };
    11323: {
        text: (context: any) => string;
        level: Level;
    };
    11324: {
        text: (context: any) => string;
        level: Level;
    };
    11325: {
        text: (context: any) => string;
        level: Level;
    };
    11326: {
        text: (context: any) => string;
        level: Level;
    };
    11327: {
        text: (context: any) => string;
        level: Level;
    };
    11328: {
        text: (context: any) => string;
        level: Level;
    };
    11329: {
        text: (context: any) => string;
        level: Level;
    };
    11330: {
        text: (context: any) => string;
        type: Type;
        level: Level;
    };
    11331: {
        text: (context: any) => string;
        level: Level;
    };
    11467: {
        text: (context: any) => string;
        level: Level;
        docsUrl: string;
    };
    11521: {
        text: () => string;
        level: Level;
        docsUrl: string;
    };
    11522: {
        text: () => string;
        level: Level;
        docsUrl: string;
    };
    11610: {
        text: (context: any) => string;
        level: Level;
        docsUrl: string;
    };
    11611: {
        text: (context: any) => string;
        level: Level;
        docsUrl: string;
    };
    11612: {
        text: (context: any) => string;
        level: Level;
        docsUrl: string;
    };
    11613: {
        text: (context: any) => string;
        level: Level;
        docsUrl: string;
    };
};
export declare type ErrorId = keyof typeof errors;
export declare const errorMap: Record<ErrorId, IErrorMapEntry>;
export declare const defaultError: IErrorMapEntry;
export interface IErrorMapEntry {
    text: (context: any) => string;
    level: Level;
    type?: Type;
    docsUrl?: string;
}
export {};
