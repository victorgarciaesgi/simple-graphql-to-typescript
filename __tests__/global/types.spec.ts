import { sgtsGenerate } from '../../src';

describe('Test simple type generation from different sources', () => {
  it('Generates types correctly from jsonplaceholder', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://json-placeholder-graphql.herokuapp.com/graphql',
    });
    expect(result).toMatchSnapshot();
  });

  it('Generates types correctly from graphqlZero', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphqlzero.almansi.me/api',
    });
    expect(result).toMatchSnapshot();
  });

  it('Generates types correctly from graphql Analyst', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphql.anilist.co/',
    });
    expect(result).toMatchSnapshot();
  });
});
