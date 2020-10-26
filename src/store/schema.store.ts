import { generateQGLArg } from '@generators';
import { Arg, Field, GraphQLJSONSchema, InputField, OfType, Type, TypeKind } from '@models';
import { ParametersStore } from './parameters.store';

const regexFilter = (field: Field | Type) =>
  !/(^_{1,2})|Query|Mutation|Subscription/.test(field.name);

class SchemaConstructor {
  private schema!: GraphQLJSONSchema;

  /** Returns the list of types contained in the schema */
  public get schemaTypes(): Type[] {
    return this.schema?.__schema.types.filter(regexFilter);
  }

  public get schemaObjectTypes(): Type[] {
    return this.schema.__schema.types.filter((type) => type.kind === TypeKind.OBJECT);
  }

  /** Returns the list of `Queries`,`Mutations` and `Subscriptions` from the schema */
  public get schemaFunctions(): [Field[], Field[], Field[]] {
    const _schema = this.schema.__schema;
    const QueryType = _schema.queryType.name;
    const MutationType = _schema.mutationType?.name ?? null;
    const SubscriptionType = _schema.subscriptionType?.name ?? null;
    let listQueries = _schema.types.find((type) => type.name === QueryType)?.fields ?? [];
    let listMutations: Field[] = [];
    let listSubscription: Field[] = [];

    if (MutationType) {
      listMutations = _schema.types.find((type) => type.name === MutationType)?.fields ?? [];
    }
    if (SubscriptionType) {
      listSubscription = _schema.types.find((type) => type.name === SubscriptionType)?.fields ?? [];
    }

    return [
      listQueries.filter(regexFilter),
      listMutations.filter(regexFilter),
      listSubscription.filter(regexFilter),
    ];
  }

  /** Find a Type with a given name */
  public findType(typeName: string): Type | undefined {
    return this.schemaTypes.find((type) => type.name === typeName);
  }

  /** Returns true if the return type of a Type is a `Connection` */
  public isTypeConnection(typeName: string): boolean {
    const type = this.findType(typeName);
    if (type && type.fields) {
      return type.fields.map(this.getFieldProps).some(({ isConnection }) => isConnection);
    }
    return false;
  }

  /** Returns true if all the arguments of a Field are optional */
  public areFieldArgsAllOptional(field: Field): boolean {
    return field.args.map(this.getFieldProps).every(({ isRequired }) => isRequired);
  }

  public getFunctionFieldArgs(
    field: Field
  ): {
    GQLVariables: string[];
    GQLArgs: string[];
    functionArgsTypeName: string;
  } {
    const { prefix, suffix } = ParametersStore;
    const { GQLVariables, GQLArgs } = field.args.reduce(
      (acc, arg) => {
        const argName = arg.name;
        const type = generateQGLArg(arg);
        acc.GQLVariables.push(`$${argName}: ${type}`);
        acc.GQLArgs.push(`${argName}: $${argName}`);
        return acc;
      },
      {
        GQLVariables: [] as string[],
        GQLArgs: [] as string[],
      }
    );
    let functionArgsTypeName = '';
    if (field.args.length) {
      const parsedSuffix = (suffix ? suffix : '') + 'Args';
      functionArgsTypeName = `${prefix ? prefix : ''}${field.name}${parsedSuffix}`;
    }
    return {
      GQLArgs,
      GQLVariables,
      functionArgsTypeName,
    };
  }

  /** Get strucuture properties from a field */
  public getFieldProps(field: Field | InputField | Arg) {
    let propertyName = field.name;
    let isRequired = false;
    let isArray = false;
    let isArrayRequired = false;
    let isConnection = false;
    let isScalar = false;
    let isEnum = false;
    let typeName = '';

    if (propertyName === 'edges') isConnection = true;

    function getOfTypeProps(type: OfType): string | null {
      if (type.kind === TypeKind.NON_NULL) {
        if (isArray) isArrayRequired = true;
        else isRequired = true;
      }
      if (type.kind === TypeKind.LIST) isArray = true;
      if (type.ofType) return getOfTypeProps(type.ofType);
      else {
        if (type.kind === TypeKind.SCALAR) isScalar = true;
        else if (type.kind === TypeKind.ENUM) isEnum = true;
        typeName = type.name;
      }
      return null;
    }
    getOfTypeProps(field.type);

    return {
      isRequired,
      isArray,
      isArrayRequired,
      isConnection,
      isScalar,
      typeName,
      isEnum,
    };
  }

  setSchema(schema: GraphQLJSONSchema): void {
    this.schema = schema;
  }
}

export const SchemaStore = new SchemaConstructor();
