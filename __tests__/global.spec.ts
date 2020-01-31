import { sgtsGenerate } from '../src';

it('Generates types correctly from jsonplaceholder', async () => {
  const result = await sgtsGenerate({
    endpoint: 'https://json-placeholder-graphql.herokuapp.com/graphql',
    output: './debug/__generated.ts',
  });
  expect(result).toMatchSnapshot();
});

it('Generates types correctly from graphqlZero', async () => {
  const result = await sgtsGenerate({
    endpoint: 'https://graphqlzero.almansi.me/api',
    output: './debug/__generated.ts',
  });
  expect(result).toMatchSnapshot();
});
