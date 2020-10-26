export interface InterfaceHistory {
  name: string;
  fields: InterfaceFieldHistory[];
}
export interface InputTypeHistory {
  name: string;
  fields: InputTypeFieldHistory[];
}

interface SharedFieldHistory {
  name: string;
  description: string;
  isScalar: boolean;
  isArray: boolean;
  isRequired: boolean;
  isArrayRequired: boolean;
  typeName: string;
  isEnum: boolean;
}

export interface InterfaceFieldHistory extends SharedFieldHistory {
  isDeprecated: boolean;
  deprecationReason?: any;
}

export interface InputTypeFieldHistory extends SharedFieldHistory {
  defaultValue?: any;
}
