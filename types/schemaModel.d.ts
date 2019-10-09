export interface QueryType {
    name: string;
}
export interface MutationType {
    name: string;
}
export interface OfType {
    kind: string;
    name: string;
    ofType?: any;
}
export interface Type2 {
    kind: string;
    name: string;
    ofType: OfType;
}
export interface Arg {
    name: string;
    description?: any;
    type: Type2;
    defaultValue: string;
}
export interface OfType4 {
    kind: string;
    name: string;
    ofType?: any;
}
export interface OfType3 {
    kind: string;
    name: string;
    ofType: OfType4;
}
export interface OfType2 {
    kind: string;
    name: string;
    ofType: OfType3;
}
export interface Type3 {
    kind: string;
    name: string;
    ofType: OfType2;
}
export interface Field {
    name: string;
    description: string;
    args: Arg[];
    type: Type3;
    isDeprecated: boolean;
    deprecationReason?: any;
}
export interface OfType6 {
    kind: string;
    name: string;
    ofType?: any;
}
export interface OfType5 {
    kind: string;
    name: string;
    ofType: OfType6;
}
export interface Type4 {
    kind: string;
    name: string;
    ofType: OfType5;
}
export interface InputField {
    name: string;
    description?: any;
    type: Type4;
    defaultValue?: any;
}
export interface EnumValue {
    name: string;
    description: string;
    isDeprecated: boolean;
    deprecationReason?: any;
}
export interface Type {
    kind: string;
    name: string;
    description: string;
    fields: Field[];
    inputFields: InputField[];
    interfaces: any[];
    enumValues: EnumValue[];
    possibleTypes?: any;
}
export interface OfType8 {
    kind: string;
    name: string;
    ofType?: any;
}
export interface OfType7 {
    kind: string;
    name: string;
    ofType: OfType8;
}
export interface Type5 {
    kind: string;
    name: string;
    ofType: OfType7;
}
export interface Arg2 {
    name: string;
    description: string;
    type: Type5;
    defaultValue: string;
}
export interface Directive {
    name: string;
    description: string;
    locations: string[];
    args: Arg2[];
}
export interface Schema {
    queryType: QueryType;
    mutationType: MutationType;
    subscriptionType?: any;
    types: Type[];
    directives: Directive[];
}
export interface GraphQLJSONSchema {
    __schema: Schema;
}
