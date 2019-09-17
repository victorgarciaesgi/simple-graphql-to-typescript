import { scalarList } from './generateModel';

export const evaluateType = field => {
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

export const getOneTSType = ({ field, prefix, suffix }) => {
  const { isScalar, typeName } = evaluateType(field);
  return isScalar
    ? scalarList[typeName]
    : (prefix ? prefix : '') + typeName + (suffix ? suffix : '');
};

export const getObjectTSInterfaces = (object, prefix: string, suffix: string) => {
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

export const getQueriesArgsTSInterfaces = (object, prefix: string, suffix: string) => {
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

export const getObjectGQLTypesArgs = field => {
  const { isArray, isArrayOptional, isEdge, isOptional, isScalar, typeName } = evaluateType(field);
  const generatedType = `${isArray ? '[' : ''}${typeName}${isOptional ? '' : '!'}${
    isArray ? ']' : ''
  }${isArrayOptional ? '!' : ''}`;

  return generatedType;
};

export const buildMethod = (data, type, prefix, suffix) => {
  const hasArgs = data.args.length > 0;
  const methodName = data.name;

  const { $args, args, variables, tsArgs } = data.args.reduce(
    (acc, arg) => {
      const argName = arg.name;
      const type = getObjectGQLTypesArgs(arg);
      const tsArg = getOneTSType({ field: arg, prefix, suffix });
      acc.$args.push(`$${argName}: ${type}`);
      acc.args.push(`${argName}: $${argName}`);
      acc.variables.push(argName);
      acc.tsArgs.push(`${argName}: ${tsArg}`);
      return acc;
    },
    {
      $args: [],
      args: [],
      variables: [],
      tsArgs: [],
    }
  );
  const { isScalar } = evaluateType(data);
  const returnedType = getOneTSType({ field: data, prefix, suffix });

  let renderedArgs = '';
  if (isScalar && tsArgs.length) {
    renderedArgs = `args: {${tsArgs.join('\n')}}`;
  } else if (!isScalar && tsArgs.length) {
    renderedArgs = `{args, fragment}: {args: {${tsArgs.join('\n')}}, fragment: string}`;
  } else if (!isScalar && !tsArgs.length) {
    renderedArgs = `fragment: string`;
  }
  const template = `
      export const ${methodName} = async (${renderedArgs}) => {
        ${!isScalar ? `const fragmentName = getFragmentName(fragment);` : ''}
        return apollo${type.high}<${returnedType}>({
          ${type.little}: graphQlTag\`
    ${type.little} ${methodName} ${hasArgs ? `(${$args.join(',')})` : ''} {
      ${methodName}${hasArgs ? `(${args.join(',')})` : ''} ${
    isScalar
      ? ''
      : `{
        \${fragmentName?\`...\${fragmentName}\`:\`\${fragment}\`}
      }`
  }
    } ${
      isScalar
        ? ''
        : `\${fragmentName? fragment :''}
        `
    }\`,
          variables: {
            ${variables.map(m => `${m}:args.${m}`).join(',')}
          }
        });
      };
    `;
  return template;
};
