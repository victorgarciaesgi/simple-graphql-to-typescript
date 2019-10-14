import { Field, InputField, Arg, Type } from '../models/schema.models';
export declare const evaluateType: (field: Arg | Field | InputField) => {
    isOptional: boolean;
    isArray: boolean;
    isArrayOptional: boolean;
    isEdge: boolean;
    isScalar: boolean;
    typeName: string;
    isEnum: boolean;
};
export declare const isReturnTypeEdge: (ObjectTypes: Type[], typeName: string) => boolean;
export declare const areAllArgsOptional: (args: Arg[]) => boolean;
