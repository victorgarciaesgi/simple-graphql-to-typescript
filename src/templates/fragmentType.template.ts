export const guessFragmentTypeTemplate = `
const guessFragmentType = (fragment: string | DocumentNode) => {
  let isString = false;
  let isFragment = false;
  let fragmentName = '';
  if (typeof fragment === 'string') {
    isString = true;
  } else if (typeof fragment === 'object' && fragment.definitions.length) {
    isFragment = true;
    const definition = fragment.definitions[0];
    if (definition.kind === 'FragmentDefinition') {
      fragmentName = definition.name.value;
    } else {
      throw new Error(
        \`The argument passed is not a fragment definition, got \${definition.kind} instead\`
      );
    }
  }
  return { isString, isFragment, fragmentName };
};`;
