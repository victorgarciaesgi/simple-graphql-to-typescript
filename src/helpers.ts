import { scalarList } from './generateModel';
import { Field, Type, InputField, Arg, OfType } from './schemaModel';
import { types, isArray } from 'util';

// Get strucuture properties from a field
export const evaluateType = (field: Field | InputField | Arg) => {
  let propertyName = field.name;
  let isOptional = true;
  let isArray = false;
  let isArrayOptional = false;
  let isEdge = false;
  let isScalar = false;
  let isEnum = false;
  let typeName = '';

  function getFieldInfos(type: OfType): string {
    if (propertyName === 'edges') isEdge = true;
    if (type.kind === 'NON_NULL' || type.kind === 'LIST') {
      if (type.kind === 'LIST') {
        isArray = true;
        if (isOptional) isArrayOptional = true;
      }
      if (type.kind === 'NON_NULL' && !isArrayOptional) isOptional = false;
      return getFieldInfos(type.ofType);
    } else {
      if (type.kind === 'SCALAR') {
        isScalar = true;
      } else if (type.kind === 'ENUM') {
        isEnum = true;
      }
      typeName = type.name;
    }
  }
  getFieldInfos(field.type);

  return {
    isOptional,
    isArray,
    isArrayOptional,
    isEdge,
    isScalar,
    typeName,
    isEnum,
  };
};

// Get the ts type from a Field
export const getOneTSTypeDisplay = ({
  field,
  prefix,
  suffix,
}: {
  field: Field | InputField | Arg;
  prefix: string;
  suffix: string;
}): string => {
  const { isScalar, typeName, isArray } = evaluateType(field);
  return isScalar
    ? scalarList[typeName]
    : `${prefix ? prefix : ''}${typeName}${suffix ? suffix : ''}${isArray ? '[]' : ''}`;
};

// Generates TS interface of a given GraphqlType
export const getObjectTSInterfaces = (object: Type, prefix: string, suffix: string): string => {
  let ObjectName: string = object.name;
  let fieldsKey =
    object.kind === 'OBJECT' || object.kind === 'INTERFACE' ? 'fields' : 'inputFields';
  const generatedFields = object[fieldsKey].map(field => {
    let propertyName = field.name;
    const { isArray, isOptional, isScalar, typeName } = evaluateType(field);
    const TStypeName = isScalar
      ? scalarList[typeName]
      : (prefix ? prefix : '') + typeName + (suffix ? suffix : '');

    const generatedProperty = `${propertyName}${isOptional ? '?' : ''}: ${TStypeName}${
      isArray ? '[]' : ''
    };`;

    return generatedProperty;
  });
  const generatedInterface = `interface ${prefix ? prefix : ''}${ObjectName}${
    suffix ? suffix : ''
  } {
        ${generatedFields.join('\n')}
      }
    `;
  return generatedInterface;
};

// Generate methods args interfaces
export const getQueriesArgsTSInterfaces = (object: Field, prefix: string, suffix: string) => {
  let ObjectName: string = object.name;
  const parsedSuffix = 'Args' + (suffix ? suffix : '');
  const generatedFields = object.args.map(field => {
    let propertyName = field.name;
    const { isArray, isOptional, isScalar, typeName } = evaluateType(field);
    const TStypeName = isScalar
      ? scalarList[typeName]
      : (prefix ? prefix : '') + typeName + (suffix ? suffix : '');

    const generatedProperty = `${propertyName}${isOptional ? '?' : ''}: ${TStypeName}${
      isArray ? '[]' : ''
    };`;

    return generatedProperty;
  });
  const generatedInterface = `interface ${prefix ? prefix : ''}${ObjectName}${
    parsedSuffix ? parsedSuffix : ''
  } {
        ${generatedFields.join('\n')}
      }
    `;
  return generatedInterface;
};

export const createConnectionFragment = (typeName: string, allTypes: Type[], fragment: string) => {
  const { fields } = allTypes.find(f => f.name === typeName);
  let outputFragment = '';

  function createLines(field: Field) {
    outputFragment += `
    ${field.name}`;
    const { typeName, isScalar } = evaluateType(field);
    if (!isScalar) {
      if (field.name === 'node') {
        outputFragment += `{${fragment}}`;
      } else {
        outputFragment += ` {
        `;
        const type = allTypes.find(f => f.name === typeName);
        type.fields.forEach(createLines);
        outputFragment += ` }`;
      }
    }
  }
  fields.map(createLines);
  return outputFragment;
};

