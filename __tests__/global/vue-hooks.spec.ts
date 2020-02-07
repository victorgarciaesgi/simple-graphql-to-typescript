import { sgtsGenerate } from '../../src';
import { sharedOptions } from './shared.options';

describe('Test Vue Hooks generation from different sources', () => {
  it('Generates types correctly from jsonplaceholder', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://json-placeholder-graphql.herokuapp.com/graphql',
      codegenVueHooks: true,
      ...sharedOptions,
    });
    expect(result).toMatchSnapshot();
  });

  it('Generates types correctly from graphqlZero', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphqlzero.almansi.me/api',
      codegenVueHooks: true,
      ...sharedOptions,
    });
    expect(result).toMatchSnapshot();
  });

  it('Generates types correctly from graphql Analyst', async () => {
    const result = await sgtsGenerate({
      endpoint: 'https://graphql.anilist.co/',
      codegenVueHooks: true,
      ...sharedOptions,
    });
    expect(result).toMatchSnapshot();
  });
});
