export interface QueryType {
  name: string;
}

export interface MutationType {
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
  kind: string;
  name: string;
  description: string;
  fields: Field[];
  inputFields: InputField[];
  interfaces: any[];
  enumValues: EnumValue[];
  possibleTypes?: any;
}

export interface Directive {
  name: string;
  description: string;
  locations: string[];
  args: Arg[];
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

export type MethodType = { little: 'query' | 'mutation'; high: 'Query' | 'Mutation' };
