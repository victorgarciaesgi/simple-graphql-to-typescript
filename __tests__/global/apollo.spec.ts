import { sgtsGenerate } from '../../src';

describe('Test methods generation from different sources', () => {
  it('Generates types correctly from jsonplaceholder', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://json-placeholder-graphql.herokuapp.com/graphql',
      output: './debug/__generated.ts',
      generateMethods: true,
    });
    expect(result).toMatchSnapshot();
  });

  it('Generates types correctly from graphqlZero', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphqlzero.almansi.me/api',
      output: './debug/__generated.ts',
      generateMethods: true,
    });
    expect(result).toMatchSnapshot();
  });

  it('Generates types correctly from graphql Analyst', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphql.anilist.co/',
      output: './debug/__generated.ts',
      generateMethods: true,
    });
    expect(result).toMatchSnapshot();
  });
});
