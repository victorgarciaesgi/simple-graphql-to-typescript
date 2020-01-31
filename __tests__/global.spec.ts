import { sgtsGenerate } from '../src';

jest.setTimeout(10000);
it('Generates types correctly from jsonplaceholder', async done => {
  const result = await sgtsGenerate({
    endpoint: 'https://json-placeholder-graphql.herokuapp.com/graphql',
    output: './debug/__generated.ts',
  });
  expect(result).toMatchSnapshot();
  done();
});

it('Generates types correctly from graphqlZero', async done => {
  const result = await sgtsGenerate({
    endpoint: 'https://graphqlzero.almansi.me/api',
    output: './debug/__generated.ts',
  });
  expect(result).toMatchSnapshot();
  done();
});
