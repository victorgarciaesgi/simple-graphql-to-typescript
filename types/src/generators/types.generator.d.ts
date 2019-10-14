import { Field, InputField, Arg, Type } from '../models/schema.models';
export declare const generateEnumType: (object: Type, prefix: string, suffix: string) => string;
export declare const getOneTSTypeDisplay: ({ field, prefix, suffix, scalarList, }: {
    field: Arg | Field | InputField;
    prefix: string;
    suffix: string;
    scalarList: {
        [x: string]: string;
    };
}) => string;
export declare const generatedTsFields: (fields: (Field | InputField)[], prefix: string, suffix: string, scalarList: {
    [x: string]: string;
}) => string[];
export declare const generateQGLArg: (field: Arg) => string;
export declare const getObjectTSInterfaces: (object: Type, prefix: string, suffix: string, scalarList: {
    [x: string]: string;
}) => string;
export declare const getQueriesArgsTSInterfaces: (object: Field, prefix: string, suffix: string, scalarList: {
    [x: string]: string;
}) => string;
export declare const buildTsInterfaceString: (name: string, fields: string[], prefix: string, suffix: string) => string;
