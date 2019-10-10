import { scalarList } from './generateModel';
import { Field, Type, InputField, Arg } from './schemaModel';
import { types, isArray } from 'util';

// Get strucuture properties from a field
export const evaluateType = (field: Field | InputField | Arg) => {
  let propertyName = field.name;
  let isOptional = true;
  let isArray = false;
  let isArrayOptional = false;
  let isEdge = false;
  let isScalar = false;
  let typeName = '';

  function getFieldInfos(type): string {
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
  };
};

// Get the ts type from a Field
export const getOneTSType = ({
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

export const getObjectGQLTypesArgs = (field: Arg) => {
  const { isArray, isArrayOptional, isEdge, isOptional, isScalar, typeName } = evaluateType(field);
  const generatedType = `${isArray ? '[' : ''}${typeName}${isOptional ? '' : '!'}${
    isArray ? ']' : ''
  }${isArrayOptional ? '!' : ''}`;

  return generatedType;
};

export const buildMethod = (
  data: Field,
  type: { little: 'query' | 'mutation'; high: 'Query' | 'Mutation' },
  prefix: string,
  suffix: string
) => {
  const hasArgs = data.args.length > 0;
  const methodName = data.name;

  const { $args, args, variables, tsArgs } = data.args.reduce(
    (acc, arg) => {
      const argName = arg.name;
      const { isScalar, isOptional, isArray } = evaluateType(arg);
      const type = getObjectGQLTypesArgs(arg);
      const tsArg = getOneTSType({ field: arg, prefix, suffix });
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
  const { isScalar, isEdge } = evaluateType(data);
  const returnedType = getOneTSType({ field: data, prefix, suffix });

  let renderedArgs = '';
  if (tsArgs.length) {
    renderedArgs = `{${tsArgs.join('\n')}}`;
  }

  let scalarFunction = '';
  let nonScalarFunction = '';

  if (type.little === 'mutation') {
    scalarFunction = `
    const mutation = graphQlTag\`
      mutation ${methodName} ${hasArgs ? `(${$args.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${args.join(',')})` : ''}
      }\`,
    return abortableMutation<${returnedType}>(mutation);
  `;
    nonScalarFunction = `
  return {
    $fragment: (fragment: string | DocumentNode) => {
      const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
      const mutation = graphQlTag\`
         mutation ${methodName} ${hasArgs ? `(${$args.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${args.join(',')})` : ''} {
          ${isEdge ? '' : `\${isString ? fragment : '...' + fragmentName}`}
          
        }
      } \${isFragment? fragment: ''}
      \`

      return abortableMutation<${returnedType}${
      renderedArgs.length ? ',' + renderedArgs : ''
    }>(mutation);
    }
  }
`;
  } else {
    scalarFunction = `
    const query = graphQlTag\`
      query ${methodName} ${hasArgs ? `(${$args.join(',')})` : ''} {
        ${methodName}${hasArgs ? `(${args.join(',')})` : ''}
      }\`,
      return abortableQuery<${returnedType}${renderedArgs.length ? ',' + renderedArgs : ''}>(query);
    `;

    nonScalarFunction = `
    return {
      $fragment: (fragment: string | DocumentNode) => {
        const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
        const query = graphQlTag\`
           query ${methodName} ${hasArgs ? `(${$args.join(',')})` : ''} {
          ${methodName}${hasArgs ? `(${args.join(',')})` : ''} {
            ${isEdge ? '' : `\${isString ? fragment : '...' + fragmentName}`}
            
          }
        } \${isFragment? fragment: ''}
        \`
        return abortable${type.high}<${returnedType}${
      renderedArgs.length ? ',' + renderedArgs : ''
    }>(query);
      }
    }
  `;
  }

  const withArgs = tsArgs.length ? 'WithArgs' : '';

  const template = `
    ${methodName}: (): ${
    isScalar
      ? `Abordable${type.high}${withArgs}<${returnedType}${
          renderedArgs.length ? ',' + renderedArgs : ''
        }>`
      : `Fragmentable${type.high}${withArgs}<${returnedType}${
          renderedArgs.length ? ',' + renderedArgs : ''
        }>`
  } => {
        ${isScalar ? scalarFunction : nonScalarFunction}
      }
    ,`;
  return template;
};
