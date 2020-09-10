import { GraphQLJSONSchema, Type } from '../models';

class SchemaConstructor {
  private schema!: GraphQLJSONSchema;

  public get schemaTypes(): Type[] {
    return this.schema.__schema.types.filter((type) => {
      return !/^_{1,2}/.test(type.name);
    });
  }

  setSchema(schema: GraphQLJSONSchema): void {
    this.schema = schema;
  }
}

export const SchemaStore = new SchemaConstructor();