export const getObjectGQLTypesArgs = (field: Arg) => {
  const { isArray, isArrayOptional, isEdge, isOptional, isScalar, typeName } = evaluateType(field);
  const generatedType = `${isArray ? '[' : ''}${typeName}${isOptional ? '' : '!'}${
    isArray ? ']' : ''
  }${isArrayOptional ? '!' : ''}`;

  return generatedType;
};

export const createMethodsArgs = (args: Arg[], prefix: string, suffix: string) => {
  return args.reduce(
    (acc, arg) => {
      const argName = arg.name;
      const { isScalar, isOptional, isArray } = evaluateType(arg);
      const type = getObjectGQLTypesArgs(arg);
      const tsArg = getOneTSTypeDisplay({ field: arg, prefix, suffix });
      acc.$args.push(`$${argName}: ${type}`);
      acc.args.push(`${argName}: $${argName}`);
      acc.variables.push(argName);
      acc.tsArgs.push(`${argName}${isOptional ? '?' : ''}: ${tsArg};`);
      return acc;
    },
    {
      $args: [],
      args: [],
      variables: [],
      tsArgs: [],
    }
  );
};

export const buildMethod = (
  field: Field,
  type: { little: 'query' | 'mutation'; high: 'Query' | 'Mutation' },
  prefix: string,
  suffix: string,
  ObjectTypes: Type[]
) => {
  const hasArgs = field.args.length > 0;
  const methodName = field.name;

  const { $args, args, variables, tsArgs } = createMethodsArgs(field.args, prefix, suffix);
  const { isScalar, isEnum, typeName } = evaluateType(field);
  const returnedTypeDisplay = getOneTSTypeDisplay({ field, prefix, suffix });

  let renderedArgs = '';
  if (tsArgs.length) {
    renderedArgs = `{${tsArgs.join('\n')}}`;
  }

  let renderedFragmentInner = `\${isString ? fragment : '...' + fragmentName}`;
  if (!isScalar && !isEnum) {
    const isEdge = ObjectTypes.find(f => f.name === typeName)
      .fields.map(evaluateType)
      .some(s => s.isEdge);

    if (isEdge) {
      renderedFragmentInner = createConnectionFragment(
        typeName,
        ObjectTypes,
        `\${isString ? fragment : '...' + fragmentName}`
      );
    }
  }

  let scalarFunction = '';
  let nonScalarFunction = '';

  if (type.little === 'mutation') {
    scalarFunction = `
    const mutation = graphQlTag\`
      mutation ${methodName} ${hasArgs ? `(${$args.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${args.join(',')})` : ''}
      }\`,
    return abortableMutation<${returnedTypeDisplay}>(mutation, ${!!renderedArgs.length});
  `;
    nonScalarFunction = `
  return {
    $fragment: (fragment: string | DocumentNode) => {
      const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
      const mutation = graphQlTag\`
         mutation ${methodName} ${hasArgs ? `(${$args.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${args.join(',')})` : ''} {
          ${renderedFragmentInner}
          
        }
      } \${isFragment? fragment: ''}
      \`

      return abortableMutation<${returnedTypeDisplay}${
      renderedArgs.length ? ',' + renderedArgs : ''
    }>(mutation, ${!!renderedArgs.length});
    }
  }
`;
  } else {
    scalarFunction = `
    const query = graphQlTag\`
      query ${methodName} ${hasArgs ? `(${$args.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${args.join(',')})` : ''}
      }\`,
      return abortableQuery<${returnedTypeDisplay}${
      renderedArgs.length ? ',' + renderedArgs : ''
    }>(query, ${!!renderedArgs.length});
    `;

    nonScalarFunction = `
    return {
      $fragment: (fragment: string | DocumentNode) => {
        const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
        const query = graphQlTag\`
           query ${methodName} ${hasArgs ? `(${$args.join(',')})` : ''} {
          ${methodName}${hasArgs ? `(${args.join(',')})` : ''} {
            ${renderedFragmentInner}
            
          }
        } \${isFragment? fragment: ''}
        \`
        return abortable${type.high}<${returnedTypeDisplay}${
      renderedArgs.length ? ',' + renderedArgs : ''
    }>(query, ${!!renderedArgs.length});
      }
    }
  `;
  }

  const withArgs = tsArgs.length ? 'WithArgs' : '';

  const template = `
    ${methodName}: (): ${
    isScalar
      ? `Abordable${type.high}${withArgs}<${returnedTypeDisplay}${
          renderedArgs.length ? ',' + renderedArgs : ''
        }>`
      : `Fragmentable${type.high}${withArgs}<${returnedTypeDisplay}${
          renderedArgs.length ? ',' + renderedArgs : ''
        }>`
  } => {
        ${isScalar ? scalarFunction : nonScalarFunction}
      }
    ,`;
  return template;
};
