export enum TypeKind {
  'SCALAR' = 'SCALAR',
  'OBJECT' = 'OBJECT',
  'INTERFACE' = 'INTERFACE',
  'UNION' = 'UNION',
  'ENUM' = 'ENUM',
  'INPUT_OBJECT' = 'INPUT_OBJECT',
  'NON_NULL' = 'NON_NULL',
  'LIST' = 'LIST',
}

export interface QueryType {
  name: string;
}

export interface OfType {
  kind: string;
  name: string;
  ofType?: OfType;
}

export interface Arg {
  name: string;
  description?: any;
  type: OfType;
  defaultValue: string;
}

export interface Field {
  name: string;
  description: string;
  args: Arg[];
  type: OfType;
  isDeprecated: boolean;
  deprecationReason?: any;
}

export interface InputField {
  name: string;
  description?: any;
  type: OfType;
  defaultValue?: any;
}

export interface EnumValue {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason?: any;
}

export interface Type {
  kind: TypeKind;
  name: string | MethodType;
  description: string;
  fields: Field[];
  inputFields: InputField[];
  interfaces: any[];
  enumValues: EnumValue[];
  possibleTypes?: OfType[];
}

export interface Directive {
  name: string;
  description: string;
  locations: string[];
  args: Arg[];
}

export interface Schema {
  queryType: QueryType;
  mutationType?: QueryType;
  subscriptionType?: QueryType;
  types: Type[];
  directives?: Directive[];
}

export interface GraphQLJSONSchema {
  __schema: Schema;
}

export enum MethodType {
  Query = 'query',
  Mutation = 'mutation',
  Subscription = 'subscription',
}
