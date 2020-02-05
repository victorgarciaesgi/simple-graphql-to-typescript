import { sgtsGenerate } from '../../src';

describe('Test React Hooks generation from different sources', () => {
  it('Generates types correctly from jsonplaceholder', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://json-placeholder-graphql.herokuapp.com/graphql',
      codegenHooks: true,
    });
    expect(result).toMatchSnapshot();
  });

  it('Generates types correctly from graphqlZero', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphqlzero.almansi.me/api',
      codegenHooks: true,
    });
    expect(result).toMatchSnapshot();
  });

  it('Generates types correctly from graphql Analyst', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphql.anilist.co/',
      codegenHooks: true,
    });
    expect(result).toMatchSnapshot();
  });
});
